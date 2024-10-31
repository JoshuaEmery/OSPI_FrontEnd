import { useEffect, useState } from "react";
import { repo } from "../data/repo";

function App() {
  const [data, setData] = useState(null);
  const MODE = import.meta.env.MODE;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await repo.get("/");
        setData(result);
        console.log("API URL:", import.meta.env.VITE_AZURE_API_URL); // For debugging
      } catch (err) {
        console.error("Full error:", err); // Log the full error object
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>API Response:</h2>
      {error && (
        <p>
          {MODE} API Error: {error}
        </p>
      )}
      <pre>
        {MODE} API Working: {data}
      </pre>
    </>
  );
}

export default App;
