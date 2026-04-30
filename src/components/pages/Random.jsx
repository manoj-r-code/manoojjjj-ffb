import React, { useState, useEffect } from "react";
import "./Random.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaStar, FaMagic } from "react-icons/fa";
import { fetchAllMedia } from "../../services/mediaService";

const Random = () => {
  const [media, setMedia] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      const data = await fetchAllMedia();
      if (Array.isArray(data)) {
        setMedia(data);
      }
    };
    loadMedia();
  }, []);

  const generateRandom = () => {
    if (media.length === 0) {
      alert("No media available in the gallery!");
      return;
    }
    const randomItem = media[Math.floor(Math.random() * media.length)];
    setCurrentItem(randomItem);
  };

  return (
    <div className="random-container">
      <div className="random-content">
        <motion.button
          className="random-btn"
          onClick={generateRandom}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaMagic className="btn-icon" />
          <span>Reveal Magic</span>
        </motion.button>

        <AnimatePresence mode="wait">
          {currentItem && (
            <motion.div
              className="image-container"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {currentItem.type.startsWith("video") ? (
                <video
                  src={currentItem.path}
                  controls
                  className="random-image"
                  autoPlay
                />
              ) : (
                <motion.img
                  src={currentItem.path}
                  alt={currentItem.filename}
                  className="random-image"
                  initial={{ filter: "blur(20px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="image-overlay"></div>
              <motion.div
                className="floating-elements"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.span
                  className="heart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <FaHeart />
                </motion.span>
                <motion.span
                  className="star"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <FaStar />
                </motion.span>
                <motion.span
                  className="star-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <FaStar />
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Random;