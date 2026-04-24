import React, { createContext, useContext, useState } from 'react';

interface SettingsContextValue {
  ttsEnabled: boolean;
  setTtsEnabled: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  ttsEnabled: true,
  setTtsEnabled: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [ttsEnabled, setTtsEnabled] = useState(true);
  return (
    <SettingsContext.Provider value={{ ttsEnabled, setTtsEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  return useContext(SettingsContext);
}
