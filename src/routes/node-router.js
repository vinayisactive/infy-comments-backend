import { Router } from "express";
import { createNode, getBaseNodes, getSubNodes, deleteNode, updateNodeName} from "../controllers/node-controller.js";

const nodeRouter = Router(); 

nodeRouter.post("/create", createNode); 
nodeRouter.get("/base-nodes", getBaseNodes);
nodeRouter.patch("/update/:nodeId", updateNodeName);
nodeRouter.get("/sub-nodes/:nodeId", getSubNodes); 
nodeRouter.delete("/delete/:nodeId", deleteNode); 

export default nodeRouter; 