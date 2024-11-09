import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  यादीभाग: String,
  बूथ_नं: String,
  अ_क्र: String,
  lastName: String,
  firstName: String,
  middleName: String,
  eLastName: String,
  eFirstName: String,
  eMiddleName: String,
  लिंग: String,
  वय: String,
  voterId: { type: String, index: true },
  मतदान_केंद्र: String
}, {
  timestamps: true
});

// Create indexes for faster searching
voterSchema.index({ firstName: 1, lastName: 1, middleName: 1 });
voterSchema.index({ eFirstName: 1, eLastName: 1, eMiddleName: 1 });

export default mongoose.models.Voter || mongoose.model('Voter', voterSchema);