import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getAdminByUsername } from '../services/adminService.js';

export const loginAdmin = async (req, res) => {

    const { username, password } = req.body;

    try {
        const admin = await getAdminByUsername(username);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "invalid Credentials"
            })
        }

        //password check

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "invalid Credentials"
            })
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            success: true,
            message: "valid Credentials",
            data: { token }
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

}