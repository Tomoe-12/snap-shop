CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"title" text NOT NULL,
	"price" real NOT NULL,
	"created_at" timestamp DEFAULT now()
);
