
# Project Title

Altar.io challange for interview process.


## API Reference (Only post is functional, the rest was not specified in the challange)

#### Get all items

```http
  GET /api/payments
```

#### Get item

```http
  GET /api/payments/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update item

```http
  PUT /api/payments/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Delete item

```http
  DELETE /api/payments/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Run Locally

Clone the project

```bash
  git clone https://github.com/flobbun/altar.io-test
```

Go to the project directory

```bash
  cd altar.io-test
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd server
```

```bash
  npm run dev (Default port is 3000)
```

Start mongoDB

```bash
  mongod (URI specified in .env)
```

Start the client

```bash
  cd client
```

```bash
  ng serve (Default port is 4200)
```

## Authors

- [@flobbun](https://www.github.com/flobbun)

