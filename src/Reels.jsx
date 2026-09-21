import React, { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import "./Reels.css";

const ALL_REELS = [
  {
    id: 1,
    src: "/reels/reel1.mp4",
    poster: "https://picsum.photos/seed/reel1/540/960",
    user: "nature_explorer",
    avatar: "https://i.pravatar.cc/100?img=13",
    audio: "Original audio • nature_explorer",
    tags: "#nature #explore #sunset #bestfriends #kashmir",
    likes: "47.1K",
    comments: "70",
    shares: "1,030",
  },
  {
    id: 2,
    src: "/reels/reel2.mp4",
    poster: "https://picsum.photos/seed/reel2/540/960",
    user: "luxury_villa",
    avatar: "https://i.pravatar.cc/100?img=47",
    audio: "Original audio • luxury_villa",
    tags: "#luxury #villa #travel #trendingreels",
    likes: "12.4K",
    comments: "210",
    shares: "890",
  },
  {
    id: 3,
    src: "/reels/reel3.mp4",
    poster: "https://picsum.photos/seed/reel3/540/960",
    user: "bmw_lover",
    avatar: "https://i.pravatar.cc/100?img=32",
    audio: "Trending sound • bmw_lover",
    tags: "#bmw #lavenderbmw #ooty #trendingreels #fyp",
    likes: "8.2K",
    comments: "95",
    shares: "410",
  },
  {
    id: 4,
    src: "/reels/reel4.mp4",
    user: "buskerala_fans",
    avatar: "https://i.pravatar.cc/100?img=59",
    audio: "Original audio • buskerala_fans",
    tags: "#buskerala #tusker #forza #bikersofinstagram",
    likes: "21.3K",
    comments: "340",
    shares: "2,110",
  },
  {
    id: 5,
    src: "/reels/reel5.mp4",
    user: "m4_competition",
    avatar: "https://i.pravatar.cc/100?img=68",
    audio: "Trending sound • m4_competition",
    tags: "#m4competition #bmwm4 #carlovers",
    likes: "15.7K",
    comments: "180",
    shares: "960",
  },
  {
    id: 6,
    src: "/reels/reel6.mp4",
    user: "melody_posts",
    avatar: "https://i.pravatar.cc/100?img=25",
    audio: "Rathinamo • trending song",
    tags: "#rathinamo #trending #viral #fyp",
    likes: "32.9K",
    comments: "512",
    shares: "3,040",
  },
];

// New shuffled order on every visit
const shuffled = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const ReelCard = ({ reel, muted, onToggleMute }) => {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Attach ref + force muted property (React's muted attr alone
  // doesn't always apply, which blocks autoplay and freezes video)
  const setVideoRef = (el) => {
    videoRef.current = el;
    if (el) el.muted = true;
  };

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Play only the reel currently on screen, pause the rest
  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;
    const tryPlay = () => {
      // respect global sound setting; if unmuted autoplay is blocked,
      // fall back to muted so the video still plays
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    };
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.6 }
    );
    obs.observe(wrap);
    tryPlay();
    return () => obs.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else if (muted) {
      // first tap while muted turns sound on for ALL reels
      onToggleMute();
    } else {
      v.pause();
    }
  };

  return (
    <div className="reel-row" ref={wrapRef}>
      {/* video + actions grouped so the rail sits next to the video */}
      <div className="reel-stage">
      {/* video centered */}
      <div className="reel-video-wrap" onClick={togglePlay}>
        <video
          ref={setVideoRef}
          src={reel.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {!playing && (
          <div className="reel-big-play">
            <i className="bi bi-play-fill" />
          </div>
        )}

        {playing && muted && (
          <div className="reel-sound-hint">
            <i className="bi bi-volume-mute-fill" /> Tap for sound
          </div>
        )}

        <button
          className="reel-mute"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          aria-label="Toggle sound"
        >
          <i className={`bi ${muted ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`} />
        </button>
      </div>

      {/* info bottom-left, off the video */}
      <div className="reel-info-side">
        <div className="reel-user">
          <img src={reel.avatar} alt="" />
          <b>{reel.user}</b>
          <span className="dot">•</span>
          <button
            className="reel-follow"
            onClick={() => setFollowing((f) => !f)}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>
        <div className="reel-audio">
          <i className="bi bi-music-note-beamed" />
          <div className="reel-marquee">
            <span>{reel.audio}</span>
          </div>
        </div>
        <p className="reel-tags">{reel.tags}</p>
      </div>

      {/* action rail on the right */}
      <div className="reel-actions-side">
        <button
          className={`reel-act ${liked ? "liked" : ""}`}
          onClick={() => setLiked((v) => !v)}
        >
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
          <span>{reel.likes}</span>
        </button>
        <button className="reel-act">
          <i className="bi bi-chat" />
          <span>{reel.comments}</span>
        </button>
        <button className="reel-act">
          <i className="bi bi-repeat" />
          <span>{reel.shares}</span>
        </button>
        <button className="reel-act">
          <i className="bi bi-send" />
        </button>
        <button className="reel-act" onClick={() => setSaved((s) => !s)}>
          <i className={`bi ${saved ? "bi-bookmark-fill" : "bi-bookmark"}`} />
        </button>
        <button className="reel-act">
          <i className="bi bi-three-dots" />
        </button>
        <img src={reel.avatar} alt="" className="reel-thumb" />
      </div>
      </div>
    </div>
  );
};

const Reels = () => {
  const reels = useMemo(() => shuffled(ALL_REELS), []);
  // one sound setting for every reel, remembered across visits
  const [muted, setMuted] = useState(
    () => localStorage.getItem("reels-muted") !== "off"
  );
  const toggleMute = () => {
    setMuted((m) => {
      localStorage.setItem("reels-muted", m ? "off" : "on");
      return !m;
    });
  };
  return (
    <div className="d-flex reels-page">
      <div className="w-20 sidebar-column">
        <Sidebar />
      </div>
      <main className="reels-feed">
        {reels.map((r) => (
          <ReelCard key={r.id} reel={r} muted={muted} onToggleMute={toggleMute} />
        ))}
      </main>
    </div>
  );
};

export default Reels;
