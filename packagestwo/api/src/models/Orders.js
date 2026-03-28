const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = new mongoose.Schema(
	{
		orderId: {
			type: String,
			required: true,
			unique: true,
			index: true
		},

		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},

		vendorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Vendor',
			required: true
		},

		items: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true
				},
				quantity: {
					type: Number,
					required: true,
					min: 1
				},
				price: {
					type: Number,
					required: true
				}
			}
		],

		priceDetails: {
			price: { type: Number, default: 0 },
			gst: { type: Number, default: 0 },
			coupon: { type: Number, default: 0 },
			deliveryCharges: { type: Number, default: 0 },
			extraCharges: { type: Number, default: 0 },
			totalAmount: { type: Number, required: true }
		},

		payment: {
            method: {
                type: String,
                enum: ['cod', 'online'],
                default: 'cod'
            },
            amount: {
                type: Number,
                default: 0
            },
            addedAt: {
                type: Date,
            },
            status: {
                type: String,
                enum: ['pending', 'confirmed', 'failed'],
                default: 'pending'
            }
        },

		status: {
			type: String,
			enum: [
				'pending',
				'confirmed',
				'placed',
				'shipped',
				'out_for_delivery',
				'delivered',
				'cancelled'
			],
			default: 'pending'
		},

		address: { type: mongoose.Schema.Types.Mixed },

		tracking: [{
			status: {
				type: String,
				enum: [
					'pending',
					'confirmed',
					'placed',
					'shipped',
					'out_for_delivery',
					'delivered',
					'cancelled'
				],
			},
			addedAt: {
				type: Date,
				default: Date.now
			}
		}]

	},
	{
		timestamps: true,
		versionKey: false
	});

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', orderSchema);