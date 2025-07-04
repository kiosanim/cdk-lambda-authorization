# Authorization Lambda Sample - Using CDK
* **Author:** Fábio Sartori
* 
## Lambdas

* **authorizer.ts:** Sample of lambda authorizer of API Gateway
* **public-status.ts:** Sample of REST Lambda with public Access
* **list-users.ts:** Sample of protected lambda that returns sample users

## Commands

### Bootstrap

```bash
cdk bootstrap
```

---

### Build

```bash
npm run build
```

---

### Deploy

```bash
cdk deploy
```
---

## Sample requests

### Sample of GET request of protected route users using Authorization Token
```bash
# curl -X GET -H 'Authorization: Bearer allow' <API Gateway URI>/prod/users
#Ex:
curl -X GET -H 'Authorization: Bearer allow' https://pnvcyujtid.execute-api.localhost.localstack.cloud:4566/prod/users 
```

### Sample of GET request of a protected route users without Authorization Token
```bash
# curl -X GET <API Gateway URI>/prod/users
#Ex:
curl -X GET https://pnvcyujtid.execute-api.localhost.localstack.cloud:4566/prod/users
```

### GET request of a public route
```bash
# curl -X GET <API Gateway URI>/prod/public
#Ex:
curl -X GET https://pnvcyujtid.execute-api.localhost.localstack.cloud:4566/prod/public
```