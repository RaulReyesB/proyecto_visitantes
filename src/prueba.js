// testCheckService.js
import db from "./conecction.js"
import checkAndCompleteService from "./utils/checkAndCompleteService.js";

const testCheckService = async () => {
  try {
    await db.authenticate();
    console.log("Database connected");

    await checkAndCompleteService();

    console.log("Service completion check done");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.close();
  }
};

testCheckService();
