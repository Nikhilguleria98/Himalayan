import bcrypt from "bcryptjs";
import User from "../models/User.js";

const DEFAULT_ADMIN = {
  userName: "admin",
  email: "admin@himalayankhadu.com",
  password: "Admin@12345",
};

export const seedAdminUser = async () => {
  const adminUserName = process.env.ADMIN_USERNAME || DEFAULT_ADMIN.userName;
  const adminEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN.email;
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN.password;

  try {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      existingAdmin.userName = existingAdmin.userName || adminUserName;
      existingAdmin.role = "admin";
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`Admin account ready: ${adminEmail}`);
      return;
    }

    const existingUserName = await User.findOne({ userName: adminUserName });
    const userName = existingUserName
      ? `${adminUserName}-${Date.now()}`
      : adminUserName;

    await User.create({
      userName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin account created: ${adminEmail}`);
  } catch (error) {
    console.error("Failed to seed admin account:", error.message);
  }
};
