import { jest } from "@jest/globals";
import { AuthController } from "./authController.js";

const makeResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("AuthController", () => {
  describe("login", () => {
    it("retorna 400 quando email nao e informado", async () => {
      const controller = new AuthController();
      const req = { body: { password: "123456" } };
      const res = makeResponse();
      const next = jest.fn();

      await controller.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "email ou senha não informado",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("retorna 400 quando password nao e informado", async () => {
      const controller = new AuthController();
      const req = { body: { email: "user@test.com" } };
      const res = makeResponse();
      const next = jest.fn();

      await controller.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "email ou senha não informado",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("retorna usuario e token quando login e valido", async () => {
      const controller = new AuthController();
      const authResponse = {
        user: { id: "user-id", email: "user@test.com" },
        token: "jwt-token",
      };
      controller.auth = {
        login: jest.fn().mockResolvedValue(authResponse),
      };
      const req = {
        body: { email: "user@test.com", password: "123456" },
      };
      const res = makeResponse();
      const next = jest.fn();

      await controller.login(req, res, next);

      expect(controller.auth.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(authResponse);
      expect(next).not.toHaveBeenCalled();
    });

    it("encaminha erros do service para o middleware global", async () => {
      const controller = new AuthController();
      const error = { status: 401, body: "email ou senha incorretos" };
      controller.auth = {
        login: jest.fn().mockRejectedValue(error),
      };
      const req = {
        body: { email: "user@test.com", password: "senha-errada" },
      };
      const res = makeResponse();
      const next = jest.fn();

      await controller.login(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
