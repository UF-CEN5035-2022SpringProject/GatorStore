# GatorLive Project Introductions and Rules
---
## Project Members
Canvas Group Link - https://ufl.instructure.com/groups/419331/users   
[Yi-Ming Chang](yimingchang@ufl.edu)  
[Hung-You Chou](hchou@ufl.edu)  
[Vivaan Goomer](vivaangoomer@ufl.edu)  
[Sebastian Llerena](llerenabarruetos@ufl.edu)  

## Introduction
For course CEN5035, our group are building a AmazonLive Clone.
We are using Golang in backend programming and ReactJS in frontend programming.
The purpose is to combine live streaming functions to sell products in users’ online stores. 
We hope to provide users not only a platform to sell their products but also with our features that can help them sell stuff with high efficiency.

Reference: https://www.nngroup.com/articles/livestream-ecommerce-china/
---

## Learnings:
Golang:
Down below are few reference to learn Golang in the first step.

https://go.dev/tour/  
https://go.dev/doc/effective_go  
https://www.youtube.com/watch?v=YS4e4q9oBaU 
 
---

## Github Rules
actions:
- feature
- test
- demo

Backend branch naming
```
spr{#number}-backend-{actions}/{action-name}
```

Seller frontend naming
```
spr{#number}-sfrontend-{actions}/{action-name}
```

Buyer frontend naming
```
spr{#number}-bfrontend-{actions}/{action-name}
```

For example:
spr1-backend-feature/routing

---

## Testing Proccess
1. Self Testing
2. PR into test branch (according to feature into backend-test, seller-frontend-test, buyer-frontend-test)
3. PR into main branch 


---

# Backend
Golang and backend set up please check [backendend-readme.md](https://github.com/UF-CEN5035-2022SpringProject/GatorStore/blob/main/backend/backend-readme.md)

## API Document 
**BACKEND API:** 
```http://localhost:8080/{actionPath}```

### User

- Store
- Product


## Ojbect Document
Object Table Columns 

| Name | Description |
| ---  | --- | 
| Var/Method | Showing this attibute is a variable or method |
| Key | If it is 'V' than it's a primary key, if with R means it's related with others to combine into primary key |
| Type | variable type or method return type |
| Description | descibe the attribute purpose |


### User 
If user has already register, an **uniqueId** will be assigned to user.  
Or else we'll use **email** as a identifier.


| Var/Method | Key | Type | Description |
| ---  | --- | --- | --- |
| `id` | V | string | unique identifier |
| name |   | string | Receive by google api |
| `email` | V | string | unique identifier |
| token | | string | google accesstoken, use for api calling |

JSON Example:
```
{
  'id': "113024",
  'name': "YiMing Chang",
  'email': "yimingchang@ufl.edu",
  'token': "abcdtest12345"
}
```

###
