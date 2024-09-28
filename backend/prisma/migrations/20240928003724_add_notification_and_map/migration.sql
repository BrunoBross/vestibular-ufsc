/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "tb_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "expoToken" TEXT
);

-- CreateTable
CREATE TABLE "tb_notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    CONSTRAINT "tb_notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
