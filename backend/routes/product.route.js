const express = require("express");
const { ProductModel } = require("../models/product.model")

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    const query = req.query;
    try {
        const data = await ProductModel.find(query);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

productRouter.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
        const data = await ProductModel.find({ "_id": productId });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

productRouter.get("/getCategory/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const data = await ProductModel.find({ categoryId });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

productRouter.post("/add", async (req, res) => {
    const { categoryId, title, price, description, availability } = req.body;
    try {
        const data = new ProductModel({ categoryId, title, price, description, availability });
        await data.save();
        res.status(201).json({ "msg": "product added successfully", data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ "msg": "Error in adding products" });
    }
})

productRouter.patch("/update/:id", async (req, res) => {
    const { categoryId, title, price, description, availability } = req.body;
    const _id = req.params.id;
    try {
        await ProductModel.findByIdAndUpdate({ _id }, { categoryId, title, price, description, availability });
        res.status(200).json({ "msg": "product updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error updating" })
    }
})

productRouter.delete("/delete/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        await ProductModel.findByIdAndDelete({ _id });
        res.status(200).json({ "msg": "category deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error deleting" })
    }
})

module.exports = { productRouter }