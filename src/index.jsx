import { BookOpen, Search, ChevronRight } from "lucide-react";
import "./index.css";

export default function Index() {
  return (
    <div className="page">

      {/* HEADER */}
      <nav className="navbar container">
        <div className="logo">
          <BookOpen size={24} />
          <span>Bookshelf</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="container hero">
        <div className="hero-text">
          <h1 className="hero-title">
            Kid's <br /> Bookshelf
          </h1>
          <p className="hero-subtitle">
            Take your little ones on a magical reading adventure with curated books.
          </p>
        </div>

        <img
          src="/hero.jpg"
          alt="Child reading"
          className="hero-img"
        />
      </section>

      {/* SEARCH */}
      <section className="container">
        <div className="search-box">
          <Search size={20} />
          <input type="text" placeholder="Search books..." />
        </div>
      </section>

      {/* AUTHORS */}
      <section className="container">
        <h2 className="section-title">Authors</h2>

        <div className="grid grid-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="author-card">
              <img src="/author.jpg" alt="Author" />
            </div>
          ))}
        </div>
      </section>

      {/* AUDIOBOOK */}
      <section className="container">
        <div className="section-header">
          <h2 className="section-title">Audiobook</h2>
          <button className="link-btn">
            See all <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-3">
          {[1, 2, 3].map((book) => (
            <div key={book} className="card audio-card">
              <img src="/book.jpg" alt="Audio book" />
              <div>
                <p>Audio Book Title</p>
                <span>10 min</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOK SHOWCASE */}
      <section className="container">
        <h2 className="section-title">Books Showcase</h2>

        <div className="grid grid-4">
          {[1, 2, 3, 4].map((book) => (
            <div key={book} className="book-card">
              <img src="/book.jpg" alt="Book" />
              <p>Book Title</p>
            </div>
          ))}
        </div>
      </section>

      {/* LISTS */}
      <section className="container">
        <h2 className="section-title">Lists</h2>

        <div className="grid grid-3">
          {[1, 2, 3].map((list) => (
            <div key={list} className="card">
              <p>Reading List</p>
              <span>12 books</span>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        <span>Home</span>
        <span>Search</span>
        <span>Profile</span>
      </nav>

    </div>
  );
}
