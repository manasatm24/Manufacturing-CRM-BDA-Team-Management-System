const Lead = require('../models/Lead');
const memoryStore = require('../config/memoryStore');

const buildReports = (leads) => {
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);
  const dailyLeads = leads.filter((lead) => lead.createdAt && lead.createdAt.slice(0, 10) === today);
  const monthlyLeads = leads.filter((lead) => lead.createdAt && lead.createdAt.slice(0, 7) === month);
  const convertedLeads = leads.filter((lead) => lead.status === 'converted');

  return {
    today,
    month,
    daily: {
      total: dailyLeads.length,
      converted: dailyLeads.filter((lead) => lead.status === 'converted').length,
    },
    monthly: {
      total: monthlyLeads.length,
      converted: monthlyLeads.filter((lead) => lead.status === 'converted').length,
    },
    conversion: {
      totalLeads: leads.length,
      converted: convertedLeads.length,
      rate: leads.length ? Math.round((convertedLeads.length / leads.length) * 100) : 0,
    },
  };
};

exports.summary = async (req, res) => {
  try {
    if (global.useMemoryStore) {
      return res.json(buildReports(memoryStore.listLeads()));
    }

    const leads = await Lead.find().lean();
    return res.json(buildReports(leads));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
