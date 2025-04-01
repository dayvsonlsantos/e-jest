import { describe, it, expect, beforeAll, afterAll, jest } from "@jest/globals";
import { server } from "../src/api.js";
/*
 - Deve cadastrar usuários e definir uma categoria onde:
    - Jovens Adultos: Usuários de 18 - 25
    - Adultos: Usuários de 26 - 50
    - Idosos: Usuários de 51 em diante
    - Menor: Estoura um erro
*/

describe("API Users E2E Suit", () => {
  function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
      server.once("error", (err) => reject(err));
      server.once("listening", () => resolve());
    });
  }

  let _testServer;
  let _testServerAddress;

  function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`);
    return user.json();
  }

  beforeAll(async () => {
    _testServer = server.listen();

    await waitForServerStatus(_testServer);

    const serverInfo = _testServer.address();
    _testServerAddress = `http://localhost:${serverInfo.port}`;
  });

  afterAll((done) => {
    server.closeAllConnections();
    _testServer.close(done);
  });

  it("should register a new user with a young-adult category", async () => {
    // Sempre ao usar dados, mockar o tempo
    jest.useFakeTimers({
      now: new Date("2025-01-17T00:00")
    });
    const expectedCategory = "young-adult";
    const response = await createUser({
      name: "Joao da Silva",
      birthDay: "2003-01-01" // 22 anos
    });
    expect(response.status).toBe(201); // Created
    const result = await response.json();
    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);
    expect(user.category).toBe(expectedCategory);
  });
  it.todo("should register a new user with a adult category");
  it.todo("should register a new user with a senior category");
  it("should trow an error when registering a under-age user", async () => {
    const response = await createUser({
      name: "Joao da Silva",
      birthDay: "2010-01-01" // 15 anos
    });
    expect(response.status).toBe(400); // Created
    const result = await response.json();
    expect(result).toEqual({
      validationError: "User must be at least 18 years old"
    });
  });
});
