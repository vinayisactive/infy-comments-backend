-- CreateTable
CREATE TABLE "public"."Node" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentNodeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Node" ADD CONSTRAINT "Node_parentNodeId_fkey" FOREIGN KEY ("parentNodeId") REFERENCES "public"."Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
