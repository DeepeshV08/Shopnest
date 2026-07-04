import express from "express";
import {protect} from '../middleware/authMiddleware.js'
import { admin } from "../middleware/adminMiddleware.js";
import { createOrder } from "../controller/orderController.js";
import { getOrders } from "../controller/orderController.js";
import { getOrderById } from "../controller/orderController.js";
import { updateOrderStatus } from "../controller/orderController.js";

const orderRouter = express.Router()

orderRouter.route("/").post(protect, createOrder).get(protect, admin, getOrders)
orderRouter.route('/myorders').get(protect, getOrderById)
orderRouter.route('/:id/status').put(protect, admin , updateOrderStatus)

export default orderRouter