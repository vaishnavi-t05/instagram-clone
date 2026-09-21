import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Explore.css";

const TILES = [
  { src: "/reels/s1.mp4", label: "viral attitude" },
  { src: "/reels/s2.mp4", label: "trending" },
  { src: "/reels/s3.mp4", label: "reels" },
  { src: "/reels/s4.mp4", label: "supra spotting" },
  { src: "/reels/s5.mp4", label: "venmathi" },
  { src: "/reels/s6.mp4", label: "history cars" },
  { src: "/reels/s7.mp4", label: "bikers" },
  { src: "/reels/s8.mp4", label: "college life" },
];

const Tile = ({ tile, onOpen }) => {
  const play = (e) => {
    e.currentTarget.querySelector("video")?.play().catch(() => {});
  };
  const stop = (e) => {
    const v = e.currentTarget.querySelector("video");
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };
  return (
    <div
      className="explore-tile"
      onMouseEnter={play}
      onMouseLeave={stop}
      onClick={onOpen}
    >
      <video src={tile.src} muted loop playsInline preload="metadata" />
      <span className="explore-badge">
        <i className="bi bi-play-fill" />
      </span>
    </div>
  );
};

const Explore = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = React.useRef(null);

  const filtered = TILES.filter((t) =>
    t.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="d-flex explore-page">
      <div className="explore-sidebar">
        <Sidebar />
      </div>
      <main className="explore-main">
        <div className="explore-search">
          <i
            className="bi bi-search"
            onClick={() => inputRef.current?.focus()}
            style={{ cursor: "pointer" }}
          />
          <input
            ref={inputRef}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="explore-grid">
          {filtered.map((t) => (
            <Tile key={t.src} tile={t} onOpen={() => navigate("/reels")} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="explore-empty">No results found.</p>
        )}
      </main>
    </div>
  );
};

export default Explore;
