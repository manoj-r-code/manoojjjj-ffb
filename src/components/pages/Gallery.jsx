// import React, { useState, useEffect } from "react";
// import "./Gallery.css";
// import { uploadMedia, fetchMedia } from "../../services/mediaService";

// const Gallery = () => {
//   const [media, setMedia] = useState([]); // ✅ Ensure it's an array
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     getMedia();
//   }, []);

//   const getMedia = async () => {
//     const data = await fetchMedia();
//     if (Array.isArray(data)) {
//       setMedia(data); // ✅ Only set if it's an array
//     } else {
//       console.error("Media data is not an array:", data);
//       setMedia([]); // fallback
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Upload a file first!");
//     const formData = new FormData();
//     formData.append("file", file);
//     const uploaded = await uploadMedia(formData);
//     if (uploaded) {
//       setFile(null);
//       getMedia(); // refresh gallery
//     }
//   };

//   return (
//     <div className="gallery-container">
//       {/* <h2>ChintuVerse Gallery</h2> */}

//       <div className="upload-section">
//         <input
//           type="file"
//           accept="image/*,video/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <button onClick={handleUpload}>Upload</button>
//       </div>

//       <div className="media-grid">
//         {Array.isArray(media) && media.length > 0 ? (
//           media.map((item) => (
//             <div className="media-card" key={item._id}>
//               {item.type.startsWith("video") ? (
//                 <video controls>
//                   <source src={item.path} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 <img src={item.path} alt={item.filename} />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No media to show 🥲</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Gallery;

// import React, { useState, useEffect } from "react";
// import "./Gallery.css";
// import { uploadMedia, fetchMedia } from "../../services/mediaService";
// import Lightbox from "yet-another-react-lightbox";
// import Video from "yet-another-react-lightbox/plugins/video";
// import "yet-another-react-lightbox/styles.css";

// const Gallery = () => {
//   const [media, setMedia] = useState([]);
//   const [file, setFile] = useState(null);
//   const [index, setIndex] = useState(-1); // for lightbox

//   useEffect(() => {
//     getMedia();
//   }, []);

//   const getMedia = async () => {
//     const data = await fetchMedia();
//     if (Array.isArray(data)) setMedia(data);
//     else setMedia([]);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Upload a file first!");
//     const formData = new FormData();
//     formData.append("file", file);
//     const uploaded = await uploadMedia(formData);
//     if (uploaded) {
//       setFile(null);
//       getMedia();
//     }
//   };

//   const slides = media.map((item) => {
//     return item.type.startsWith("video")
//       ? {
//           type: "video",
//           sources: [
//             {
//               src: item.path,
//               type: "video/mp4",
//             },
//           ],
//           poster: item.thumbnail || undefined, // if you have thumbnail
//         }
//       : {
//           src: item.path,
//         };
//   });

//   return (
//     <div className="gallery-container">
//       <h2>ChintuVerse Gallery</h2>

//       <div className="upload-section">
//         <input
//           type="file"
//           accept="image/*,video/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <button onClick={handleUpload}>Upload</button>
//       </div>

//       <div className="media-grid">
//         {Array.isArray(media) && media.length > 0 ? (
//           media.map((item, i) => (
//             <div
//               className="media-card"
//               key={item._id}
//               onClick={() => setIndex(i)}
//             >
//               {item.type.startsWith("video") ? (
//                 <video muted>
//                   <source src={item.path} type="video/mp4" />
//                 </video>
//               ) : (
//                 <img src={item.path} alt={item.filename} />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No media to show 🥲</p>
//         )}
//       </div>

//       <Lightbox
//         open={index >= 0}
//         close={() => setIndex(-1)}
//         index={index}
//         slides={slides}
//         plugins={[Video]}
//       />
//     </div>
//   );
// };

// export default Gallery;

// // implementation of the Gallery component with lightbox and upload functionality
// import React, { useState, useEffect } from "react";
// import "./Gallery.css";
// import { uploadMedia, fetchMedia } from "../../services/mediaService";
// import Lightbox from "yet-another-react-lightbox";
// import Video from "yet-another-react-lightbox/plugins/video";
// import "yet-another-react-lightbox/styles.css";

// const Gallery = () => {
//   const [media, setMedia] = useState([]);
//   const [file, setFile] = useState(null);
//   const [index, setIndex] = useState(-1); // for lightbox

//   useEffect(() => {
//     getMedia();
//   }, []);

//   const getMedia = async () => {
//     const data = await fetchMedia();
//     if (Array.isArray(data)) setMedia(data);
//     else setMedia([]);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Upload a file first!");
//     const formData = new FormData();
//     formData.append("file", file);
//     const uploaded = await uploadMedia(formData);
//     if (uploaded) {
//       setFile(null);
//       getMedia();
//     }
//   };

//   const slides = media.map((item) => {
//     return item.type.startsWith("video")
//       ? {
//           type: "video",
//           sources: [
//             {
//               src: item.path,
//               type: "video/mp4",
//             },
//           ],
//           poster: item.thumbnail || undefined, // if you have thumbnail
//         }
//       : {
//           src: item.path,
//         };
//   });

//   return (
//     <div className="gallery-container">
//       <h2>ChintuVerse Gallery</h2>

//       <div className="upload-section">
//         <input
//           type="file"
//           accept="image/*,video/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <button onClick={handleUpload}>Upload</button>
//       </div>

//       <div className="media-grid">
//         {Array.isArray(media) && media.length > 0 ? (
//           media.map((item, i) => (
//             <div
//               className="media-card"
//               key={item._id}
//               onClick={() => setIndex(i)} // Click to open in lightbox
//             >
//               <div className="image-container">
//                 {item.type.startsWith("video") ? (
//                   <video muted>
//                     <source src={item.path} type="video/mp4" />
//                   </video>
//                 ) : (
//                   <img src={item.path} alt={item.filename} />
//                 )}
//                 <div className="overlay">
//                   <p className="overlay-text">Click to view</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No media to show 🥲</p>
//         )}
//       </div>

//       <Lightbox
//         open={index >= 0}
//         close={() => setIndex(-1)}
//         index={index}
//         slides={slides}
//         plugins={[Video]}
//       />
//     </div>
//   );
// };

// export default Gallery;

//implementation of the Gallery component with lightbox and upload functionality

import React, { useState, useEffect, useRef } from "react";
import "./Gallery.css";
import {
  uploadMedia,
  fetchMedia,
  deleteMedia,
} from "../../services/mediaService";
// import { isAdmin } from "../../services/axiosInstance";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import { FaPlay, FaSearchPlus } from "react-icons/fa";
import "yet-another-react-lightbox/styles.css";
import { FaTrash } from "react-icons/fa";
// import { useRef } from "react";
import { jwtDecode } from "jwt-decode";

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [index, setIndex] = useState(-1);
  const fileInputRef = useRef(null); // create a ref
  // for lightbox
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   getMedia();
  // }, []);
  useEffect(() => {
    // 1. Fetch media on load
    getMedia();
  
    // 2. Check token and set isAdmin
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const email = decoded.email;
        setIsAdmin(email === "admin@gmail.com");
      } catch (err) {
        console.error("Invalid token:", err);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);
  
  const getMedia = async () => {
    const data = await fetchMedia();
    if (Array.isArray(data)) setMedia(data);
    else setMedia([]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (!confirmDelete) return;

    const result = await deleteMedia(id);
    if (result) getMedia(); // Refresh after deletion
  };
  const [loading, setLoading] = useState(false); // 👈 loading state

  const handleUpload = async () => {
    if (!file) return alert("Upload a file first!");
    setLoading(true); // 👈 start loading

    const formData = new FormData();
    formData.append("file", file);
    const uploaded = await uploadMedia(formData);
    if (uploaded) {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // clear input field visually

      getMedia();
      setLoading(false); // 👈 end loading
    }
  };

  const slides = media.map((item) => {
    return item.type.startsWith("video")
      ? {
          type: "video",
          sources: [
            {
              src: item.path,
              type: "video/mp4",
            },
          ],
          poster: item.thumbnail || undefined, // if you have thumbnail
        }
      : {
          src: item.path,
        };
  });

  return (
    <div className="gallery-container">
      {/* <h2>ChintuVerse Gallery</h2> */}

      {/* <div className="upload-section">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef} // bind the ref
        />
        {loading && <p className="uploading-message">Uploading file... 🐾</p>}

        <button onClick={handleUpload}>Upload</button>
      </div> */}

      {isAdmin ? (
        <div className="upload-section">
          <input
            type="file"
            accept="image/*,video/*"
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
            // <div
            //   className="media-card"
            //   key={item._id}
            //   onClick={() => setIndex(i)}
            // >
            //   <div className="image-container">
            //     {item.type.startsWith("video") ? (
            //       <video muted>
            //         <source src={item.path} type="video/mp4" />
            //       </video>
            //     ) : (
            //       <img src={item.path} alt={item.filename} />
            //     )}

            //     {/* Video or Image Hover Icons */}
            //     <div className="overlay">
            //       {item.type.startsWith("video") ? (
            //         <FaPlay className="icon play-icon" />
            //       ) : (
            //         <FaSearchPlus className="icon zoom-icon" />
            //       )}
            //     </div>
            //   </div>
            // </div>

            <div className="media-card" key={item._id}>
              <div className="image-container" onClick={() => setIndex(i)}>
                {item.type.startsWith("video") ? (
                  <video muted>
                    <source src={item.path} type="video/mp4" />
                  </video>
                ) : (
                  <img src={item.path} alt={item.filename} />
                )}

                <div className="overlay">
                  {item.type.startsWith("video") ? (
                    <FaPlay className="icon play-icon" />
                  ) : (
                    <FaSearchPlus className="icon zoom-icon" />
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>No media to show 🥲</p>
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

export default Gallery;
