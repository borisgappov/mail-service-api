# NestJS Home Assignment - Mail service API

To run please use the command
```
docker-compose up --build -V
```
For testing, you can use Swagger UI http://localhost:3000/swagger

The Rabbit MQ control panel will be available at http://localhost:15672/
username and password 'guest'

An additional 'status' method was added to API as a demonstration of the work of the mailer microservice on the TCP protocol. The fact is that the RMQ transport is used to send a message and receive a response and it cannot be replaced by TCP transport.

The gateway works in hybrid mode as HTTP and TCP, and for this, a listner and a handler have also been added there

Unfortunately, Google has made it very difficult to use the messaging service. Now we need to use Oauth2 and create an 'Internal' application to avoid validation, and this is available if the organization created etc. I created an 'External' application and Google notified me that the validation will take place within 4 weeks.

Using the Google OAuth 2.0 Playground, I found the access token and the refresh token but did not find the secret. 

Ultimately I decided not to use Oauth2 and emails are always sent from my test mailbox.