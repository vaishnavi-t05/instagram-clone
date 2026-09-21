import React, { useState } from "react";
import "./Notifications.css";

const TABS = ["All", "People you follow", "Comments", "Follows"];

const initialNew = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=12",
    text: <> <b>its__me__spidey__7</b> requested to follow you. <span className="notif-time">5h</span></>,
    type: "request",
    highlight: false,
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/100?img=32",
    text: <> <b>rajiv307212</b>, who you might know, is on Instagram. <span className="notif-time">7h</span></>,
    type: "suggest",
    highlight: false,
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/100?img=53",
    text: <> <b>sar8nn_</b> requested to follow you. <span className="notif-time">14h</span></>,
    type: "request",
    highlight: true,
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/100?img=47",
    text: <> <b>feral_2010</b> requested to follow you. <span className="notif-time">14h</span></>,
    type: "request",
    highlight: false,
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/100?img=15",
    avatar2: "https://i.pravatar.cc/100?img=25",
    text: <> <b>_kax.in_, _deeya__03</b> and 5 others liked your story. <span className="notif-time">15h</span></>,
    type: "like",
    highlight: false,
  },
];

const initialToday = [
  {
    id: 11,
    avatar: "https://i.pravatar.cc/100?img=59",
    text: <> <b>https.vid22</b> started following you. <span className="notif-time">15h</span></>,
  },
  {
    id: 12,
    avatar: "https://i.pravatar.cc/100?img=68",
    text: <> <b>lunxzz_21</b> started following you. <span className="notif-time">15h</span></>,
  },
];

const Notifications = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [newList, setNewList] = useState(initialNew);
  const [todayList] = useState(initialToday);
  const [status, setStatus] = useState({}); // id -> 'following' | 'deleted' | 'confirmed'

  const handleConfirm = (id) => setStatus((s) => ({ ...s, [id]: "confirmed" }));
  const handleDelete = (id) => {
    // remove request row like Instagram does
    setNewList((list) => list.filter((n) => n.id !== id));
  };
  const handleFollow = (id) =>
    setStatus((s) => ({ ...s, [id]: s[id] === "following" ? "" : "following" }));

  const renderActions = (n) => {
    const st = status[n.id];
    if (n.type === "request") {
      if (st === "confirmed")
        return <button className="notif-btn following">Following</button>;
      return (
        <div className="notif-actions">
          <button className="notif-btn confirm" onClick={() => handleConfirm(n.id)}>
            Confirm
          </button>
          <button className="notif-btn delete" onClick={() => handleDelete(n.id)}>
            Delete
          </button>
        </div>
      );
    }
    if (n.type === "suggest") {
      const following = st === "following";
      return (
        <button
          className={`notif-btn ${following ? "following" : "confirm"}`}
          onClick={() => handleFollow(n.id)}
        >
          {following ? "Following" : "Follow"}
        </button>
      );
    }
    if (n.type === "like") {
      return <div className="notif-thumb" />;
    }
    return null;
  };

  const filteredNew =
    activeTab === "Follows"
      ? newList.filter((n) => n.type === "request" || n.type === "suggest")
      : activeTab === "Comments"
      ? []
      : newList;

  return (
    <div className="notif-panel">
      <div className="notif-header">
        <h2>Notifications</h2>
        <button className="notif-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="notif-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`notif-tab ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="notif-follow-req">
        <div className="notif-avatars">
          <img src="https://i.pravatar.cc/100?img=5" alt="" />
          <img src="https://i.pravatar.cc/100?img=8" alt="" className="overlap" />
        </div>
        <div className="notif-follow-text">
          <b>Follow requests</b>
          <span>sar8nn_ + 42 others</span>
        </div>
        <span className="notif-dot" />
        <span className="notif-arrow">›</span>
      </div>

      <hr className="notif-div" />

      <h4 className="notif-section">New</h4>
      <div className="notif-list">
        {filteredNew.map((n) => (
          <div key={n.id} className={`notif-item ${n.highlight ? "highlight" : ""}`}>
            <div className="notif-ava-wrap">
              <img src={n.avatar} alt="" className="notif-ava" />
              {n.avatar2 && <img src={n.avatar2} alt="" className="notif-ava overlap2" />}
            </div>
            <p className="notif-text">{n.text}</p>
            {renderActions(n)}
          </div>
        ))}
        {filteredNew.length === 0 && <p className="notif-empty">No notifications.</p>}
      </div>

      <hr className="notif-div" />

      <h4 className="notif-section">Today</h4>
      <div className="notif-list">
        {todayList.map((n) => (
          <div key={n.id} className="notif-item">
            <img src={n.avatar} alt="" className="notif-ava" />
            <p className="notif-text">{n.text}</p>
            <button
              className={`notif-btn ${status[n.id] === "following" ? "confirm" : "following"}`}
              onClick={() => handleFollow(n.id)}
            >
              {status[n.id] === "following" ? "Follow" : "Following"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
