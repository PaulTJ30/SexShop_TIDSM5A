import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { registerUsers, singIn } from "./src/controllers/UserControllers.js";
import { createProduct, updateProduct, deleteProduct, getProductById, GetProducts, upload } from "./src/controllers/ProductController.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.url_bd)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.error("Error conectando a MongoDB:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

app.use(cors());
app.use(express.json());

// Rutas
app.post('/register', registerUsers);
app.post('/login', singIn);

//Products
app.use("/uploads", express.static("uploads"))

app.post("/product/create", upload.single("image"), createProduct)
app.put("/product/:id", upload.single("image"), updateProduct)
app.delete("/product/:id", deleteProduct)