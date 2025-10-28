// server/models.js
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    username: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["viewer", "editor", "admin"],
      default: "viewer", // 🔹 Corrigé: tu avais "Full-Time" qui n'existe pas dans l'enum
    },
  },
  {
    timestamps: true, // crée automatiquement createdAt et updatedAt
  }
);

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, default: null },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const jobSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Remote", "Internship"],
      default: "Full-Time",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: {
      type: String,
      enum: [
        "Under $50K",
        "$50K - $60K",
        "$60K - $70K",
        "$70K - $80K",
        "$80K - $90K",
        "$90K - $100K",
        "$100K - $125K",
        "$125K - $150K",
        "$150K - $175K",
        "$175K - $200K",
        "Over $200K",
      ],
      default: null,
    },
    location: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", userSchema);
export const Company = models.Company || model("Company", companySchema);
export const Job = models.Job || model("Job", jobSchema);
