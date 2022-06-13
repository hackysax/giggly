// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from "./db/connect.js";
// import Gig from "./models/Gig.js";
// import { readFile } from "fs/promises";

// const startImport = async () => {
//   const mockDataUrl = "./mock-gig-data.json";
//   try {
//     await connectDB(process.env.MONGO_URL);
//     const jsonMockData = JSON.parse(
//       await readFile(new URL(mockDataUrl, import.meta.url))
//     );
//     await Gig.create(jsonMockData);
//     console.log("Data successfully imported");
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// startImport();
