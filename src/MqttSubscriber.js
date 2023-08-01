import React, { useEffect, useState } from "react";
import * as mqtt from "mqtt";
const MqttSubscriber = () => {

  const [data,setData] = useState("data")

 
    // Replace with your MQTT broker's TCP URL and port
    const proxyServerUrl = "your-ip";
    const mqttOptions = {
      host: proxyServerUrl,
      username: 'your-username',
      password: 'your-password',
    };

  //const client = mqtt.connect("tcp://202.134.12.131:15575");

  useEffect(() => {
    
    //Create an MQTT client instance
    const client = mqtt.connect(proxyServerUrl,mqttOptions);
    // Subscribe to the desired topic(s)
    const topic = 'test';
    client.subscribe(topic);

    // Handle incoming messages
    client.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      setData(message.toString());
      // Do whatever you want with the received message here
    });

    // Clean up the MQTT client on unmount
    return () => {
      client.end();
    };

    // client.on("connect", () => {
    //   client.subscribe("presence", (err) => {
    //     if (!err) {
    //       client.publish("presence", "Hello mqtt");
    //     }
    //   });
    // });

    // client.on("message", (topic, message) => {
    //   // message is Buffer
    //   console.log(message.toString());
    //   client.end();
    // });
  }, []);

  return <>
  <div>MQTT Subscriber </div>
  <div> {data} </div>

  </> 
  };

export default MqttSubscriber;
