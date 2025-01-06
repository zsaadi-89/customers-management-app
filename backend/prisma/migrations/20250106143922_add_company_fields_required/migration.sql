/*
  Warnings:

  - Made the column `siren` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `siret` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vatNumber` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "vatNumber" TEXT NOT NULL
);
INSERT INTO "new_Client" ("email", "id", "name", "phoneNumber", "siren", "siret", "vatNumber") SELECT "email", "id", "name", "phoneNumber", "siren", "siret", "vatNumber" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
