import { Schema, models, model } from 'mongoose';

const supplierSchema = new Schema({
  name: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String },
  website: { type: String },
});

const Supplier = models['supplier'] || model('supplier', supplierSchema);

export default Supplier;
