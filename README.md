# An API that emulates Google Locations and Distance Matrix API for courier calculating delivery cost

## Instalation

1. Clone repo 
2. Install - `npm install`.
3. Create env file with this -> 
4. Run Mmigration
```bash
adonis migration run
```
4. Run Seeder
 ```js
 adonis make:seed User;
 ```

## Authenticate

1. Login
   Route - /login - email: 'admin@app.com', password: '123456'
   
2. Copy token to use for subsequent requests


## Get Locations

Route - /locations

Response
```js
  "data": [
  {"name":"Ajeromi-Ifelodun","id":1, "zone": 3},
  ...
  ]
```

## Calculate Delivery cost

1. Request
    from: 5,
    to:   12,
    weight: 9
    
2. Response
    ```js
    {
    "price": 3800,
    "message": "Success"
    }
    ```



