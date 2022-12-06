import "./index.css";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Article from "./components/Article";

function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </main>
  );
}

export default App;
