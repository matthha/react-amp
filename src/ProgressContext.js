import React, { createContext, useState, useContext } from 'react';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [completedModules, setCompletedModules] = useState([]);

  const updateCompletedModules = (newModules) => {
    setCompletedModules(newModules);
  };

  return (
    <ProgressContext.Provider value={{ completedModules, updateCompletedModules }}>
      {children}
    </ProgressContext.Provider>
  );
};
