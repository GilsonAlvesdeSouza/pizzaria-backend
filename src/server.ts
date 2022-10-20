import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import {router} from "./routes";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.use("/products", express.static(path.resolve(__dirname, '../public/assets/img/products')))

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({error: err.message});
  }

  return res.status(500).json({
    status: "error",
    message: "internal sever error.",
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on Port => ${PORT}\nhttp://localhost:${PORT}`);
});
