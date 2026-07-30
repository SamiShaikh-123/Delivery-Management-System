import pool from "../config/db.js";

class Menu {

    static async create(data) {

        const sql = `
        INSERT INTO menu_items
        (restaurant_id, name, description, price, image)
        VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            data.restaurant_id,
            data.name,
            data.description,
            data.price,
            data.image
        ]);

        return result;
    }

    static async getAll() {

        const sql = `
        SELECT
            menu_items.*,
            restaurants.name AS restaurant_name
        FROM menu_items
        JOIN restaurants
        ON menu_items.restaurant_id = restaurants.id
        ORDER BY menu_items.id DESC
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

    static async update(id, data) {

        const sql = `
        UPDATE menu_items
        SET
            restaurant_id=?,
            name=?,
            description=?,
            price=?,
            image=?
        WHERE id=?
        `;

        const [result] = await pool.execute(sql, [
            data.restaurant_id,
            data.name,
            data.description,
            data.price,
            data.image,
            id
        ]);

        return result;
    }

    static async delete(id) {

        const [result] = await pool.execute(
            "DELETE FROM menu_items WHERE id=?",
            [id]
        );

        return result;
    }

}

export default Menu;