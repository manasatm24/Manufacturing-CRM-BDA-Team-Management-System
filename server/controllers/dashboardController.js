const Lead = require('../models/Lead');
const User = require('../models/User');
const memoryStore = require('../config/memoryStore');

exports.stats = async (req, res) => {
  try {
    if (global.useMemoryStore) {
      const leads = memoryStore.listLeads();
      const totalLeads = leads.length;
      const converted = leads.filter((lead) => lead.status === 'converted').length;
      const pending = leads.filter((lead) => ['follow-up', 'contacted'].includes(lead.status)).length;
      const monthlyAgg = Object.values(leads
        .filter((lead) => lead.status === 'converted')
        .reduce((acc, lead) => {
          const month = lead.createdAt.slice(0, 7);
          acc[month] = acc[month] || { _id: month, count: 0 };
          acc[month].count += 1;
          return acc;
        }, {}));
      const perfMap = leads
        .filter((lead) => lead.status === 'converted' && lead.assignedTo)
        .reduce((acc, lead) => {
          const id = lead.assignedTo._id;
          acc[id] = acc[id] || { employeeId: id, name: lead.assignedTo.name, converted: 0 };
          acc[id].converted += 1;
          return acc;
        }, {});
      return res.json({ totalLeads, converted, pending, monthlyAgg, perf: Object.values(perfMap) });
    }

    const totalLeads = await Lead.countDocuments();
    const converted = await Lead.countDocuments({ status: 'converted' });
    const pending = await Lead.countDocuments({ status: { $in: ['follow-up','contacted'] } });

    // Monthly sales dummy aggregation (by createdAt)
    const monthlyAgg = await Lead.aggregate([
      { $match: { status: 'converted' } },
      { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Employee performance: converted leads per employee
    const perf = await Lead.aggregate([
      { $match: { status: 'converted', assignedTo: { $ne: null } } },
      { $group: { _id: '$assignedTo', converted: { $sum: 1 } } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, employeeId: '$user._id', name: '$user.name', converted: 1 } }
    ]);

    res.json({ totalLeads, converted, pending, monthlyAgg, perf });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
