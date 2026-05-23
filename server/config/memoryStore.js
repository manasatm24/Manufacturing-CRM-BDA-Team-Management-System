const bcrypt = require('bcryptjs');

const users = [];
const leads = [];

const toPublicUser = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const createId = () => `${Date.now()}${Math.random().toString(16).slice(2)}`;

const ensureDemoUser = async () => {
  if (users.length > 0) return;

  const now = new Date().toISOString();
  users.push({
    _id: createId(),
    name: 'Demo Admin',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    createdAt: now,
    updatedAt: now,
  });
};

const findUserByEmail = (email) => (
  users.find((user) => user.email.toLowerCase() === String(email).toLowerCase())
);

const findUserById = (id) => users.find((user) => user._id === id || user.id === id);

const createUser = async ({ name, email, password, role = 'employee' }) => {
  const now = new Date().toISOString();
  const user = {
    _id: createId(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role,
    createdAt: now,
    updatedAt: now,
  };
  users.push(user);
  return user;
};

const listEmployees = () => users.map(toPublicUser);

const createLead = (data) => {
  const now = new Date().toISOString();
  const lead = {
    _id: createId(),
    clientName: data.clientName,
    companyName: data.companyName || '',
    phone: data.phone || '',
    email: data.email || '',
    status: data.status || 'new',
    assignedTo: data.assignedTo || null,
    followUpDate: data.followUpDate || '',
    notes: data.notes || '',
    createdAt: now,
    updatedAt: now,
  };
  leads.push(lead);
  return lead;
};

const hydrateLead = (lead) => ({
  ...lead,
  assignedTo: lead.assignedTo ? toPublicUser(findUserById(lead.assignedTo) || { _id: lead.assignedTo }) : null,
});

const listLeads = ({ search, status } = {}) => leads
  .filter((lead) => !search || lead.clientName.toLowerCase().includes(String(search).toLowerCase()))
  .filter((lead) => !status || lead.status === status)
  .map(hydrateLead);

const findLead = (id) => {
  const lead = leads.find((item) => item._id === id);
  return lead ? hydrateLead(lead) : null;
};

const updateLead = (id, data) => {
  const index = leads.findIndex((lead) => lead._id === id);
  if (index === -1) return null;
  leads[index] = {
    ...leads[index],
    ...data,
    assignedTo: data.assignedTo || null,
    updatedAt: new Date().toISOString(),
  };
  return hydrateLead(leads[index]);
};

const deleteLead = (id) => {
  const index = leads.findIndex((lead) => lead._id === id);
  if (index === -1) return false;
  leads.splice(index, 1);
  return true;
};

module.exports = {
  ensureDemoUser,
  findUserByEmail,
  findUserById,
  createUser,
  toPublicUser,
  listEmployees,
  createLead,
  listLeads,
  findLead,
  updateLead,
  deleteLead,
};
