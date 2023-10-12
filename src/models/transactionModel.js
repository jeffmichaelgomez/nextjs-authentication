import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalAmount: Number,
    date: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'GenProduct'
            },
            quantity: Number,
            priceAtTimeOfPurchase: Number
        }
    ]
});

const Transactions = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default Transactions