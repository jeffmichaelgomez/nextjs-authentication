import mongoose from 'mongoose';

const genProductSchema = new mongoose.Schema({
	productId: {
		type: String,
		required: [true, 'Please provide product name'],
	},
	brand: {
		type: String,
		required: [true, 'Please provide brand'],
	},
	manufacturer: {
		type: String,
		required: [true, 'Please provide manufacturer'],
    },
	price: {
		type: Number,
		required: [true, 'Please provide price'],
    },
	lotNo: {
		type: String,
		required: [true, 'Please provide lot number'],
    },
	expiry: {
		type: Date,
		required: [true, 'Please provide expiry'],
    }
});

const GenProduct = mongoose.models.genProduct || mongoose.model('genProduct', genProductSchema);

export default GenProduct;
