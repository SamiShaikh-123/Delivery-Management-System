import pool from "../config/db.js";

class User {

    static async create(user) {

        const sql = `
        INSERT INTO users
        (full_name,email,password,phone,role)
        VALUES (?,?,?,?,?)
        `;

        const [result] = await pool.execute(sql, [
            user.full_name,
            user.email,
            user.password,
            user.phone,
            user.role
        ]);

        return result;
    }

    static async findByEmail(email){

        const sql="SELECT * FROM users WHERE email=?";

        const [rows]=await pool.execute(sql,[email]);

        return rows[0];
    }

}

export default User;