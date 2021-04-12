### HTTP Integration ###


This node application receives data from a chirpstack server via HTTP requests. The data is then inserted into a local influx database.

The code is not very efficient and could be a lot shorter (I think its possible to get away with only one influx instance for all measurements, also the if-statements are not very clean).

The decoding part is an example from Adafruit (https://learn.adafruit.com/the-things-network-for-feather/payload-decoding) and not relevant for most applications.

The application also logs some server data to an Influxdb measurement everytime it gets an HTTP-request.
