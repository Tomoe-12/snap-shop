CREATE TABLE IF NOT EXISTS "two_factor_token" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT "two_factor_token_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "two_factor_token" ADD CONSTRAINT "two_factor_token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
