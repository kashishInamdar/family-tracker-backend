import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  familyGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FamilyGroup",
    required: true,
  },

  currentLocation: {
    lat: Number,
    lng: Number,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
