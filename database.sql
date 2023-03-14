-- You must use double quotes in every query that user is in:

CREATE TABLE "game" (
	"id" SERIAL PRIMARY KEY,
	"game" VARCHAR(255)
);	

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"pfp" VARCHAR(255)
);	

CREATE TABLE "score" (
	"score" INTEGER,
	"game_id" INT REFERENCES "game",
	"user_id" INT REFERENCES "user"
);
