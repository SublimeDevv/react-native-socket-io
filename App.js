import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import io from "socket.io-client";

const App = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const socket = io("http://192.168.1.7:3000");

    socket.on("updateData", (updatedData) => {
      setSensorData(updatedData);
    });

    socket.emit("getData");

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {sensorData.map((sensor) => (
        <View key={sensor.id} style={styles.sensorItem}>
          <Text style={styles.sensorText}>Sensor ID: {sensor.sensorId}</Text>
          <Text style={styles.sensorText}>
            Estado: {sensor.isOccupied ? "Ocupado" : "Libre"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  sensorItem: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 3,
  },
  sensorText: {
    fontSize: 16,
  },
});

export default App;
