import React, { useState, useEffect, useRef } from "react";
import "./Gallery.css";
import { uploadMedia, fetchVideos, deleteMedia } from "../../services/mediaService";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { FaPlay, FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const Videos = () => {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [index, setIndex] = useState(-1);
  const fileInputRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMedia();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.email === "admin@gmail.com");
      } catch (err) {
        setIsAdmin(false);
      }
    }
  }, []);

  const getMedia = async () => {
    const data = await fetchVideos();
    if (Array.isArray(data)) setMedia(data);
    else setMedia([]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;
    const result = await deleteMedia(id);
    if (result) getMedia();
  };

  const handleUpload = async () => {
    if (!file) return alert("Upload a file first!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const uploaded = await uploadMedia(formData);
    if (uploaded) {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      getMedia();
      setLoading(false);
    }
  };

  const slides = media.map((item) => ({
    type: "video",
    sources: [
      {
        src: item.path,
        type: "video/mp4",
      },
    ],
  }));

  return (
    <div className="gallery-container">
      {/* <h2>Videos Gallery</h2> */}

      {isAdmin ? (
        <div className="upload-section">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileInputRef}
          />
          {loading && <p className="uploading-message">Uploading file... 🐾</p>}
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      ) : (
        <div className="upload-section">
          <p className="uploading-message">Only admin can upload media....🛑</p>
        </div>
      )}

      <div className="media-grid">
        {Array.isArray(media) && media.length > 0 ? (
          media.map((item, i) => (
            <div className="media-card" key={item._id}>
              <div className="image-container" onClick={() => setIndex(i)}>
                <video muted>
                  <source src={item.path} type="video/mp4" />
                </video>
                <div className="overlay">
                  <FaPlay className="icon play-icon" />
                </div>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>No videos to show 🥲</p>
        )}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Video]}
      />
    </div>
  );
};

export default Videos;