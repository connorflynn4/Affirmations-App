"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideMenu from "../components/SideMenu";

type Video = {
  _id: string;
  title: string;
  url: string;
};

export default function MeditationsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for token and redirect if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Redirect to home/login page if no token
    }
  }, [router]);

  // Fetch videos from the API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/meditations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const capitalizeTitle = (title: string) => {
    return title
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    const videoIdMatch = newVideo.url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!newVideo.title.trim() || !videoId) {
      alert("Please enter a valid title and YouTube URL.");
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const capitalizedTitle = capitalizeTitle(newVideo.title);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/meditations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: capitalizedTitle, url: embedUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to add video");
      }

      const newVideoFromDB = await response.json();
      setVideos((prev) => [newVideoFromDB, ...prev]);
      setNewVideo({ title: "", url: "" });
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/meditations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      setVideos((prev) => prev.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <SideMenu />

      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold">Meditation Videos</h1>
        <p className="mt-4">Relax with guided meditation videos here!</p>

        {/* Add Video Section */}
        <form onSubmit={handleAddVideo} className="mt-8 mb-8 p-6 bg-gray-100 border rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Add Your Own Video</h2>
          <input
            type="text"
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-4"
            required
          />
          <input
            type="text"
            placeholder="YouTube URL (e.g., https://www.youtube.com/watch?v=video_id)"
            value={newVideo.url}
            onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-4"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Video
          </button>
        </form>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video._id} className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
              <iframe
                className="w-full aspect-video rounded-lg"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => handleDeleteVideo(video._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete Video
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
