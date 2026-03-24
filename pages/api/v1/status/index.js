import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseInfo = await database.getDatabaseStatus();

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: databaseInfo.version,
    postgres_max_connections: databaseInfo.max_connections,
    postgres_connections: databaseInfo.num_connections,
  });
}

export default status;
