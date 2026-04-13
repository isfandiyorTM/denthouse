import { useState, useEffect } from "react";
import { SAMPLE_VIDEOS } from "../data/constants";

export function useVideos() {
  const [videos, setVideos] = useState(SAMPLE_VIDEOS);

  useEffect(() => {
    const stored = localStorage.getItem("dh_videos");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setVideos(parsed);
      } catch {}
    }
  }, []);

  function saveVideos(vids) {
    localStorage.setItem("dh_videos", JSON.stringify(vids));
    setVideos(vids);
  }

  function addVideo(formData) {
    const newVideo = {
      ...formData,
      id: "v" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    saveVideos([newVideo, ...videos]);
  }

  function updateVideo(id, formData) {
    saveVideos(videos.map((v) => (v.id === id ? { ...v, ...formData } : v)));
  }

  function deleteVideo(id) {
    saveVideos(videos.filter((v) => v.id !== id));
  }

  return { videos, addVideo, updateVideo, deleteVideo };
}
