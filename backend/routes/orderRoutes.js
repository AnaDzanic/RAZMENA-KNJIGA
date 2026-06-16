import express from "express";
const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToCompleted,
    approveOrder,
    rejectOrder,
    deleteOrder,
    getOrders
} from "../controllers/orderController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/complete").put(protect, updateOrderToCompleted);
router.route("/:id/approve").put(protect, admin, approveOrder);
router.route("/:id/reject").put(protect, admin, rejectOrder);
router.route("/:id").get(protect, getOrderById).delete(protect, admin, deleteOrder);

export default router;