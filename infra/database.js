import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  try {
    const result = await client.query(queryObject);
    await client.end();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
}

async function getDatabaseStatus() {
  const queryText = `
    SELECT
      current_setting('server_version') AS version,
      current_setting('max_connections')::int AS max_connections,
      (SELECT count(*)::int FROM pg_stat_activity) AS num_connections;
  `;

  const result = await query(queryText);

  return result.rows[0];
}

export default {
  query: query,
  getDatabaseStatus,
};
