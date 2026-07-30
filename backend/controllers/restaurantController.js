import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (req, res) => {

    try {

        await Restaurant.create(req.body);

        res.status(201).json({
            success: true,
            message: "Restaurant Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

export const getRestaurants = async (req, res) => {

    try {

        const restaurants = await Restaurant.getAll();

        res.json({
            success: true,
            restaurants
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

export const updateRestaurant = async (req, res) => {

    try {

        await Restaurant.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "Restaurant Updated Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

export const deleteRestaurant = async (req, res) => {

    try {

        await Restaurant.delete(req.params.id);

        res.json({
            success: true,
            message: "Restaurant Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};