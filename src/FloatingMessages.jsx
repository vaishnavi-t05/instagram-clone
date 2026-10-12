import React from "react";
import { createPortal } from "react-dom";
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

  return createPortal(
    <div
      onClick={() => navigate("/messages")}
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 1500,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#262626",
        color: "#fff",
        borderRadius: 999,
        padding: "12px 20px 12px 16px",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <span style={{ position: "relative", display: "inline-flex" }}>
        <i className="bi bi-send" style={{ fontSize: 24 }} />
        {unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: -8,
              right: -10,
              minWidth: 20,
              height: 20,
              padding: "0 5px",
              borderRadius: 999,
              background: "#ff3040",
              color: "#fff",
              fontSize: 12,
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
      <b style={{ fontSize: 17, fontWeight: 600 }}>Messages</b>
      <span style={{ display: "flex", alignItems: "center" }}>
        {faces.map((c, i) => (
          <img
            key={c.id}
            src={c.img}
            alt=""
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #262626",
              marginLeft: i === 0 ? 6 : -12,
            }}
          />
        ))}
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#363636",
            color: "#fff",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -12,
            border: "2px solid #262626",
          }}
        >
          •••
        </span>
      </span>
    </div>,
    document.body
  );
};

export default FloatingMessages;
