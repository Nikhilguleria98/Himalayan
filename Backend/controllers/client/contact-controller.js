import Contact from "../../models/contact.js";

// POST /api/client/contact/send
export const submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, trip, location, message } =
      req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !trip || !location || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      trip,
      location,
      message,
    });

    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully! We will get back to you soon.",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

// GET /api/client/contact/all  (admin use — view all messages)
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
    });
  }
};
