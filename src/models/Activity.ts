import { Schema, model, models } from 'mongoose';

const activitySchema = new Schema({
  bootcampBatch: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'BootcampBatch',
  },
  title: {
    type: String,
    default: '',
  },
  instructions: {
    type: String,
    default: '',
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
  submissions: [
    {
      member: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User',
      },
      url: {
        type: String,
        default: '',
      },
    },
  ],
});

const ActivityModel = models['activity'] || model('activity', activitySchema);
export default ActivityModel;
