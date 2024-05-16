
import React, { createContext, useState, useContext } from "react";

const MenuContext = createContext();
const CatalogContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState(null);

  return (
    <MenuContext.Provider value={{ menus, setMenus }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);

export const CatalogProvider = ({ children }) => {
  const [catalogName, setCatalogName] = useState("");
  const [nodeName, setNodeName] = useState("");

  return (
    <CatalogContext.Provider value={{ catalogName, setCatalogName, nodeName, setNodeName }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => useContext(CatalogContext);