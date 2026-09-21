import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stories as storiesData } from "./data";
import "./ViewStory.css";

const AUTO_ADVANCE_MS = 5000;

const timeFor = (id) => {
  const opts = ["12h", "12h", "1h", "52m", "3h", "8h", "1h", "5h"];
  return opts[(Number(id) - 1) % opts.length];
};

const SideCard = ({ story, onOpen }) => {
  if (!story) return <div className="vs-side empty" />;
  return (
    <div className="vs-side" onClick={onOpen}>
      <img src={story.image} alt="" className="vs-side-bg" />
      <div className="vs-side-fade" />
      <div className="vs-side-center">
        <span className="vs-ring">
          <img src={story.profilePic} alt="" />
        </span>
        <b>{story.username}</b>
        <span>{timeFor(story.id)}</span>
      </div>
    </div>
  );
};

const ViewStory = () => {
  const { id, tot } = useParams();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [reply, setReply] = useState("");

  const cur = Number(id);
  const total = Number(tot) || stories.length;

  useEffect(() => {
    setStories(storiesData);
  }, []);

  useEffect(() => {
    setPaused(false);
    setLiked(false);
    setReply("");
  }, [id]);

  if (cur > total || cur <= 0) {
    navigate("/home");
    return null;
  }

  const story = stories.find((s) => Number(s.id) === cur);
  const prev = stories.find((s) => Number(s.id) === cur - 1);
  const next1 = stories.find((s) => Number(s.id) === cur + 1);
  const next2 = stories.find((s) => Number(s.id) === cur + 2);

  const goNext = () => {
    if (cur >= total) navigate("/home");
    else navigate(`/story/${cur + 1}/${total}`);
  };
  const goPrev = () => {
    if (cur > 1) navigate(`/story/${cur - 1}/${total}`);
  };

  return (
    <div className="vs-page">
      <img src="/assets/instagram-images.png" alt="Instagram" className="vs-logo" />
      <button className="vs-close" onClick={() => navigate("/home")} aria-label="Close">
        ✕
      </button>

      <div className="vs-stage">
        <SideCard story={prev} onOpen={goPrev} />
        <button className="vs-arrow" onClick={goPrev} aria-label="Previous">‹</button>

        {/* CENTER CARD */}
        <div className="vs-card">
          {story ? (
            <>
              <img src={story.image} alt="" className="vs-img" />

              <div className="vs-progress">
                <div className="vs-seg done" />
                <div className="vs-seg">
                  <div
                    key={id}
                    className={`vs-fill ${paused ? "paused" : ""}`}
                    style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
                    onAnimationEnd={goNext}
                  />
                </div>
                <div className="vs-seg" />
              </div>

              <div className="vs-head">
                <img src={story.profilePic} alt="" className="vs-ava" />
                <b>{story.username}</b>
                <span className="vs-time">{timeFor(story.id)}</span>
                <span className="vs-spacer" />
                <button onClick={() => setPaused((p) => !p)} aria-label="Pause">
                  <i className={`bi ${paused ? "bi-play-fill" : "bi-pause-fill"}`} />
                </button>
                <button aria-label="More">
                  <i className="bi bi-three-dots" />
                </button>
              </div>

              <div className="vs-reply">
                <input
                  placeholder={`Reply to ${story.username}...`}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setReply("");
                  }}
                />
                <button
                  className={liked ? "liked" : ""}
                  onClick={() => setLiked((v) => !v)}
                  aria-label="Like"
                >
                  <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
                </button>
                <button onClick={() => setReply("")} aria-label="Send">
                  <i className="bi bi-send" />
                </button>
              </div>
            </>
          ) : (
            <div className="vs-loading">Loading...</div>
          )}
        </div>

        <button className="vs-arrow" onClick={goNext} aria-label="Next">›</button>
        <SideCard story={next1} onOpen={goNext} />
        <SideCard
          story={next2}
          onOpen={() => navigate(`/story/${cur + 2}/${total}`)}
        />
      </div>
    </div>
  );
};

export default ViewStory;
