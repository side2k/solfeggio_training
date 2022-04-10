import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import GuessSingleNote from "./GuessSingleNote";

const App = () => {
  const theme = useState("pink");

  return (
    <ThemeContext.Provider value={theme}>
      <div className="p-0 m-0">
        <Router>
          <header className="w-full mb-10 text-center p-3 bg-gray-600">
            <Link to="/" className="text-3xl text-white hover:text-gray-200">
              <h2>Угадай ноту</h2>
            </Link>
          </header>
          <Routes>
            <Route path="/" element={<GuessSingleNote />} />
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
