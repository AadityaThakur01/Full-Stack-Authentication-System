import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { connect } from "./src/dbConfig/dbConfig.js";
import User from "./src/models/userModel.js";

async function test() {
  await connect();
  const user = await User.findOne();
  if (user) {
    console.log("Found user:", user.email);
    console.log("Has password field:", !!user.password);
    console.log("Password hash starts with $2a$10$?:", user.password?.startsWith("$2a$10$"));
  } else {
    console.log("No users found.");
  }
  process.exit(0);
}

test();
