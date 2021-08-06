# OLB Workflow Notes

## Auth and Init

1. OLB-CLIENT -> OLB-API
   - Endpoint: /api/booking/{office}/{currency}/{voyageID}?offerCode=
   - Request
     - URL Params
       - office - string
       - currency - string
       - voyageID - string
     - Query Strings
       - offerCode - string
     - Body
   ```json
   {
     "achDetails": {
       "acctNumber": "string",
       "acctType": "string",
       "address": "string",
       "city": "string",
       "country": "string",
       "email": "string",
       "firstName": "string",
       "lastName": "string",
       "routingNumber": "string",
       "state": "string",
       "token": "string",
       "totalCharges": 0,
       "zip": "string"
     },
     "browserDetails": {
       "acceptHeader": "string",
       "colorDepth": "string",
       "ip": "string",
       "javaEnabled": "string",
       "javaScriptEnabled": "string",
       "language": "string",
       "screenHeight": "string",
       "screenWidth": "string",
       "timeZone": "string",
       "userAgent": "string"
     },
     "creditCardDetails": {
       "address": "string",
       "city": "string",
       "country": "string",
       "creditCardExpires": "string",
       "creditCardName": "string",
       "creditCardType": "string",
       "email": "string",
       "firstName": "string",
       "lastName": "string",
       "state": "string",
       "token": "string",
       "totalCharges": "string",
       "zip": "string"
     },
     "merchantURL": "string",
     "notificationURL": "string"
   }
   ```
2. OLB-API -> CORE (See 7 for response)

   - Endpoint: [Swagger](https://s3.amazonaws.com/vrc-core-viking-swagger-dev/index.html?url=core.dev.ninerealms.tech.yaml#/Passengers/post_passengers__office___currency__payment__bookingId___voyageId___stateroomNumber_)
   - Request

   ```json
   {
     "achDetails": {
       "acctNumber": "string",
       "acctType": "string",
       "address": "string",
       "city": "string",
       "country": "string",
       "email": "string",
       "firstName": "string",
       "lastName": "string",
       "routingNumber": "string",
       "state": "string",
       "token": "string",
       "totalCharges": 0,
       "zip": "string"
     },
     "browserDetails": {
       "acceptHeader": "string",
       "colorDepth": "string",
       "ip": "string",
       "javaEnabled": "string",
       "javaScriptEnabled": "string",
       "language": "string",
       "screenHeight": "string",
       "screenWidth": "string",
       "timeZone": "string",
       "userAgent": "string"
     },
     "creditCardDetails": {
       "address": "string",
       "city": "string",
       "country": "string",
       "creditCardExpires": "string",
       "creditCardName": "string",
       "creditCardType": "string",
       "email": "string",
       "firstName": "string",
       "lastName": "string",
       "state": "string",
       "token": "string",
       "totalCharges": "string",
       "zip": "string"
     },
     "isLock": true,
     "updateUserInfo": {
       "email": "string",
       "firstName": "string",
       "lastName": "string",
       "updateUserType": "string"
     },
     "merchantURL": "string",
     "notificationURL": "string",
     "sessionID": "string"
   }
   ```

3. CORE -> EVO
   - Details by CORE and EVO Teams
4. EVO -> NEUVEI /getSession
   - [Documentation](https://www.safecharge.com/docs/API/main/indexMain_v1_0.html?json#getSessionToken)
5. EVO -> NEUVEI /initPayment
   - [Documentation](https://www.safecharge.com/docs/API/main/indexMain_v1_0.html?json#initPayment)
6. EVO -> CORE
   - Details by CORE and EVO Teams
7. CORE -> OLB-API (See 2 for request)
   - Endpoint: [Swagger](https://s3.amazonaws.com/vrc-core-viking-swagger-dev/index.html?url=core.dev.ninerealms.tech.yaml#/Passengers/post_passengers__office___currency__payment__bookingId___voyageId___stateroomNumber_)
   - Response

```json
{
  "bookingId": "string",
  "challengeUrl": "string",
  "lookupId": "string",
  "stateRoomNumber": "string",
  "status": true,
  "totalCharges": "string",
  "voyageId": "string"
}
```

8. OLB-API -> OLB-CLIENT

---

## Fingerprinting

9. OLB-CLIENT -> ISSUER
10. ISSUER -> OLB-CLIENT

---

## Payment Request

11. OLB-CLIENT -> OLB-API

- Endpoint: /api/booking/{office}/{currency}/{voyageID}?offerCode=
- Request
  - URL Params
    - office - string
    - currency - string
    - voyageID - string
  - Query Strings
    - offerCode - string
  - Body

```json
{
  "lookupId": "string"
}
```

12. OLB-API -> CORE

- Endpoint: [Swagger](https://s3.amazonaws.com/vrc-core-viking-swagger-dev/index.html?url=core.dev.ninerealms.tech.yaml#/Passengers/post_passengers__office___currency__payment__bookingId___voyageId___stateroomNumber_)
- Request

```json
{
  "lookupId": "string"
}
```

13. CORE -> EVO

- TBD - Details by CORE and EVO Teams

14. EVO -> NEUVEI /payment

- [Documentation](https://www.safecharge.com/docs/API/main/indexMain_v1_0.html?json#payment)

15. NEUVEI -> ISSUER
16. ISSUER -> NEUVEI
17. NEUVEI -> EVO
18. EVO -> CORE

- Details by CORE and EVO Teams

19. CORE -> OLB-API
20. OLB-API -> OLB-CLIENT

---

## Challenge

21. OLB-CLIENT -> ISSUER
22. ISSUER-OLB -> OLB-CLIENT

---

## Final Payment

23. OLB-CLIENT -> OLB-API

- Endpoint: /api/booking/{office}/{currency}/{voyageID}?offerCode=
- Request
  - URL Params
    - office - string
    - currency - string
    - voyageID - string
  - Query Strings
    - offerCode - string
  - Body

```json
{
  "lookupId": "string"
}
```

24. OLB-API -> CORE

- Endpoint: [Swagger](https://s3.amazonaws.com/vrc-core-viking-swagger-dev/index.html?url=core.dev.ninerealms.tech.yaml#/Passengers/post_passengers__office___currency__payment__bookingId___voyageId___stateroomNumber_)
- Request

```json
{
  "lookupId": "string"
}
```

25. CORE -> EVO

- Details by CORE and EVO Teams

26. EVO -> NEUVEI

- [Documentation](https://www.safecharge.com/docs/API/main/indexMain_v1_0.html?json#payment)

27. NEUVEI -> EVO
28. EVO -> CORE
29. CORE -> OLB-API
30. OLB-API -> OLB-CLIENT
