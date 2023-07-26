const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/user.route")
const { categoryRouter } = require("./routes/category.route");

const PORT = process.env.PORT || 4500;
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page");
})
app.use("/user", userRouter);
app.use("/category", categoryRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at ${process.env.port}`);
})
