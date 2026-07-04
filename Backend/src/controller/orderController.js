import orderModel from "../model/orderModel.js";
import sendEmail from '../utils/sendEmail.js'

export const createOrder = async () => {

    try {
        const { items, totalAmount, address, paymendId } = req.body
        if (!items || items.length == 0 || !totalAmount || !address) {
            return res.status(400).json({ message: "Invalid order data" })
        }
        else {
            const order = await orderModel.create({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })
            await order.save()
            const message = `🎉 Hello ${req.user.name},

            Your order has been placed successfully!

            📦 Order ID: ${order._id}
            👤 Customer ID: ${req.user._id}
            💰 Total Amount: ₹${totalAmount}

            We'll notify you as soon as your order is shipped.

            Thank you for shopping with us! ❤️`;

            await sendEmail(req.user.email, "order Created", message)
            res.status(201).json({ message: "Order created successfully", order })
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating order", err })
    }
}

export const getOrderById = async (req, res) => {
    try {
       const orders = await orderModel.find({user: req.user._id}).populate('items.productId', 'name price')
       res.status(200).json({ orders })
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", err })
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('userId', 'id name')
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", err })
    }
}

export const updateOrderStatus = async(req, res) => {
    try{
        const {status} = req.body
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }
        order.status = status
        await order.save()
        res.status(200).json({ message: "Order status updated", order })
    } catch (err) {
        res.status(500).json({ message: "Error updating order status", err })
    }
}