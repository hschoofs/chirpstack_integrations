Node.js Chirpstack MQTT-Integration Example Code


Basic Node.js application to receive data from a Chirpstack Server through MQTTS. If your TLS certificates are not stored in the same directory as the node application, you can also provide a path to them when creating the client object.


Also the subscription topic has to be changed according to your application. You can also choose the devices and events you want to subscribe to (https://www.chirpstack.io/application-server/integrations/mqtt/).


The decoding part is an example from adafruit (https://learn.adafruit.com/the-things-network-for-feather/payload-decoding) and not relevant for most applications.


If you want to insert the data into an influx database, you can take a look at the code from the HTTP-Integration example, since you end up with the same JSON object in both examples.
