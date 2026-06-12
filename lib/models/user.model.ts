import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  ssn: {
    type: String,
  },
  dwollaCustomerId: {
    type: String,
  },
  dwollaCustomerUrl: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);