set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "genders" (
  "genderId" serial PRIMARY KEY,
  "genderName" text NOT NULL);

CREATE TABLE "handedness" (
  "handedNessId" serial PRIMARY KEY,
  "handedNessName" text NOT NULL);

CREATE TABLE "skills" (
  "skillId" serial PRIMARY KEY,
  "skillName" text NOT NULL,
  "skillDescription" text NOT NULL
);

CREATE TABLE "playTypes" (
  "playTypeId" serial PRIMARY KEY,
  "playTypeName" text NOT NULL
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "firstName" text,
  "lastName" text,
  "email" text,
  "longDescription" text,
  "zipCode" integer,
  "password" text,
  "skillId" integer,
  "playTypeId" integer,
  "createdAt" timestamp,
  "genderId" integer,
  "handedNessId" integer
);



ALTER TABLE "users" ADD FOREIGN KEY ("playTypeId") REFERENCES "playTypes" ("playTypeId");

ALTER TABLE "users" ADD FOREIGN KEY ("skillId") REFERENCES "skills" ("skillId");

ALTER TABLE "users" ADD FOREIGN KEY ("handedNessId") REFERENCES "handedness" ("handedNessId");

ALTER TABLE "users" ADD FOREIGN KEY ("genderId") REFERENCES "genders" ("genderId");
