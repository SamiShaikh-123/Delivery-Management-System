import pool from "../config/db.js";

class Order {

    static async create(data) {

        const sql = `
        INSERT INTO orders
        (user_id, restaurant_id, menu_item_id, quantity, total_price)
        VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            data.user_id,
            data.restaurant_id,
            data.menu_item_id,
            data.quantity,
            data.total_price
        ]);

        return result;
    }

    static async getAll() {

        const sql = `
        SELECT
            o.*,
            u.full_name,
            r.name AS restaurant_name,
            m.name AS menu_name
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN restaurants r ON o.restaurant_id = r.id
        JOIN menu_items m ON o.menu_item_id = m.id
        ORDER BY o.id DESC
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

    static async updateStatus(id, status) {

        const [result] = await pool.execute(
            "UPDATE orders SET status=? WHERE id=?",
            [status, id]
        );

        return result;
    }

    static async delete(id) {

        const [result] = await pool.execute(
            "DELETE FROM orders WHERE id=?",
            [id]
        );

        return result;
    }

}

export default Order;