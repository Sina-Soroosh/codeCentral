import { connections, connect } from "mongoose";

const connectToDB = async (): Promise<boolean> => {
  try {
    if (connections[0].readyState) {
      return true;
    }

    await connect(process.env.DB_URI as string);

    console.log("Connect to DB is successfully !!");

    return true;
  } catch (error) {
    console.log("Connect to DB is has error !!");

    return false;
  }
};

export { connectToDB };
