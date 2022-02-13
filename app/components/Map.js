import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import AdminMarker from './AminMarker';

const LOCATION_TASK = 'LOCATION_TASK';
let foregroundSubscription = null;

export default function Map() {
  const [position, setPosition] = useState({
    latitude: 40.7128,
    latitudeDelta: 0.01,
    longitude: 74.006,
    longitudeDelta: 0.01,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  // Define the background task for location tracking
  TaskManager.defineTask(LOCATION_TASK, ({ data, error }) => {
    if (error) {
      return console.error(error);
    }
    if (data) {
      const { locations } = data;
      const location = locations[0];
      if (location) {
        console.log('Location in background');
        const { latitude, longitude } = location.coords;
        setPosition((prevPosition) => {
          return { ...prevPosition, latitude, longitude };
        });
      }
    }
  });

  // Request permissions right after starting the app
  const requestPermissions = async () => {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted) await Location.requestBackgroundPermissionsAsync();
  };

  // Start location tracking in foreground
  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log('Location tracking denied');
      return;
    }

    foregroundSubscription = null;

    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition((prevPosition) => {
          return { ...prevPosition, latitude, longitude };
        });
      }
    );
  };

  // Stop location tracking in foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription = null;
  };

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      console.log('Location tracking denied');
      return;
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = TaskManager.isTaskDefined(LOCATION_TASK);
    if (!isTaskDefined) {
      console.log('Task is not defined');
      return;
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK
    );
    if (hasStarted) {
      console.log('Background location tracking has already started');
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK, {
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
    });
  };

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK);
      console.log('Location tracking stopped');
    }
  };

  useEffect(() => {
    requestPermissions();
    startForegroundUpdate();
    startBackgroundUpdate();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={position}>
        <AdminMarker position={position} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
