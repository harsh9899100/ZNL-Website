const { Schema, model } = require('mongoose');

const serviceSchema = new Schema({
    service_category: { type: String, required: true },
    service_type: { type: String, required: true },
    price_range: { type: String, required: true }
});

const Service = new model('Service', serviceSchema);

module.exports = Service;
