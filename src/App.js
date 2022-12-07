import "./index.css";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Article from "./components/Article";
import Profile from "./components/Profile";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className="app">
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:id" element={<Article />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
