import "./index.css";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Article from "./components/Article";
import Profile from "./components/Profile";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState("grumpy19");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:sort_by" element={<ArticleList />} />
          <Route path="/articles/t/:topic" element={<ArticleList />} />
          <Route path="/articles/t/:topic/:sort_by" element={<ArticleList />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
