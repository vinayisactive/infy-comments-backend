import { earlyReturnResponse, errorResponse, successResponse } from "../utilities/response-handler.js";
import db from "../database/database.js";

const createNode = async (req, res) => {
    const { nodeName, parentNodeId } = req.body;

    if (!nodeName) {
        return earlyReturnResponse(res, "Node name is missing.", 400);
    }

    let newNode;

    try {

        if (parentNodeId) {
            const parentNode = await db.node.findUnique({
                where: { id: parentNodeId },
            });

            if (!parentNode) {
                return earlyReturnResponse(res, "Parent node not found.", 404);
            }

            newNode = await db.node.create({
                data: {
                    name: nodeName,
                    parentNodeId: parentNodeId,
                },
            });
            
        } else {

            newNode = await db.node.create({
                data: {
                    name: nodeName,
                },
            });

        }
        return successResponse(res, "Node created successfully.", newNode, 201);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getBaseNodes = async (req, res) => {
    try {
        const rootNodes = await db.node.findMany({
            where: {
                parentNodeId: null,
            },
            include: {
                _count: {
                    select: { subNodes: true },
                },
            },
        });

        return successResponse(res, "Root nodes retrieved successfully.", rootNodes);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const updateNodeName = async (req, res) => {
    const { nodeId } = req.params;
    const { nodeName } = req.body;

    if (!nodeName) {
        return earlyReturnResponse(res, "New node name is missing.", 400);
    }

    try {
        const updatedNode = await db.node.update({
            where: {
                id: nodeId,
            },
            data: {
                name: nodeName,
            },
        });

        return successResponse(res, "Node updated successfully.", updatedNode);
    } catch (error) {
        // Prisma throws P2025 if the record to update is not found
        if (error.code === 'P2025') {
            return earlyReturnResponse(res, "Node to update not found.", 404);
        }
        return errorResponse(res, error);
    }
};

const getSubNodes = async (req, res) => {
    const { nodeId } = req.params;

    if (!nodeId) {
        return earlyReturnResponse(res, "Node id is missing.", 400);
    }

    try {
        const nodeWithSubNodes = await db.node.findUnique({
            where: {
                id: nodeId,
            },
            select: {
                subNodes: {
                    include:  {
                        _count: {
                            select: {
                                subNodes: true
                            }
                        }
                    }
                }
            }
        });

        if (!nodeWithSubNodes) {
            return earlyReturnResponse(res, "Node not found.", 404);
        }

        return successResponse(res, "Sub-nodes retrieved successfully.", nodeWithSubNodes.subNodes);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const deleteNode = async (req, res) => {
    const { nodeId } = req.params;

    if (!nodeId) {
        return earlyReturnResponse(res, "Node id is missing.", 400);
    }

    try {
        const deletedNode = await db.node.delete({
            where: {
                id: nodeId,
            },
        });

        return successResponse(res, `Node '${deletedNode.name}' and all its children were deleted successfully.`);
    } catch (error) {
        if (error.code === 'P2025') {
            return earlyReturnResponse(res, "Node to delete not found.", 404);
        }
        return errorResponse(res, error);
    }
};


export {
    createNode,
    getBaseNodes,
    updateNodeName,
    getSubNodes,
    deleteNode
};