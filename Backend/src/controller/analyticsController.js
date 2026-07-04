import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import productModel from "../model/productModel.js";

export const getAdminStats = async (req, res) => {
    try{
        const totalUsers = await userModel.countDocuments({ role: 'user' })
        const totalOrders = await orderModel.countDocuments({})
        const totalProducts = await productModel.countDocuments({})

        const orders = await orderModel.find({})

        const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0)

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenueData
        })
    }
    catch(err){
        res.status(500).json({ message: "Error fetching admin stats", err })
    }
}