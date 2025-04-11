import User from "../models/User.js";


// ✅ Update user's current location
export const updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Latitude and longitude required" });
  }

  try {
    req.user.currentLocation = {
      lat,
      lng,
      timestamp: new Date(),
    };

    await req.user.save();

    res.status(200).json({ message: "Location updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update location", error: err.message });
  }
};

// ✅ Get all family members' latest locations
export const getFamilyLocations = async (req, res) => {
  try {
    const familyGroupId = req.user.familyGroupId;

    const members = await User.find({ familyGroupId }).select("name email currentLocation");

    res.status(200).json({ members });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch locations", error: err.message });
  }
};
