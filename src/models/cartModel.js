// cartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'GenProduct'
            },
            quantity: Number
        }
    ]
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart
