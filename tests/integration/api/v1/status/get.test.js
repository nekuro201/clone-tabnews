test("GET to /api/v1/status should returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.postgres_version).toBeDefined();
  expect(responseBody.postgres_version).toEqual(expect.any(String));

  expect(responseBody.postgres_max_connections).toBeDefined();
  expect(responseBody.postgres_max_connections).toEqual(expect.any(Number));
  expect(typeof responseBody.postgres_max_connections).not.toBe("string");

  expect(responseBody.postgres_connections).toBeDefined();
  expect(responseBody.postgres_connections).toEqual(expect.any(Number));
  expect(typeof responseBody.postgres_connections).not.toBe("string");
});
