"use server"

import User from "../models/user.model";
import { connectDB } from "../db";
import bcrypt from "bcryptjs";

export const signIn = async (userData: signInProps) => {
  try {
    await connectDB();
    const existingUser = await User.findOne({ email: userData.email });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(userData.password, existingUser.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    if (existingUser) {
      return JSON.parse(JSON.stringify(existingUser));
    }
  } catch (error) {
    console.log(error);
  }
}
export const signUp = async (userData: SignUpParams) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  try {
    await connectDB();
    // check if user already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    console.log("Incoming user:", userData);

    // create new user
    const newUser = await User.create({
      email: userData.email,
      password: hashedPassword,
      userId: crypto.randomUUID(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      address1: userData.address1,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
      dob: userData.dateOfBirth,
      ssn: userData.ssn,
    });

    console.log("User created:", newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};