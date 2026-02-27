import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const restaurantsPerPage = 50;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/restaurants?page=${currentPage}&limit=${restaurantsPerPage}`
      )
      .then((res) => {
        setRestaurants(res.data.restaurants);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <div className="App">
      <h1>All Restaurants</h1>

      {loading && <p>Loading restaurants...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <ul className="restaurant-list">
            {restaurants.map((r) => (
              <li key={r.id}>
                <strong>{r.name}</strong> - {r.category}
              </li>
            ))}
          </ul>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={currentPage === num ? "active" : ""}
                >
                  {num}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;