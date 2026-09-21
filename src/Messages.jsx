import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Messages.css";

const NOTES = [
  { id: 1, user: "Edward", img: "https://i.pravatar.cc/100?img=11", note: "Wildest dr... ChipM 💜💜" },
  { id: 2, user: "spidzz_pzz", img: "https://i.pravatar.cc/100?img=13", note: "The One Sai Abhyankkar 🐣🌙 33" },
  { id: 3, user: "Sivaa!!! 💖💌", img: "https://i.pravatar.cc/100?img=59", note: "Oday Oday Vijay Prakash ... 💖✨😍" },
  { id: 4, user: "Dhanush", img: "https://i.pravatar.cc/100?img=68", note: "Life Go Oliver" },
];

const CHATS = [
  {
    id: 1, name: "IX KINGDOM ⚔⚔ 📌", preview: "☆pr@©6€n☆ removed you from the gro... · 1y",
    img: "https://i.pravatar.cc/100?img=5", muted: true, unread: false, online: false,
  },
  {
    id: 2, name: "ASHOK SIR PAYALUGA.....At 🌅", preview: "❄ sent an attachment. · 58m",
    img: "https://i.pravatar.cc/100?img=12", muted: false, unread: true, online: true,
  },
  {
    id: 3, name: "lunxzz_", preview: "3 new messages · 1h",
    img: "https://i.pravatar.cc/100?img=47", muted: false, unread: true, online: false,
    bold: true,
  },
  {
    id: 4, name: "Praveen", preview: "2 new messages · 1h",
    img: "https://i.pravatar.cc/100?img=15", muted: false, unread: true, online: false,
    bold: true,
  },
  {
    id: 5, name: "BUD!🏠💠", preview: "4 new messages · 1h",
    img: "https://i.pravatar.cc/100?img=32", muted: true, unread: true, online: true,
    bold: true, greenBg: true,
  },
  {
    id: 6, name: "spidzz_pzz", preview: "You're now friends. Say hi! · 2h",
    img: "https://i.pravatar.cc/100?img=13", muted: false, unread: false, online: false,
  },
];

const Messages = () => {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState({
    3: [{ from: "them", text: "hey bro 👋" }, { from: "them", text: "seen my story?" }],
    4: [{ from: "them", text: "2 new messages" }],
  });

  const filtered = CHATS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const active = CHATS.find((c) => c.id === activeId);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    setThreads((t) => ({
      ...t,
      [active.id]: [...(t[active.id] || []), { from: "me", text: draft.trim() }],
    }));
    setDraft("");
  };

  return (
    <div className={`msg-page ${activeId ? "has-active" : ""}`}>
      <div className="msg-sidebar">
        <Sidebar />
      </div>

      {/* inbox list */}
      <aside className="msg-inbox">
        <div className="msg-inbox-top">
          <span className="msg-user">Edward <i className="bi bi-chevron-down" /></span>
          <i className="bi bi-pencil-square" />
        </div>

        <div className="msg-search">
          <i className="bi bi-search" />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="msg-notes">
          {NOTES.map((n) => (
            <div key={n.id} className="msg-note-item">
              <div className="msg-note-bubble">{n.note}</div>
              <img src={n.img} alt={n.user} />
              <span>{n.user}</span>
            </div>
          ))}
        </div>

        <div className="msg-row-head">
          <b>Messages</b>
          <span>Requests</span>
        </div>

        <div className="msg-list">
          {filtered.map((c) => (
            <div
              key={c.id}
              className={`msg-item ${activeId === c.id ? "active" : ""}`}
              onClick={() => setActiveId(c.id)}
            >
              <div className="msg-ava-wrap">
                <img
                  src={c.img}
                  alt=""
                  className={c.greenBg ? "green-bg" : ""}
                />
                {c.online && <span className="online-dot" />}
              </div>
              <div className="msg-meta">
                <span className="msg-name">{c.name}</span>
                <span className={c.bold ? "msg-prev bold" : "msg-prev"}>{c.preview}</span>
              </div>
              {c.muted && <i className="bi bi-bell-slash msg-mute" />}
              {c.unread && <span className="unread-dot" />}
            </div>
          ))}
        </div>
      </aside>

      {/* right pane */}
      <main className="msg-main">
        {!active ? (
          <div className="msg-empty">
            <div className="msg-empty-circle">
              <i className="bi bi-send" />
            </div>
            <h3>Your messages</h3>
            <p>Send a message to start a chat.</p>
            <button>Send message</button>
          </div>
        ) : (
          <div className="msg-thread">
            <div className="msg-thread-head">
              <button className="msg-back" onClick={() => setActiveId(null)} aria-label="Back">
                <i className="bi bi-chevron-left" />
              </button>
              <img src={active.img} alt="" />
              <b>{active.name}</b>
            </div>
            <div className="msg-bubbles">
              {(threads[active.id] || [{ from: "them", text: active.preview }]).map((m, i) => (
                <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
              ))}
            </div>
            <form className="msg-send" onSubmit={send}>
              <input
                placeholder={`Message ${active.name}...`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
