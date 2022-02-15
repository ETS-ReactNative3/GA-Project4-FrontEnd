import React, { createContext, useContext, useState } from 'react';

const SelectedUserContext = createContext();

export function useSelectedUserContext() {
  return useContext(SelectedUserContext);
}

export default function DataProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <SelectedUserContext.Provider value={[selectedUser, setSelectedUser]}>
      {children}
    </SelectedUserContext.Provider>
  );
}
