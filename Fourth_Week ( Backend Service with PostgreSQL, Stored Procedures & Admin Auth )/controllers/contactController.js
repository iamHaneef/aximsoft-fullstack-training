import {
    createContactService,
    getContactsService,
    deleteContactService
} from '../services/contactService.js';

//CREATE A CONTACT LOGIC

export const createContact = async (req, res) => {
    const { full_name, email, message } = req.body;

    if (!full_name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Wrong Details"
        });
    }
    try {
        await createContactService(full_name, email, message);

        res.status(201).json({
            success: true,
            message: "Successfully Created",
            data: {}
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Not Created",
        })
    }
}

//GET A CONTACT LOGIC

export const getContacts = async (req, res) => {
    const { page = 1, limit = 5, search = null } = req.query;

    const offset = (page - 1) * limit;

    try {
        const data =  await getContactsService(limit, offset, search);

        res.json({
            success: true,
            message: "Successfully Get All Data",
            data
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Not Created",
        })
    }
};

//DELETE A CONTACT LOGIC

export const deleteContact = async (req, res) => {
    const id  = parseInt(req.params.id);
    try {
        await deleteContactService(id);

        res.status(201).json({
            success: true,
            message: "Successfully Deleted",
            data: {}
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Not Created",
        })
    }
}