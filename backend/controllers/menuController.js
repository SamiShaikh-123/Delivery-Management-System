import Menu from "../models/Menu.js";

export const createMenu = async (req, res) => {

    try {

        const data = {
            restaurant_id: req.body.restaurant_id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? req.file.filename : null,
        };

        await Menu.create(data);

        res.status(201).json({
            success: true,
            message: "Menu Added Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message,
        });

    }
};

export const getMenus = async (req, res) => {

    try {

        const menus = await Menu.getAll();

        res.json({
            success: true,
            menus,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message,
        });

    }
};

export const updateMenu = async (req, res) => {

    try {

        const data = {
            restaurant_id: req.body.restaurant_id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? req.file.filename : req.body.image,
        };

        await Menu.update(req.params.id, data);

        res.json({
            success: true,
            message: "Menu Updated Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message,
        });

    }
};

export const deleteMenu = async (req, res) => {

    try {

        await Menu.delete(req.params.id);

        res.json({
            success: true,
            message: "Deleted Successfully",
        });

    } catch (error) {
        console.error("CREATE MENU ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message,
        });

    }
};