const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sales: { type: Number, default: 0 },
  month: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);
