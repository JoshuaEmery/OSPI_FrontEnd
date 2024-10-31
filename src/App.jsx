import { useEffect, useState } from "react";
import { repo } from "../data/repo";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await repo.get("/");
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>API Response:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
