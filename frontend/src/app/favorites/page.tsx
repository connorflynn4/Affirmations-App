"use client";

import React from "react";
import SideMenu from "../components/SideMenu";
import useAffirmationsStore from "../stores/useAffirmationsStore";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useAffirmationsStore();

  const clearFavorites = () => {
    // Remove all favorites
    favorites.forEach((fav) => toggleFavorite(fav._id));
  };

  return (
    <div className="flex h-screen">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Favorite Affirmations</h1>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col justify-between p-6 bg-white shadow-md rounded-lg border border-gray-200"
                >
                  <p className="text-gray-800 text-lg italic mb-4">"{item.text}"</p>
                  <div className="flex justify-end">
                    {/* Remove Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(item._id)}
                      className="text-red-500 hover:text-red-600 text-xl font-bold cursor-pointer"
                      aria-label="Remove Favorite"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No favorite affirmations yet.</p>
          )}
        </div>

        {/* Clear All Favorites Button */}
        {favorites.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={clearFavorites}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Clear All Favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
