import { Schema, model, models } from 'mongoose';

const bootcampBatchSchema = new Schema({
  batchNumber: {
    type: String,
    default: '',
  },
  bootcampers: [
    {
      member: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User',
      },
      active: {
        type: Boolean,
        default: true,
      },
      dayAdded: {
        type: Date,
        default: Date.now,
      },
      dayRemoved: {
        type: Date,
      },
    },
  ],
  handlers: [
    {
      instructor: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User',
      },
      dayAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const BootcampBatchModel = models['bootcampbatch'] || model('bootcampbatch', bootcampBatchSchema);

export default BootcampBatchModel;
