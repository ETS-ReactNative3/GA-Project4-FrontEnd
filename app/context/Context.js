import React, { createContext, useContext, useState } from 'react';

const SelectedUserContext = createContext();
const UserLocationContext = createContext();

export function useSelectedUserContext() {
  return useContext(SelectedUserContext);
}
export function useUserLocationContext() {
  return useContext(UserLocationContext);
}

export default function DataProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [UserLocation, setUserLocation] = useState({
    latitude: 40.7128,
    latitudeDelta: 0.01,
    longitude: 74.006,
    longitudeDelta: 0.01,
  });
  return (
    <SelectedUserContext.Provider value={[selectedUser, setSelectedUser]}>
      <UserLocationContext.Provider value={[UserLocation, setUserLocation]}>
        {children}
      </UserLocationContext.Provider>
    </SelectedUserContext.Provider>
  );
}
