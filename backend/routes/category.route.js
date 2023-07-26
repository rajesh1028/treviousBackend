const express = require("express");
const { CategoryModel } = require("../models/category.model")

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
    const query = req.query;
    try {
        const data = await CategoryModel.find(query);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

categoryRouter.get("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const data = await CategoryModel.find({ _id });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

categoryRouter.post("/add", async (req, res) => {
    const { name } = req.body;
    try {
        const data = new CategoryModel({ name });
        await data.save();
        res.status(201).json({ "msg": "category added successfully", data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ "msg": "Error in adding items to cart" });
    }
})

categoryRouter.patch("/update/:id", async (req, res) => {
    const { name } = req.body;
    const _id = req.params.id;
    try {
        await CategoryModel.findByIdAndUpdate({ _id }, { name });
        res.status(200).json({ "msg": "category updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error updating" })
    }
})

categoryRouter.delete("/delete/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        await CategoryModel.findByIdAndDelete({ _id });
        res.status(200).json({ "msg": "category deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error deleting" })
    }
})

module.exports = { categoryRouter }