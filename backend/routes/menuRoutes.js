import express from "express";

import {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu,
} from "../controllers/menuController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createMenu);

router.get("/", getMenus);

router.put("/:id", upload.single("image"), updateMenu);

router.delete("/:id", deleteMenu);

export default router;