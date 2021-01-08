# Envision Website

Envision Overseas is an education consulting company based in India.

The website is mobile-friendly, and runs an application allowing consultants to manage the data of their clients. Node, Express and MongoDB make up the backend for this application, which uses JWT for session-caching.

### API

#### Data
Let's assume $5ee2e$ is a client object id in the database.

1. Get All Records
http://localhost:3000/api/data/

2. Get One Record
http://localhost:3000/api/data/5ee2e

3. Update One Record
http://localhost:3000/api/data/5ee2e

4. Delete One Record
http://localhost:3000/api/data/5ee2e

5. Manually Adding a Client Object (without them self-registering)
http://localhost:3000/api/data/add

###### JSON Object Format for Requests 3 & 5.

{
    "name": "",
    "email": "",
    "mobile": "",
    "nearest_office": "",
    "destination": "",
    "intake": ""
}

#### Clients

6. Self-registration ('password' field optional, gets hashed with )
http://localhost:3000/students/add

7. Self-registration with Password



## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install this project.

```bash
npm install envis
```

## Viewing

```bash
npm run-script envis
```
