import pool from "../config/db.js";

class Restaurant {

    static async create(data) {

        const sql = `
        INSERT INTO restaurants
        (name,address,phone)
        VALUES (?,?,?)
        `;

        const [result] = await pool.execute(sql, [
            data.name,
            data.address,
            data.phone
        ]);

        return result;
    }

    static async getAll() {

        const [rows] = await pool.execute(
            "SELECT * FROM restaurants ORDER BY id DESC"
        );

        return rows;
    }

    static async update(id, data) {

        const sql = `
        UPDATE restaurants
        SET name=?, address=?, phone=?
        WHERE id=?
        `;

        const [result] = await pool.execute(sql, [
            data.name,
            data.address,
            data.phone,
            id
        ]);

        return result;
    }

    static async delete(id) {

        const [result] = await pool.execute(
            "DELETE FROM restaurants WHERE id=?",
            [id]
        );

        return result;
    }

}

export default Restaurant;