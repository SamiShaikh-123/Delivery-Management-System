import Order from "../models/Order.js";

export const createOrder = async (req, res) => {

    try {

        await Order.create(req.body);

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

export const getOrders = async (req, res) => {

    try {

        const orders = await Order.getAll();

        res.json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

export const updateOrder = async (req, res) => {

    try {

        await Order.updateStatus(req.params.id, req.body.status);

        res.json({
            success: true,
            message: "Order Status Updated"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

export const deleteOrder = async (req, res) => {

    try {

        await Order.delete(req.params.id);

        res.json({
            success: true,
            message: "Order Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};