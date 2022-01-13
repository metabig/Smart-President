# API Documentation

# Objects

| User | Building | Contract |
| --- | --- | --- |
| _id | _id | _id |
| name | name | name |
|  | contracts[] | creator |
|  | members[] | created_at |
|  | creator | votes[] |

# Functions

## Create a building

```bash
POST /api/buildings/create HTTP/1.1
Host: smart-president.herokuapp.com
x-access-token:  <token>
Content-Type: application/json

{
    "name":"Building Name"
}
```

## Join a building (The user that provides the token)

```bash
GET /api/buildings/join/:id HTTP/1.1
Host: smart-president.herokuapp.com
x-access-token: <token>
Content-Type: application/json
```

## Get all buildings

```bash
GET /api/buildings/ HTTP/1.1
Host: smart-president.herokuapp.com
x-access-token: <token>
Content-Type: application/json
```

## Create contract (In a building)

```bash
POST /api/buildings/:building_id/create_contract HTTP/1.1
Host: smart-president.herokuapp.com
x-access-token: <token>
Content-Type: application/json
{
	"name": "Contract name"
}
```

## Vote contract (By the user that provides the token)

```bash
POST /api/buildings/vote/61aceb7c309f7e1b2a3bacbb HTTP/1.1
Host: smart-president.herokuapp.com
x-access-token: <token>
Content-Type: application/json
```

## Get all contracts

```bash
GET /api/buildings/contracts HTTP/1.1
Host: smart-president.herokuapp.com
x-access-token: <token>
Content-Type: application/json
```