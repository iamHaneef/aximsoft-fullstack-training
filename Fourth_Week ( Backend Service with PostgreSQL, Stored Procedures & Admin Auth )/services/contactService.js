import { pool } from '../db/db.js';

//create a contact

export const createContactService =  async(full_name,email,message) => {

    await pool.query(
        "CALL create_contact($1,$2,$3)",
        [full_name,email,message]
    );

};

//get a contact details

export const getContactsService = async(limit ,offset ,search) =>{
    const result = await pool.query(
        "SELECT * FROM get_contacts($1,$2,$3)",
        [limit,offset,search]
    )
    
    return result.rows;
}

//delete a contacts

export const deleteContactService = async(id) =>{
    
    await pool.query(
        "CALL delete_contact($1)",
        [id]
    );
};
