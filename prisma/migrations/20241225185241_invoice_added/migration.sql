/*
  Warnings:

  - Added the required column `invoiceNumber` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "invoiceNumber" TEXT NOT NULL;
