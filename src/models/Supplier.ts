import { Schema, models, model } from 'mongoose';

const supplierSchema = new Schema({
  name: { type: String, required: true },
  contactInfo: { type: String },
});

const Supplier = models['supplier'] || model('supplier', supplierSchema);

export default Supplier;
