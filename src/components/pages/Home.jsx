import { useEffect, useState } from "react";
import { getRandomCats, getRandomCatFact } from "../../services/apiService";
import CatCard from "./CatCard";
import "./Home.css";

function Home() {
//   const [cats, setCats] = useState([]);
//   const [fact, setFact] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const loadCatsAndFact = async () => {
//     try {
//       setLoading(true);
//       const [catsData, catFact] = await Promise.all([
//         getRandomCats(12),
//         getRandomCatFact(),
//       ]);
//       setCats(catsData);
//       setFact(catFact);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Oops! Something went wrong 😿");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCatsAndFact();
//   }, []);

//   return (
//     <div className="home">
//       {/* <h1>😺 Random Cats & Facts</h1> */}

//       <button onClick={loadCatsAndFact} className="refresh-button">
//         More cats
//       </button>

//       {loading && <p>loading cats.........</p>}
//       {error && <p className="error">{error}</p>}

//       {fact && <p className="cat-fact">📖 Fun Cat Fact: {fact} </p>}

//       <div className="cat-grid">
//         {cats.map((cat) => (
//           <CatCard key={cat.id || cat.url} cat={cat} />
//         ))}
//       </div>
//     </div>
//   );
 }

export default Home;
