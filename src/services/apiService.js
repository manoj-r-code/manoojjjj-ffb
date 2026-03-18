const BASE_URL = "https://api.thecatapi.com/v1";

const API_KEY = ""; 

export const getRandomCats = async (limit = 10) => {
  const response = await fetch(`${BASE_URL}/images/search?limit=${limit}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cat images");
  }

  const data = await response.json();
  return data; // returns an array of cat image objects
};

///

export const getRandomCatFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");

  if (!response.ok) throw new Error("Failed to fetch cat fact");

  const data = await response.json();
  return data.fact;
};
