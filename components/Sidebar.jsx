import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useMenu, useCatalog } from "./contextMenu";
import { CollapsIcon, LogoIcon } from "./icons";

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { menus } = useMenu();
  const { setCatalogName } = useCatalog();

  useEffect(() => {
    if (menus && Object.values(menus).length > 0) {
      setOpenSubmenu(Object.values(menus)[0].id);
    }
  }, [menus]);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const handleSubmenuClick = (submenuId) => {
    setOpenSubmenu((prevSubmenuId) => (prevSubmenuId === submenuId ? null : submenuId));
    setCatalogName(submenuId);
  };

  const handleMenuItemClick = (menuId) => {
    if (openSubmenu === menuId) {
      setOpenSubmenu(null); // Close the submenu only if it's already open
    } else {
      setOpenSubmenu(menuId);
    }
  };

  return (
    <div
      className={classNames("h-screen px-4 pt-8 pb-4 bg-light flex flex-col", {
        "w-80": !toggleCollapse,
        "w-20": toggleCollapse,
      })}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative logo-container">
          <div className="flex items-center pl-1 gap-4">
            <img src="/static/img/Anansi_Favicon.png" alt="Logo" className="w-8 h-8" />
            <span className={classNames("mt-2 text-lg font-medium text-text", { hidden: toggleCollapse })}>
              Dashboard
            </span>
          </div>
          <button className={classNames("p-4 rounded bg-light-lighter", { "rotate-180": toggleCollapse })} onClick={handleSidebarToggle}>
            <CollapsIcon fill="#6C7281" />
          </button>
        </div>
        <div className="flex flex-col items-start mt-4">
          {menus &&
            Object.values(menus).map((menu) => (
              <div key={menu.id} className="relative">
                <div
                  className={classNames("flex flex-col py-4 px-3 items-start w-full cursor-pointer", {
                    "bg-light-bluer": openSubmenu === menu.id,
                  })}
                  onClick={() => {
                    handleMenuItemClick(menu.id);
                  }}
                >
                  <span className={classNames("text-md font-medium text-text-light", { "ml-2": !toggleCollapse })}>
                    {menu.label}
                  </span>
                  {openSubmenu === menu.id && (
                    <div className="ml-2">
                      {menu.submenus.map((submenu) => (
                        <Link key={submenu.id} href={submenu.link}>
                          <a
                            className="block py-2 px-3 text-md font-medium text-text-light hover:bg-light-bluer"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event from propagating to parent elements
                            }}
                          >
                            {submenu.label}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
