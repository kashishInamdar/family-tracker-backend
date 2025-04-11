import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import FamilyGroup from "../models/FamilyGroup.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // .env me store karna

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, familyGroupName } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if family group exists or create new
    let familyGroup = await FamilyGroup.findOne({ name: familyGroupName });
    if (!familyGroup) {
      familyGroup = await FamilyGroup.create({ name: familyGroupName });
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      passwordHash,
      familyGroupId: familyGroup._id,
    });

    // Add user to group
    familyGroup.members.push(newUser._id);
    await familyGroup.save();

    // Generate token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};