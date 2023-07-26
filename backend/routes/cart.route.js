const express = require("express");
const { CartModel } = require("../models/cart.model")

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
    const query = req.query
    try {
        const data = await CartModel.find(query);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

cartRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await CartModel.find({ user: id });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

cartRouter.post("/add", async (req, res) => {
    const { user, products } = req.body
    // { sample data
    //     "user": "64c0d67f13dc2b127d395787",
    //         "products": [
    //             {
    //                 "_id": "64c0b37d7c304643d2554a93"
    //             }
    //         ]
    // }
    try {
        const items = await CartModel.findOne({ user });
        if (items) {
            let patch_items = [...items.products, ...products];
            await CartModel.findByIdAndUpdate({ "_id": items._id }, { products: patch_items });
            res.status(200).json({ "msg": "Items added to cart" });
        } else {
            const cart = new CartModel({ user, products });
            await cart.save();
            res.status(200).json({ "msg": "Added to cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ "msg": "Error in adding items to cart" });
    }
})

cartRouter.patch("/update/:user_id", async (req, res) => {
    const { product } = req.body;
    const user_id = req.params.user_id;
    try {
        const data = await CartModel.findOne({ user: user_id });
        const products = data.products.filter((item) => {
            return item._id != product;
        });
        const payload = {
            ...data._doc,
            products
        }
        // console.log(payload);
        await CartModel.findByIdAndUpdate({ "_id": data._id }, payload);
        res.status(200).json({ "msg": "cart updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error updating" })
    }
})

cartRouter.patch("/updateQuantity/:user_id", async (req, res) => {
    const { product, action } = req.body;
    const user_id = req.params.user_id;
    try {
        const data = await CartModel.findOne({ user: user_id });
        const target = data.products.filter((item) => {
            return item._id == product;
        });
        if (action == "+") {
            target[0].quantity++;
        } else if (action == "-") {
            target[0].quantity--;
        } else {
            res.send("Invalid Action");
        }

        await CartModel.findByIdAndUpdate({ "_id": data._id }, data);
        res.status(200).json({ "msg": "item updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error updating" })
    }
})

cartRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await CartModel.findByIdAndDelete({ "_id": id });
        res.status(200).json({ "msg": "Deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error deleting" })
    }
})

module.exports = { cartRouter }