import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToServer } from "./db/conn";
import InspectionRoutes from "./routes/inspection.route";
//env config
dotenv.config({ path: "./config.env" });
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(InspectionRoutes);

app.listen(port, async () => {
  // perform a database connection when server starts
  await connectToServer();
  console.log(`Server is running on port: ${port}`);
});
