# auth-api

## Author: areenjaradat

### Links and Resources

- [ci/cd](https://github.com/areenjaradat/OAuth/actions) (GitHub Actions)

- [Repo link](https://github.com/areenjaradat/OAuth)

- [PR link](https://github.com/areenjaradat/OAuth/pulls)

- [herokuapp](https://areen-oauth.herokuapp.com)

### Setup

#### `.env` requirements

#### `express` requirements

#### `mongoose` requirements

#### `@code-fellows/supergoose` requirements

#### `base-64 bcrypt`

#### `jsonwebtoken`

#### How to initialize/run your application (where applicable)

- `node server.js`

#### Tests

- How do you run tests?
   `npm test`

.env file

```PORT=3000
SECRET=secret
MONGODB_URI=mongodb+srv://admin:admin@api-server.wt1ri.mongodb.net/oauth
let CLIENT_ID = process.env.CLIENT_ID || '968394370633263';
let CLIENT_SECRET = process.env.CLIENT_SECRET || 'f45b61bf5d51f2f43fdc62d54aa97b7e';
redirect_uri:'http://localhost:3000/oauth'
redirect_uri:'https://areen-oauth.herokuapp.com/oauth'
```

Facebook Test Account :
 email: eaaosgimuz_1621441942@tfbnw.net
 Password: Admin1234

#### UML

![uml](assest/uml7.png)

![uml](assest/uml8.png)

![uml](assest/oauth.png)

![uml](assest/wrrc8.png)
