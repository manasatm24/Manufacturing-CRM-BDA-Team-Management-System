const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  companyName: { type: String },
  phone: { type: String },
  email: { type: String },
  status: { type: String, enum: ['new','contacted','follow-up','converted','lost'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  followUpDate: { type: Date },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
