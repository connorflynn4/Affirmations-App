"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { name: "Affirmations", path: "/affirmations" },
  { name: "Favorite Affirmations", path: "/favorites" },
  { name: "Meditation Videos", path: "/meditations" },
];

const SideMenu: React.FC = () => {
  const pathname = usePathname(); // Correct way to get the current path
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false);
    setUserName(null);
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      {/* Title Section */}
      <Link href="/">
        <div className="p-6 text-lg font-bold cursor-pointer hover:text-gray-300">
          Mindfullness Hub
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="mt-4 flex-grow">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`block px-6 py-3 ${
                pathname === item.path
                  ? "bg-gray-700 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700">
        {isLoggedIn ? (
          <>
            
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-sm mb-4">Not signed in</p>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
