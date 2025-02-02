import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate an asynchronous operation
    const fetchData = async () => {
      const response = await fetch('/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancel any ongoing asynchronous operations
      // This is crucial to prevent state updates on an unmounted component
      setData(null); //or any other necessary cleanup
    };
  }, [location.pathname]); // Only run effect when route changes

  return (
    <div>Home: {JSON.stringify(data)}</div>
  );
}

function About() {
  return (
    <div>About</div>
  );
}
