# Finance App API

API para gerenciamento de usuarios, autenticacao e transacoes financeiras.

## Documentacao Swagger

Com o servidor em execucao, acesse:

```text
http://localhost:8080/api-docs/
```

O arquivo OpenAPI em JSON tambem esta disponivel em:

```text
http://localhost:8080/api-docs.json
```

## Como executar

Instale as dependencias:

```bash
npm install
```

Execute as migrations do banco:

```bash
npm run migrate
```

Inicie a API:

```bash
npm start
```

Por padrao, o projeto usa a porta definida no arquivo `.env`. Atualmente a documentacao aponta para:

```text
http://localhost:8080
```

## Endpoints documentados

### Auth

| Metodo | Rota | Descricao |
| --- | --- | --- |
| POST | `/login` | Faz login do usuario e retorna um token JWT |

### Users

| Metodo | Rota | Descricao |
| --- | --- | --- |
| POST | `/users` | Cria um usuario |
| GET | `/users` | Lista usuarios |
| GET | `/users/{id}` | Busca usuario por ID |
| PUT | `/users/{id}` | Atualiza usuario |
| DELETE | `/users/{id}` | Remove usuario |

### Transactions

As rotas de transacoes exigem token JWT no header `Authorization`.

```text
Authorization: Bearer <token>
```

| Metodo | Rota | Descricao |
| --- | --- | --- |
| POST | `/transactions` | Cria uma transacao |
| GET | `/transactions/{id}` | Busca transacao por ID |
| PUT | `/transactions/{id}` | Atualiza transacao |
| DELETE | `/transactions/{id}` | Remove transacao |

## Testes

Execute:

```bash
npm test
```
