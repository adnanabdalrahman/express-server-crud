import pkg from "pg";

const { Pool } = pkg;
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_xf1q4HCTXoOP@ep-curly-hill-ai108uyk-pooler.c-4.us-east-1.aws.neon.tech/journal?sslmode=require&channel_binding=require",
});

export default pool;
