import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // connecting to the mongodb
    const connection = mongoose.connection; // once connected it will give you the string

    connection.on("connected", () => {
      // event is listening by the word on
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB correction error. Please make sure MongoDB is running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
