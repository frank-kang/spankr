CREATE TABLE "user" (
  "id" serial PRIMARY KEY,
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "email" text NOT NULL,
  "longDescription" text NOT NULL,
  "zipCode" integer NOT NULL,
  "password" text NOT NULL,
  "skillId" integer NOT NULL,
  "playTypeId" integer NOT NULL,
  "createdAt" timestamp,
  "gender" text NOT NULL,
  "handedNessId" text NOT NULL
);

CREATE TABLE "skill" (
  "skillId" serial PRIMARY KEY,
  "skillName" text NOT NULL,
  "skillDescription" text NOT NULL
);

CREATE TABLE "playType" (
  "playTypeId" serial PRIMARY KEY,
  "playTypeName" text NOT NULL
);

ALTER TABLE "user" ADD FOREIGN KEY ("playTypeId") REFERENCES "playType" ("playTypeId");

ALTER TABLE "user" ADD FOREIGN KEY ("skillId") REFERENCES "skill" ("skillId");
