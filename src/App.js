import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import SingleNote from "./SingleNote";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("pink");

  return (
    <ThemeContext.Provider value={theme}>
      <div className="p-0 m-0">
        <Router>
          <header
            className="w-full mb-10 text-center p-7 bg-gradient-to-b
           from-purple-400 via-pink-500 to-red-500"
          >
            <Link to="/" className="text-6xl text-white hover:text-gray-200">
              <h1>Solfeggio Training</h1>
            </Link>
          </header>
          <Routes>
            <Route path="/" element={<SingleNote />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
