"use client";

import React, { useState } from "react";
import SideMenu from "../components/SideMenu";

type Video = {
  title: string;
  url: string;
};

const MeditationsPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      title: "Guided Meditation for Relaxation",
      url: "https://www.youtube.com/embed/8mM5Oks8yZc",
    },
    {
      title: "Mindfulness Meditation for Beginners",
      url: "https://www.youtube.com/embed/_noquwycq78",
    },
  ]);

  const [newVideo, setNewVideo] = useState({ title: "", url: "" });

  const capitalizeTitle = (title: string) => {
    return title
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract the video ID from a standard YouTube URL
    const videoIdMatch = newVideo.url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!newVideo.title.trim() || !videoId) {
      alert("Please enter a valid title and YouTube URL.");
      return;
    }

    // Convert to embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Add the new video to the top of the list
    const capitalizedTitle = capitalizeTitle(newVideo.title);
    setVideos((prev) => [{ title: capitalizedTitle, url: embedUrl }, ...prev]);

    // Reset input fields
    setNewVideo({ title: "", url: "" });
  };

  return (
    <div className="flex h-screen">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold">Meditation Videos</h1>
        <p className="mt-4">Relax with guided meditation videos here!</p>

        {/* Upload Section */}
        <div className="mt-8 mb-8 p-6 bg-gray-100 border rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Add Your Own Video</h2>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Video Title"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="YouTube URL (e.g., https://www.youtube.com/watch?v=video_id)"
                value={newVideo.url}
                onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Video
            </button>
          </form>
        </div>

        {/* Videos Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold mb-2 text-center">{video.title}</h2>
              <iframe
                className="w-full aspect-video rounded-lg shadow-md"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeditationsPage;
