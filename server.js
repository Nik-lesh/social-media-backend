import server from "./index.js";
import dontenv from "dotenv";
dontenv.config();
import connectDB from "./src/config/connect.db.js";
const port = process.env.PORT;
server.listen(port, async () => {
  await connectDB();
  console.log(`server is running on port ${port}`);
});
