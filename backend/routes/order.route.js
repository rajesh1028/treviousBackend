const express = require("express");
const { OrderModel } = require("../models/order.model");
const { CartModel } = require("../models/cart.model");

const orderRouter = express.Router();

// detailed info about the order
orderRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await OrderModel.find({ _id: id });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

// to retrieve order details according to user
orderRouter.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const data = await OrderModel.find({ user: user_id });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})


// to place orders
orderRouter.post("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const userCart = await CartModel.findOne({ user: user_id });
        if (userCart) {
            const products = userCart.products;
            const order = new OrderModel({ user: user_id, products });
            await order.save();
            const cartAction = await CartModel.findByIdAndDelete({ _id: userCart._id });
            res.status(200).json({ "msg": "Order placed successfully" });
        } else {
            res.status(400).json({ "msg": "No items in cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ "msg": "Error in placing orders from cart" });
    }
})

orderRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await OrderModel.findByIdAndDelete({ "_id": id });
        res.status(200).json({ "msg": "Deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error deleting" })
    }
})

module.exports = { orderRouter }