import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mockUserRepository = {
  execute: jest.fn(),
  getUserByEmail: jest.fn(),
  getUserById: jest.fn(),
  getUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

const mockAuthRepository = {
  login: jest.fn(),
};

const mockTransactionRepository = {
  createTransaction: jest.fn(),
  getTransactionById: jest.fn(),
  getTransactionsByUserId: jest.fn(),
  updateTransaction: jest.fn(),
  deleteTransaction: jest.fn(),
  getAllTransactions: jest.fn(),
};

jest.mock("uuid", () => ({
  v4: jest.fn(() => "generated-user-id"),
}));

jest.mock("./repositories/userRepository.js", () => ({
  UserRepository: jest.fn(() => mockUserRepository),
}));

jest.mock("./repositories/authRepositoy.js", () => ({
  AuthRepository: jest.fn(() => mockAuthRepository),
}));

jest.mock("./repositories/transactionsRepositories.js", () => ({
  TransactionRepository: jest.fn(() => mockTransactionRepository),
}));

describe("API", () => {
  let app;
  let server;
  let baseUrl;

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-secret";
    ({ app } = await import("../index.js"));

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const { port } = server.address();
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const request = async (path, options = {}) => {
    const { headers, ...fetchOptions } = options;
    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...fetchOptions,
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : undefined;

    return { response, body };
  };

  describe("users", () => {
    it("cria usuario", async () => {
      const payload = {
        first_name: "Ada",
        last_name: "Lovelace",
        email: "ADA@TEST.COM",
        password: "12345678",
      };
      mockUserRepository.getUserByEmail.mockResolvedValue(undefined);
      mockUserRepository.execute.mockResolvedValue({
        id: "user-id",
        ...payload,
        email: "ada@test.com",
        password: "hash",
      });

      const { response, body } = await request("/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(201);
      expect(body).toEqual({
        id: expect.any(String),
        first_name: "Ada",
        last_name: "Lovelace",
        email: "ada@test.com",
      });
      expect(mockUserRepository.execute).toHaveBeenCalled();
    });

    it("retorna erro 400 para payload invalido de usuario", async () => {
      const { response, body } = await request("/users", {
        method: "POST",
        body: JSON.stringify({
          first_name: "",
          last_name: "Lovelace",
          email: "email-invalido",
          password: "123",
        }),
      });

      expect(response.status).toBe(400);
      expect(body.message).toBe("Erro de validação");
    });

    it("lista usuarios sem password", async () => {
      mockUserRepository.getUser.mockResolvedValue([
        {
          id: "user-id",
          first_name: "Ada",
          last_name: "Lovelace",
          email: "ada@test.com",
          password: "hash",
        },
      ]);

      const { response, body } = await request("/users");

      expect(response.status).toBe(200);
      expect(body).toEqual([
        {
          id: "user-id",
          first_name: "Ada",
          last_name: "Lovelace",
          email: "ada@test.com",
        },
      ]);
    });

    it("busca usuario por id sem password", async () => {
      mockUserRepository.getUserById.mockResolvedValue({
        id: "user-id",
        first_name: "Ada",
        last_name: "Lovelace",
        email: "ada@test.com",
        password: "hash",
      });

      const { response, body } = await request("/users/user-id");

      expect(response.status).toBe(200);
      expect(body).toEqual({
        id: "user-id",
        first_name: "Ada",
        last_name: "Lovelace",
        email: "ada@test.com",
      });
    });

    it("atualiza usuario", async () => {
      mockUserRepository.getUserById.mockResolvedValue({
        id: "user-id",
        first_name: "Ada",
        last_name: "Lovelace",
        email: "ada@test.com",
        password: "hash",
      });
      mockUserRepository.updateUser.mockResolvedValue({
        id: "user-id",
        first_name: "Grace",
        last_name: "Hopper",
        email: "grace@test.com",
        password: "hash",
      });

      const { response, body } = await request("/users/user-id", {
        method: "PUT",
        body: JSON.stringify({
          first_name: "Grace",
          last_name: "Hopper",
          email: "grace@test.com",
        }),
      });

      expect(response.status).toBe(200);
      expect(body).toEqual({
        first_name: "Grace",
        last_name: "Hopper",
        email: "grace@test.com",
      });
    });

    it("remove usuario", async () => {
      mockUserRepository.getUserById.mockResolvedValue({
        id: "user-id",
        email: "ada@test.com",
      });
      mockUserRepository.deleteUser.mockResolvedValue(undefined);

      const { response } = await request("/users/user-id", {
        method: "DELETE",
      });

      expect(response.status).toBe(200);
      expect(mockUserRepository.deleteUser).toHaveBeenCalledWith("user-id");
    });
  });

  describe("auth", () => {
    it("faz login e retorna token", async () => {
      const password = "12345678";
      const hash = await bcrypt.hash(password, 10);
      mockAuthRepository.login.mockResolvedValue({
        id: "user-id",
        email: "ada@test.com",
        password: hash,
      });

      const { response, body } = await request("/login", {
        method: "POST",
        body: JSON.stringify({
          email: "ADA@TEST.COM",
          password,
        }),
      });

      expect(response.status).toBe(200);
      expect(body.user).toEqual({
        id: "user-id",
        email: "ada@test.com",
      });
      expect(body.token).toEqual(expect.any(String));
      expect(mockAuthRepository.login).toHaveBeenCalledWith("ada@test.com");
    });

    it("retorna 401 para login invalido", async () => {
      mockAuthRepository.login.mockResolvedValue(undefined);

      const { response, body } = await request("/login", {
        method: "POST",
        body: JSON.stringify({
          email: "ada@test.com",
          password: "senha-errada",
        }),
      });

      expect(response.status).toBe(401);
      expect(body).toEqual({
        error: "email ou senha incorretos  ",
      });
    });

    it("gera novo token com refresh token válido", async () => {
      const refreshToken = "valid-refresh-token";
      
      const { response, body } = await request("/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });

      expect(response.status).toBe(200);
      expect(body.token).toEqual(expect.any(String));
    });

    it("retorna 400 quando refresh token não fornecido", async () => {
      const { response, body } = await request("/refresh", {
        method: "POST",
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(400);
      expect(body.error).toBe("Refresh token não fornecido");
    });
  });

  describe("transactions", () => {
    it("cria transacao quando tem authorization", async () => {
      const transaction = {
        id: "transaction-id",
        userId: "user-id",
        amount: 100,
        name: "Salario",
        data: "2026-05-24",
        type: "income",
      };
      mockTransactionRepository.createTransaction.mockResolvedValue(transaction);

      const { response, body } = await request("/transactions", {
        method: "POST",
        headers: { Authorization: "Bearer token" },
        body: JSON.stringify(transaction),
      });

      expect(response.status).toBe(200);
      expect(body).toEqual(transaction);
    });

    it("bloqueia transacao sem authorization", async () => {
      const { response, body } = await request("/transactions", {
        method: "POST",
        body: JSON.stringify({ amount: 100 }),
      });

      expect(response.status).toBe(401);
      expect(body).toEqual({
        message: "precisa estar logado para acessar fazer transação",
      });
    });

    it("busca transacao por id", async () => {
      mockTransactionRepository.getTransactionById.mockResolvedValue({
        id: "transaction-id",
        amount: 100,
      });

      const { response, body } = await request("/transactions/transaction-id", {
        headers: { Authorization: "Bearer token" },
      });

      expect(response.status).toBe(200);
      expect(body).toEqual({
        id: "transaction-id",
        amount: 100,
      });
    });

    it("atualiza transacao", async () => {
      mockTransactionRepository.getTransactionById.mockResolvedValue({
        id: "transaction-id",
        amount: 100,
        name: "Salario",
        data: "2026-05-24",
        type: "income",
      });
      mockTransactionRepository.updateTransaction.mockResolvedValue({
        id: "transaction-id",
        amount: 200,
      });

      const { response, body } = await request("/transactions/transaction-id", {
        method: "PUT",
        headers: { Authorization: "Bearer token" },
        body: JSON.stringify({ amount: 200 }),
      });

      expect(response.status).toBe(200);
      expect(body.amount).toBe(200);
      expect(mockTransactionRepository.updateTransaction).toHaveBeenCalled();
    });

    it("remove transacao", async () => {
      mockTransactionRepository.getTransactionById.mockResolvedValue({
        id: "transaction-id",
        amount: 100,
      });
      mockTransactionRepository.deleteTransaction.mockResolvedValue({
        id: "transaction-id",
      });

      const { response, body } = await request("/transactions/transaction-id", {
        method: "DELETE",
        headers: { Authorization: "Bearer token" },
      });

      expect(response.status).toBe(200);
      expect(body).toEqual({
        id: "transaction-id",
        amount: 100,
      });
    });
  });
});
