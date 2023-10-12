import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please provide email'],
		unique: true,
	},
	name: {
		type: String,
		required: [true, 'Please provide full name'],
	},
	address: {
		type: String,
		required: [true, 'Please provide address'],
    }
});

const Customer = mongoose.models.customers || mongoose.model('customers', customerSchema);

export default Customer;
