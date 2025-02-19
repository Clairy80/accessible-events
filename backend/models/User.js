import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },  
  savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  reviews: [
    {
      event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String }
    }
  ]
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;
