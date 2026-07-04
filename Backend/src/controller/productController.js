import productModel from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";
import { request } from "express";


export const getProducts = async (req, res) =>{
    try{
        const products = await productModel.find({})
        res.json(products)
    }catch(err) {
        res.status(500).json({message : "Server error"})
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await productModel.findById(req.params.id)
        if(product){
            res.json(product)
        }else{
            res.status(404).json({message :"Product not found"})
        }
    }catch(err) {
        res.status(500).json({message: "Server error"})
    }
}

export const createProduct = async(req, res) => {
    try{
    const {name , description, price , stock , category} = req.body

    let imageUrl = ''
    
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path)
        imageUrl = result.secure_url
        console.log(result)
    }
    const product = await productModel.create({
        name,
        price,
        description,
        stock,
        category,
        imageUrl
    })
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
    }catch(err){
         res.status(500).json({message: "Server error"})
    }
}

export const updateProduct = async (req,res) => {
    try{
        const {name , description, price, category, stock} = req.body
        const product = await productModel.findById(req.params.id)

        if(product){
            product.name = name || product.name
            product.description = description || product.description
            product.stock = stock || product.stock,
            product.category = category || product.category,
            product.price = price || product.price
            if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            imageUrl = result.secure_url
            console.log(result)
            }
            const updateProduct = await product.save()

            res.json(updateProduct)
        }else{
            res.status(404).json({message : "Product Not Found"})
        }
    }catch(err){
        res.status(500).json({message : "Server error"})
    }
}
export const deleteProduct = async (req,res) => {
    try{
        const product = await productModel.findById(req.params.id)

        if(product){
            await product.deleteOne()
            res.json({message: "Product removed."})
        }else{
            res.status(404).json({message: "Product not found."})
        }
    }catch(err) {
        res.status(500).json({message: "Server error"})
    }
}