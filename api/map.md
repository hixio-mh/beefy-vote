# Snapshot API exploration

## Endpoint
https://balancer-gov.herokuapp.com/api/

## Reference
/api/0xBa37B002AbaFDd8E89a1995dA52740bbC013D992

## Routes

### GET /
Service status

### GET /:token/proposals
List of proposals related to a project

### GET /:token/proposal/:id
Proposal details

### POST /message
Validates input msg format and integrity. Facade to multiple actions
  . Create proposal
  . Vote proposal


