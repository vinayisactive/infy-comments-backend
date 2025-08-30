import { Router } from "express";
import nodeRouter from "./node-router.js";

const apiV1 = Router(); 

apiV1.use("/node", nodeRouter); 

export default apiV1; 