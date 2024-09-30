import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully.");
  } catch (err) {
    console.log("There is some problem in connecting to database.", err);
  }
}
