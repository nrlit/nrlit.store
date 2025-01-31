-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "refundAmount" DOUBLE PRECISION,
ADD COLUMN     "refundReason" TEXT,
ADD COLUMN     "refundTransactionId" TEXT;
