import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://localhost:27017/Ecom"
    );
    console.log(
      "mongo db connected,connection host || ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("db connection failed", error);
    process.exit(1);
  }
};
export { connectDB };
