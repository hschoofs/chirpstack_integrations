## Chirpstack MQTT Node-Red Example ##

1. Insert mqtt in node into your flow. 

2. Go to properties and add a new mqtt broker.  
3.  ![pic01](https://github.com/hschoofs/chirpstack_integrations/blob/main/example_code/mqtt_node_red/pictures/pic_01.png "pic01")

3. Enter the address of your mqtt-broker and change the port to 8883 if you want to use MQTTS.   
4. ![pic02](https://github.com/hschoofs/chirpstack_integrations/blob/main/example_code/mqtt_node_red/pictures/pic_02.png "pic02")

4. Click on "Enable secure (SSL/TLS) connection" and add a new configuration.  
5.  ![pic03](https://github.com/hschoofs/chirpstack_integrations/blob/main/example_code/mqtt_node_red/pictures/pic_03.png "pic03")

6. Upload your certificates and your key in the TLS-Properties window.  
7. ![pic04](https://github.com/hschoofs/chirpstack_integrations/blob/main/example_code/mqtt_node_red/pictures/pic_04.png "pic04")

8. Go back to the Server Properties and insert your username and password after clicking on the Security tab.  
 ![pic05](https://github.com/hschoofs/chirpstack_integrations/blob/main/example_code/mqtt_node_red/pictures/pic_05.png "pic05")

12. After applying your settings, go back to the general Properties of the node and add a Topic according to your application and the data you want to receive.   (https://www.chirpstack.io/application-server/integrations/mqtt/)  
13.  ![pic06](https://github.com/hschoofs/chirpstack_integrations/blob/main/example_code/mqtt_node_red/pictures/pic_06.png "pic06")

14. If everything went well, there should be a little green box under your node saying "connected". 

16. You will get a JSON object from your MQTT node which you can filter with the function node and then save to a database with the Influx node.  
17.  ![pic07](https://github.com/hschoofs/chirpstack_integrations/blob/main/example_code/mqtt_node_red/pictures/pic_07.png "pic07")
