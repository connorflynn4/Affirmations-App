"use client";

import React from "react";
import SideMenu from "../components/SideMenu";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
