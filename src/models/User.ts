import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  dateOfBirth: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: '',
  },
  coverPhoto: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  roles: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    default: '',
  },
  cys: {
    type: String,
    default: '',
  },
});

const UserModel = models['user'] || model('user', userSchema);

export default UserModel;
