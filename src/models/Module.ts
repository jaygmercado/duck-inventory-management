import { Schema, model, models } from 'mongoose';

const moduleSchema = new Schema({
  bootcampBatch: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'BootcampBatch',
  },
  title: {
    type: String,
    defualt: '',
  },
  content: {
    type: String,
    default: '',
  },
  sessionRecording: {
    type: String,
    default: '',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  references: [
    {
      url: {
        type: String,
        default: '',
      },
    },
  ],
});

const ModuleModel = models['module'] || model('module', moduleSchema);
export default ModuleModel;
