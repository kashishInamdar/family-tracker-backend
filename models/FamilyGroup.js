import mongoose from "mongoose";

const familyGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FamilyGroup = mongoose.model("FamilyGroup", familyGroupSchema);
export default FamilyGroup;
