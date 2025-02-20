import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  accessibilityOptions: {
    ramp: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    quietRoom: { type: Boolean, default: false },
    interpreter: { type: Boolean, default: false },
    therapyAnimals: { type: Boolean, default: false },
  },
  publicTransportProximity: { type: Boolean, default: false },
  wcAccessible: { type: Boolean, default: false },
  elevatorAccessible: { type: Boolean, default: false },
  languageOptions: [String],
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number, comment: String }],
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
