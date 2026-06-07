import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware.js';

jest.mock('jsonwebtoken', () => ({ verify: jest.fn() }));

describe('middleware de auth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna 401 quando falta Authorization', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não autenticado' });
    expect(next).not.toHaveBeenCalled();
  });

  it('retorna 401 quando token inválido', () => {
    const req = { headers: { authorization: 'Bearer badtoken' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    jwt.verify.mockImplementation(() => { throw new Error('invalid'); });

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('chama next e define req.userId quando token válido', () => {
    const req = { headers: { authorization: 'Bearer token' } };
    const res = {};
    const next = jest.fn();

    jwt.verify.mockReturnValue({ userId: 'user-id' });

    middleware(req, res, next);

    expect(req.userId).toBe('user-id');
    expect(next).toHaveBeenCalled();
  });
});
