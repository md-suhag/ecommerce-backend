import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  await mongoose.connect(config.db_url as string);
  app.listen(config.port, () => {
    {
      console.log(
        `your ecommerce-inventory server is running at http://localhost:${config.port}`
      );
    }
  });
}
main()
  .then(() => console.log("mongodb is connected successfully"))
  .catch((err) => console.log(err));
