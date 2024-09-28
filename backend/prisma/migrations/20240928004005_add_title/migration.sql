/*
  Warnings:

  - Added the required column `title` to the `tb_notification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    CONSTRAINT "tb_notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tb_notification" ("id", "message", "userId") SELECT "id", "message", "userId" FROM "tb_notification";
DROP TABLE "tb_notification";
ALTER TABLE "new_tb_notification" RENAME TO "tb_notification";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
