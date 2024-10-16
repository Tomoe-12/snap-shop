// Make sure to install the 'pg' package 
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from '@/server/schema' 


const sql = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(sql,{schema,logger : true});
 
