export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Finance App API",
    version: "1.0.0",
    description: "Documentacao da API do Finance App.",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Servidor local",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Autenticacao de usuarios",
    },
    {
      name: "Users",
      description: "Gerenciamento de usuarios",
    },
    {
      name: "Transactions",
      description: "Gerenciamento de transacoes financeiras",
    },
  ],
  paths: {
    "/login": {
      post: {
        tags: ["Auth"],
        summary: "Faz login do usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          400: {
            description: "Email ou senha nao informado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          401: {
            description: "Credenciais invalidas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/users": {
      post: {
        tags: ["Users"],
        summary: "Cria um usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateUserRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuario criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          400: {
            description: "Erro de validacao",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },
          409: {
            description: "Email ja cadastrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Users"],
        summary: "Lista usuarios",
        responses: {
          200: {
            description: "Lista de usuarios",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Busca usuario por ID",
        parameters: [
          {
            $ref: "#/components/parameters/IdParam",
          },
        ],
        responses: {
          200: {
            description: "Usuario encontrado",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  oneOf: [
                    {
                      $ref: "#/components/schemas/User",
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Erro ao buscar usuario",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Atualiza usuario",
        parameters: [
          {
            $ref: "#/components/parameters/IdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateUserRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuario atualizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          400: {
            description: "Erro ao atualizar usuario",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Remove usuario",
        parameters: [
          {
            $ref: "#/components/parameters/IdParam",
          },
        ],
        responses: {
          200: {
            description: "Usuario removido com sucesso",
          },
          400: {
            description: "Erro ao remover usuario",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/transactions": {
      post: {
        tags: ["Transactions"],
        summary: "Cria uma transacao",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTransactionRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Transacao criada com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transaction",
                },
              },
            },
          },
          401: {
            description: "Usuario nao autenticado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
    },
    "/transactions/{id}": {
      get: {
        tags: ["Transactions"],
        summary: "Busca transacao por ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/IdParam",
          },
        ],
        responses: {
          200: {
            description: "Transacao encontrada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transaction",
                },
              },
            },
          },
          401: {
            description: "Usuario nao autenticado ou erro na transacao",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Transactions"],
        summary: "Atualiza transacao",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/IdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTransactionRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Transacao atualizada com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transaction",
                },
              },
            },
          },
          401: {
            description: "Usuario nao autenticado ou erro na transacao",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Transactions"],
        summary: "Remove transacao",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/IdParam",
          },
        ],
        responses: {
          200: {
            description: "Transacao removida com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Transaction",
                },
              },
            },
          },
          401: {
            description: "Usuario nao autenticado ou erro na transacao",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    parameters: {
      IdParam: {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    },
    schemas: {
      CreateUserRequest: {
        type: "object",
        required: ["first_name", "last_name", "email", "password"],
        properties: {
          first_name: {
            type: "string",
            example: "Maria",
          },
          last_name: {
            type: "string",
            example: "Silva",
          },
          email: {
            type: "string",
            format: "email",
            example: "maria@email.com",
          },
          password: {
            type: "string",
            format: "password",
            minLength: 8,
            example: "senha1234",
          },
        },
      },
      UpdateUserRequest: {
        type: "object",
        properties: {
          first_name: {
            type: "string",
            example: "Maria",
          },
          last_name: {
            type: "string",
            example: "Souza",
          },
          email: {
            type: "string",
            format: "email",
            example: "maria.souza@email.com",
          },
          password: {
            type: "string",
            format: "password",
            minLength: 8,
            example: "novaSenha123",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },
          first_name: {
            type: "string",
          },
          last_name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "maria@email.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "senha1234",
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          user: {
            $ref: "#/components/schemas/User",
          },
          token: {
            type: "string",
            description: "Token JWT valido por 1 hora.",
          },
        },
      },
      CreateTransactionRequest: {
        type: "object",
        required: ["userId", "amount", "name", "data", "type"],
        properties: {
          userId: {
            type: "string",
            format: "uuid",
          },
          amount: {
            type: "number",
            format: "decimal",
            example: 150.75,
          },
          name: {
            type: "string",
            example: "Salario",
          },
          data: {
            type: "string",
            format: "date",
            example: "2026-06-02",
          },
          type: {
            type: "string",
            enum: ["earning", "expense", "investment", "EARNING", "EXPENSE", "INVESTMENT"],
            example: "earning",
          },
        },
      },
      UpdateTransactionRequest: {
        type: "object",
        properties: {
          amount: {
            type: "number",
            format: "decimal",
            example: 89.9,
          },
          name: {
            type: "string",
            example: "Mercado",
          },
          data: {
            type: "string",
            format: "date",
            example: "2026-06-02",
          },
          type: {
            type: "string",
            enum: ["earning", "expense", "investment", "EARNING", "EXPENSE", "INVESTMENT"],
            example: "expense",
          },
        },
      },
      Transaction: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },
          user_id: {
            type: "string",
            format: "uuid",
          },
          amount: {
            type: "number",
            format: "decimal",
          },
          name: {
            type: "string",
          },
          data: {
            type: "string",
            format: "date",
          },
          transiction_type: {
            type: "string",
            enum: ["earning", "expense", "investment", "EARNING", "EXPENSE", "INVESTMENT"],
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
          },
        },
      },
      MessageError: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      ValidationError: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro de validacao",
          },
          errors: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
      },
    },
  },
};
