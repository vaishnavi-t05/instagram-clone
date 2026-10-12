import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CHATS } from "./chatData";

// Floating Messages pill (bottom-right) with the same unread
// notification count as the messages inbox.
const FloatingMessages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // you're already in messages — nothing to open
  if (location.pathname === "/messages") return null;

  const unread = CHATS.filter((c) => c.unread).length;
  const faces = CHATS.slice(0, 3);

  return (
    <div
      onClick={() => navigate("/messages")}
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 1500,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#262626",
        color: "#fff",
        borderRadius: 999,
        padding: "10px 16px 10px 14px",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <span style={{ position: "relative", display: "inline-flex" }}>
        <i className="bi bi-send" style={{ fontSize: 22 }} />
        {unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: -7,
              right: -9,
              minWidth: 18,
              height: 18,
              padding: "0 4px",
              borderRadius: 999,
              background: "#ff3040",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unread}
          </span>
        )}
      </span>
      <b style={{ fontSize: 15 }}>Messages</b>
      <span style={{ display: "flex", alignItems: "center" }}>
        {faces.map((c, i) => (
          <img
            key={c.id}
            src={c.img}
            alt=""
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #262626",
              marginLeft: i === 0 ? 0 : -10,
            }}
          />
        ))}
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#363636",
            color: "#fff",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -10,
            border: "2px solid #262626",
          }}
        >
          •••
        </span>
      </span>
    </div>
  );
};

export default FloatingMessages;
