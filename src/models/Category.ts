import { Schema, models, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Category = models['category'] || model('category', categorySchema);

export default Category;
