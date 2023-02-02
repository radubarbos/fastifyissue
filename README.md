# Validation issue on fastify 4.x

## Steps to reproduce:

1) Init
```
npm i
```

2) start
```
npm start
```

3) make a post request with a valid body
```
http://localhost:3000/json

{
    "positions": {
        "TOPAD": {
            "alias": "test",
            "type": "display"
        }
    }
}
```
The request is rejected.

4) Make the same request with fastify 3.x. like 3.29.5. The request is validated.