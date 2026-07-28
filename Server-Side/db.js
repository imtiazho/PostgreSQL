import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "58045652",
  host: "localhost",
  post: 5432,
  database: "tododb",
});

export default pool;
