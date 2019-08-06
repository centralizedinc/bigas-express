var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrdersModelSchema = new Schema({
    order: [{
        order_type: {
            type: String
        },
        price: {
            type: Number
        },
        qty: {
            type: Number
        },
        total: {
            type: Number
        }
    }],
    personal_info: {
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        address_details: {
            address: {
                type: String
            },
            city: {
                type: String
            },
            province: {
                type: String
            },
            zip_code: {
                type: String
            }
        },
        email: {
            type: String
        },
        contact: {
            type: String
        }
    },
    additional_info: {
        type: String
    },
    sender: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    }
});


module.exports = mongoose.model('orders', OrdersModelSchema);