# Authentication - GENERATE JWT TOKENs
- Lets start by creating our assignment for today
- A website which has 2 endpoints -

### POST 'signin
- Body - {
    username:string,
    password:string
    }  
- Returns a json web token with username encrypted
### GET /users
- Headers  
    - Authorization header
- Returns an array of all users if user is signed in (token is correct)  
- Returns 403 status code if not  
