HTTP Integration


This node application receives data via HTTP requests from a chirpstack server. The data is then inserted into a local influx database. The code is not very efficient and could be a lot shorter (I think its possible to get away with one influx instance for all measurements, also the if statements are not very clean). 