import { instanceRazor } from "../config/razorpay.js";
import Payment from "../model/payment.js";
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config();
const addCredits = async ({ userId, credits }) => {
    try {
        const url = `${process.env.AUTH_SERVICE_URL}/user/credit-add`
        const response = await fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId , credits
            })
        })
        if (!response.ok) {
        throw new Error("Credit addition failed");
    }
        const data = await response.json();
    } catch (e) {
        console.log("error during updating credit after payment")
        console.log(e.message);
    }
}


const plans = {
    Basic: {
        name: "Basic",
        amount: 19900,
        credits: 2000,
    },
    Pro: {
        name: "Pro",
        amount: 49900,
        credits: 5000
    }
}

export const createOrder = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(400).json({ message: "userId not found" })
        }

        const { plan } = req.body;
        const planselected = plans[plan];
        if (!planselected) {
    return res.status(400).json({
        message: "Invalid plan selected"
    });
}
        const order = await instanceRazor.orders.create({
            amount: planselected.amount,
            currency: "INR",
            receipt: `receipt-${Date.now()}`,
            notes: { userId, plan }
        })

        const paymentget = await Payment.create({
            userId,
            plan,
            credits:planselected.credits,
            amount: planselected.amount,
            razorpayOrderId: order.id,
            status: "created"
        })

        return res.status(200).json({
            order: {
                id: order.id,
                amount: order.amount
            },
            plan: {
                name: planselected.name,
                credits: planselected.credits
            },

        })
    } catch (e) {
        return res.status(500).json({
            message: "order creation error"
        })
    }
}


//verify payment

export const paymentVerify = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(400).json({ message: "userId not found" })
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "razorpay_order_id , razorpay_payment_id,razorpay_signature not found" });
        }

        //signature generation
        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id  , userId})
        if (!payment) {
            return res.status(400).json({ message: "payment not found" })
        }

        if (payment.status == 'paid') {
            return res.status(400).json({ message: "payment is aleady paid " })
        }
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');

        if (razorpay_signature !== generatedSignature) {
            payment.status = 'failed'
            await payment.save();
            return res.status(400).json({ message: "payment failed during validation " })
        }

        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();

        const data = await addCredits({userId , credits:payment.credits});

          return res.status(200).json({ message: "payment is successfully verified " })

    } catch (e) {
         return res.status(500).json({
            message: "order verification error"
        })
    }
}

export const getPaymentHistory = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
       
        if (!userId) {
            return res.status(400).json({
                message: "userId not found"
            });
        }

        const payments = await Payment.find({ userId })
            .sort({ createdAt: -1 }).limit(15);

        return res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });

    } catch (e) {
        console.error("Payment history error:", e);

        return res.status(500).json({
            message: "Unable to fetch payment history"
        });
    }
};