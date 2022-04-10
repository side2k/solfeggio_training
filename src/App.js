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
      <div className="text-sm mt-10">
        <p>
          Данное приложение создано для тренировки навыка чтения простых нот.
        </p>
        <p className="mt-5">
          2022, Леонид Амиров (
          <a href="mailto:leonid.amirov@gmail.com">leonid.amirov@gmail.com</a>){" "}
          <a href="https://github.com/side2k">github.com/side2k</a>
        </p>
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
