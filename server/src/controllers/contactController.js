const Contact = require("../models/contactModel");
const logActivity = require("../utils/activityLogger");

// ➕ Create Contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, company, position, lead } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      position,
      lead,
      createdBy: req.user._id,
    });

    // Log creation
    await logActivity({
      resourceType: "Contact",
      resourceId: contact._id,
      action: "create",
      performedBy: req.user._id,
      changes: { name, email },
    });

    res.status(201).json({ success: true, contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📋 Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("lead", "name email")
      .populate("createdBy", "name email");
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ Update Contact
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const contact = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    // Log update
    await logActivity({
      resourceType: "Contact",
      resourceId: contact._id,
      action: "update",
      performedBy: req.user._id,
      changes: updates,
    });

    res.json({ success: true, contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.deleteOne();

    // Log deletion
    await logActivity({
      resourceType: "Contact",
      resourceId: id,
      action: "delete",
      performedBy: req.user._id,
      changes: { name: contact.name },
    });

    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
