const Lead = require('../models/Lead');
const memoryStore = require('../config/memoryStore');

exports.createLead = async (req, res) => {
  try {
    if (global.useMemoryStore) {
      const lead = memoryStore.createLead(req.body);
      return res.json(lead);
    }

    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { search, status } = req.query;
    if (global.useMemoryStore) {
      return res.json(memoryStore.listLeads({ search, status }));
    }

    const query = {};
    if (search) query.clientName = { $regex: search, $options: 'i' };
    if (status) query.status = status;
    const leads = await Lead.find(query).populate('assignedTo', 'name email');
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLead = async (req, res) => {
  try {
    if (global.useMemoryStore) {
      const lead = memoryStore.findLead(req.params.id);
      if (!lead) return res.status(404).json({ msg: 'Lead not found' });
      return res.json(lead);
    }

    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateLead = async (req, res) => {
  try {
    if (global.useMemoryStore) {
      const lead = memoryStore.updateLead(req.params.id, req.body);
      if (!lead) return res.status(404).json({ msg: 'Lead not found' });
      return res.json(lead);
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteLead = async (req, res) => {
  try {
    if (global.useMemoryStore) {
      memoryStore.deleteLead(req.params.id);
      return res.json({ msg: 'Lead removed' });
    }

    await Lead.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Lead removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
