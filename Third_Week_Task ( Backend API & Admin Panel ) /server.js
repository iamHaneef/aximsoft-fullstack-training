import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get("/api/contact", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
    const data = JSON.parse(fs.readFileSync("contact_submissions.json", "UTF-8"));

    res.json(data);
})

app.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;
    if (username !== process.env.ADMIN_USER) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    if (password !== process.env.ADMIN_PASS) {
        return res.send("Invalid Sent password");
    }
    const token = jwt.sign(
        { user: username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    res.json({ token });
})

app.post("/api/contact", (req, res) => {
    const { full_name, email, message } = req.body;

    if (!full_name || !email || !message) {
        return res.status(400).json({ error: "All fields required" });
    }

    const data = JSON.parse(fs.readFileSync("contact_submissions.json", "UTF-8"));

    const newdata = {
        id: Date.now(),
        full_name,
        email,
        message,
        created_At: new Date().toISOString()
    }

    data.push(newdata);

    fs.writeFileSync("contact_submissions.json", JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Saved successfully" });
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});