import { pool } from '../db/db.js';

//connect backend with Postgres stored proceduers

export const getAdminByUsername = async (username) => {


    const result = await pool.query(
    "SELECT * FROM get_admin($1::TEXT)",
    [username]
);
    return result.rows[0];
};