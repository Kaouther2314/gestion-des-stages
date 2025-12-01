const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["etudiant", "medecin", "hopital", "doyen"],
      default: "etudiant",
    },
    cv: { type: String, default: null },
    bio: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    refreshTokens: [{ token: String, createdAt: { type: Date, default: Date.now } }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
