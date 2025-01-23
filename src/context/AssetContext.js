import { createContext, useState } from "react";

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assetData, setAssetData] = useState({});
  const [energySensorFilter, setEnergySensorFilter] = useState(false);
  const [sensorStatusFilter, setSensorStatusFilter] = useState(false);

  return (
    <AssetContext.Provider
      value={{
        assetData,
        setAssetData,
        energySensorFilter,
        setEnergySensorFilter,
        sensorStatusFilter,
        setSensorStatusFilter,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};
