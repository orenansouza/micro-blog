# Micro Blog

API para um micro blog.

Nosso projeto irá utilizar o banco de dados postgresql e nodejs.
Para rodar nosso banco de dados postgresql iremos utilizar o docker com docker-compose.

**Instalação**

Instalação do docker conforme seu sistema operacional: https://docs.docker.com/engine/install/.

Instalação do docker-compose conforme seu sistema operacional: https://docs.docker.com/compose/install/

Para finalizar a instalação da API clone o projeto no link a seguir: `git clone [https://github.com/orenansouza/micro-blog.git](https://github.com/orenansouza/micro-blog-api.git)`.

**Iniciando o banco de dados**

Vá a raiz do seu projeto inicie o banco de dados com o comando `docker-compose up`.

**Iniciando tabelas do banco de dados**
Vá a raiz do seu projeto e rode o comando `npx sequelize-cli db:migrate`

**Iniciando o projeto**

Vá a raiz do seu projeto inicie a API com o comando `yarn start` ou `npm run start` conforme preferir.
Caso queira debugar inicie a API com o comando `yarn dev` ou `npm run dev` conforme preferir.

### POST `http://localhost:3333/user/`

- Payload:

```json
  "name": "username",
  "email": "email@email.com",
  "passowrd": "password"
}
```

Este método irá criar um usuário no banco de dados e caso sucesso deve retornar:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "username",
    "email": "email@email.com",
    "updatedAt": "2020-09-11T03:58:04.137Z",
    "createdAt": "2020-09-11T03:58:04.137Z"
  }
}
```

### POST `http://localhost:3333/user/login`

- Payload:

```json
  "email": "email@email.com",
  "passowrd": "password"
}
```

Este método irá realizar login e caso sucesso deve retornar:

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "Token de authenticação"
}
```

### POST `http://localhost:3333/post`

- Payload:

```json
  "text": "Texto da publicação"
}
```

Este método irá criar uma publicação e caso sucesso deve retornar:

```json
{
  "success": true,
  "post": {
    "id": "Id da publicação",
    "text": "Texto da publicação",
    "user_id": "Usuário que está publicando",
    "updatedAt": "2021-01-24T02:17:30.306Z",
    "createdAt": "2021-01-24T02:17:30.306Z"
  }
}
```

### POST `http://localhost:3333/comment`

- Payload:

```json
  "text": "Texto do comentário",
  "post_id": "ID da publicação a qual está sendo comentado"
}
```

Este método irá criar um comentário e caso sucesso deve retornar:

```json
{
  "success": true,
  "post": {
    "id": "ID do comentário",
    "text": "Texto do comentário",
    "user_id": "Usuário que está publicando",
    "updatedAt": "2021-01-24T02:17:30.306Z",
    "createdAt": "2021-01-24T02:17:30.306Z"
  }
}
```

### GET `http://localhost:3333/posts`

Este método irá retornar as publicações:

```json
{
  "success": true,
  "pagination": {
    "totalItems": 1,
    "totalPages": 1,
    "currentPage": 1
  },
  "content": [
    {
      "id": "ID da publicação",
      "text": "Texto da publicação",
      "user_id": "Usuário que está publicando",
      "createdAt": "2021-01-23T01:33:23.172Z",
      "updatedAt": "2021-01-23T01:33:23.172Z",
      "comments": {
        "count": 2,
        "rows": [
          {
            "id": "ID do comentário",
            "text": "Texto do comentário",
            "user_id": "Usuário que está publicando",
            "post_id": "ID da publicação a qual está sendo comentado",
            "createdAt": "2021-01-24T02:25:24.413Z",
            "updatedAt": "2021-01-24T02:25:24.413Z"
          }
        ]
      }
    }
  ]
}
```

