import React, { useState, useEffect } from "react";
import "./Random.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaStar, FaMagic, FaRegImage, FaRegPlayCircle, FaCompress, FaTimes, FaGem, FaRocket } from "react-icons/fa";
import { fetchImages, fetchVideos } from "../../services/mediaService";

const Random = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  const inspiringWords = [
    ".........................."
  ];

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      type: Math.random() > 0.5 ? 'star' : 'snow',
    }));
    setParticles(newParticles);
  }, []);

  const floatingIcons = [
    { icon: '✦', color: '#ffd93d', size: '2rem' },
    { icon: '◆', color: '#667eea', size: '1.5rem' },
    { icon: '○', color: '#f093fb', size: '1.8rem' },
    { icon: '★', color: '#ff6b6b', size: '1.6rem' },
    { icon: '●', color: '#48dbfb', size: '1.4rem' },
  ];

  const loadMedia = async () => {
    const images = await fetchImages();
    const videos = await fetchVideos();
    return [
      ...images.map((img) => ({ ...img, mediaType: "image" })),
      ...videos.map((vid) => ({ ...vid, mediaType: "video" })),
    ];
  };

  const generateCards = async () => {
    setIsLoading(true);
    try {
      const allMedia = await loadMedia();
      if (allMedia.length < 1) {
        alert("No media in gallery! Upload some images or videos first.");
        setIsLoading(false);
        return;
      }

      const shuffled = [...allMedia].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 10);
      setMediaItems(selected);
      setRevealedCards([]);

      typeNextWord(selected);
    } catch (error) {
      console.error("Error loading media:", error);
      alert("Failed to load media. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const typeNextWord = (selected) => {
    const word = inspiringWords[Math.floor(Math.random() * inspiringWords.length)];
    setDisplayText("");
    setIsTyping(true);

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayText(word.slice(0, index));
      const revealCount = Math.min(
        Math.floor((index / word.length) * selected.length),
        selected.length
      );
      setRevealedCards(selected.slice(0, revealCount));

      if (index >= word.length) {
        clearInterval(interval);
        setIsTyping(false);
        
        // After word is fully typed, wait 3 seconds then type next word
        setTimeout(() => {
          if (mediaItems.length > 0) {
            typeNextWord(selected);
          }
        }, 3000);
      }
    }, 200);
  };

  const reset = () => {
    setMediaItems([]);
    setRevealedCards([]);
    setDisplayText("");
    setSelectedCard(null);
    setIsTyping(false);
  };

  return (
    <div className="random-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`particle ${p.type === 'star' ? 'particle-star' : 'particle-snow'}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.type === 'snow' ? `${p.size}px` : 'auto',
            height: p.type === 'snow' ? `${p.size}px` : 'auto',
            fontSize: p.type === 'star' ? `${p.size * 3}px` : 'auto',
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 1, 0],
            rotate: p.type === 'star' ? [0, 360, 0] : 0,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {p.type === 'star' ? '✦' : ''}
        </motion.div>
      ))}

      {floatingIcons.map((item, i) => (
        <motion.div
          key={`floating-${i}`}
          style={{
            position: 'absolute',
            color: item.color,
            fontSize: item.size,
            textShadow: `0 0 20px ${item.color}`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
          initial={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="typo-content">
        {mediaItems.length === 0 ? (
          <motion.button
            className="typo-btn"
            onClick={generateCards}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaGem />
              </motion.span>
            ) : (
              <FaMagic className="btn-icon" />
            )}
            <span>{isLoading ? "Loading..." : "Type Magic"}</span>
          </motion.button>
        ) : (
          <>
            <motion.button className="reset-typo" onClick={reset} whileHover={{ scale: 1.1 }}>
              <FaTimes /> Reset
            </motion.button>

            <div className="typo-display">
              <div className="typed-text">
                {displayText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="char"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              {isTyping && (
                <motion.span
                  className="cursor"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </div>

            <div className="typo-grid">
              {mediaItems.map((item, index) => {
                const isRevealed = index < revealedCards.length;
                return (
                  <motion.div
                    key={`${item._id}-${index}`}
                    className={`typo-card ${isRevealed ? "revealed" : ""}`}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={
                      isRevealed
                        ? {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              delay: index * 0.1,
                            },
                          }
                        : { opacity: 0.2, scale: 0.8, rotate: 0 }
                    }
                    whileHover={isRevealed ? { scale: 1.05, zIndex: 10 } : {}}
                    onClick={() => isRevealed && setSelectedCard(item)}
                  >
                    {isRevealed ? (
                      <div className="card-inner">
                        {item.mediaType === "video" ? (
                          <video
                            src={item.path}
                            className="card-media"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            src={item.path}
                            alt={item.filename}
                            className="card-media"
                            loading="lazy"
                          />
                        )}
                        <div className="card-overlay">
                          <span className="badge">
                            {item.mediaType === "video" ? <FaRegPlayCircle /> : <FaRegImage />}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="card-blank">
                        <span className="blank-text">{index + 1}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="floating-deco"
              animate={{ opacity: mediaItems.length > 0 ? 1 : 0 }}
            >
              <motion.span
                className="deco-heart"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaHeart />
              </motion.span>
              <motion.span
                className="deco-star"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <FaStar />
              </motion.span>
              <motion.span
                className="deco-rocket"
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FaRocket />
              </motion.span>
            </motion.div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="expanded-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="expanded-card"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedCard.mediaType === "video" ? (
                <video
                  src={selectedCard.path}
                  className="expanded-media"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedCard.path}
                  alt={selectedCard.filename}
                  className="expanded-media"
                />
              )}
              <button
                className="close-exp"
                onClick={() => setSelectedCard(null)}
              >
                <FaCompress />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Random;