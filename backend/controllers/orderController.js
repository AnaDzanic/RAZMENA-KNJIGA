import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders 
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        membershipPrice,
        lateFee,
        damageFee,
        shippingPrice, 
        totalPrice,
        startDate,
        duration
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Nema knjiga u listi za razmenu');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            membershipPrice,
            lateFee,
            damageFee,
            shippingPrice,
            totalPrice,
            startDate,
            duration
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Zahtev za razmenu nije pronađen');
    }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Zahtev za razmenu nije pronađen');
    }
});

// @desc Update order to exchange completed
// @route PUT /api/orders/:id/complete
// @access Private
const updateOrderToCompleted = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isExchangeCompleted = true;
        order.exchangeCompletedAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Zahtev za razmenu nije pronađen');
    }
});

// @desc Approve order
// @route PUT /api/orders/:id/approve
// @access Private/Admin
const approveOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isApproved = true;
        order.approvedAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Zahtev za razmenu nije pronađen');
    }
});

// @desc Reject order
// @route PUT /api/orders/:id/reject
// @access Private/Admin
const rejectOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isApproved = false;
        order.rejectedAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Zahtev za razmenu nije pronađen');
    }
});

// @desc Get all orders
// @route GET /api/orders 
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name email');
    res.status(200).json(orders);
});

// @desc Delete order
// @route DELETE /api/orders/:id
// @access Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        await Order.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Zahtev je obrisan' });
    } else {
        res.status(404);
        throw new Error('Zahtev za razmenu nije pronađen');
    }
});

export { 
    addOrderItems, 
    getMyOrders, 
    getOrderById, 
    updateOrderToPaid, 
    updateOrderToCompleted,
    approveOrder,
    rejectOrder,
    deleteOrder,
    getOrders 
};