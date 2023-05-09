import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function Chat({ thisRoom }) {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    setRoom(thisRoom);
    socketRef.current = io.connect("http://localhost:3001");
    return () => {
      socketRef.current.disconnect();
    };
  }, [thisRoom]);

  useEffect(() => {
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    socketRef.current.on("user_join", function (data) {
      setChat([
        ...chat,
        { name: "ChatBot", message: `${data} has joined the chat` },
      ]);
    });
    socketRef.current.on("user_disconnect", function (data) {
      setChat([
        ...chat,
        { name: "ChatBot", message: `${data} has left the chat` },
      ]);
    });

    return () => {
      socketRef.current.off("message");
      socketRef.current.off("user-join");
    };
  }, [chat]);

  const userjoin = (name, room) => {
    socketRef.current.emit("user_join", name, room);
  };

  const onMessageSubmit = (e) => {
    let msgEle = document.getElementById("message");
    setState({ ...state, [msgEle.name]: msgEle.value });
    socketRef.current.emit("message", {
      name: state.name,
      message: msgEle.value,
      room: room,
    });
    e.preventDefault();
    setState({ message: "", name: state.name });
    msgEle.value = "";
    msgEle.focus();
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div className="chat-log" key={index}>
        <h3>
          <span className="chat-name">{name}</span>: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  useEffect(() => {
    if (chat.length > 0) {
      const msgElem = document.getElementById("render-chat");
      msgElem.scrollTop = msgElem.scrollHeight;
    }
  }, [renderChat]);

  return (
    <div>
      {state.name && room && (
        <div className="chat-card">
          <h2>Chat Log for Room {room}</h2>
          <div className="render-chat" id="render-chat">
            {renderChat()}
          </div>
          <form onSubmit={onMessageSubmit}>
            <h1>Messenger</h1>
            <div className="chat-msg">
              <input
                name="message"
                id="message"
                variant="outlined"
                label="Message"
              />
              <button className="chat-btn">Send</button>
            </div>
          </form>
          <br />
        </div>
      )}

      {!state.name && (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setState({ name: document.getElementById("username_input").value });
            userjoin(document.getElementById("username_input").value, room);
          }}
        >
          <div className="chat-form-group">
            <label>
              User Name:
              <br />
              <input id="username_input" />
            </label>
            <br />
          </div>
          <button className="join-btn" type="submit">
            {" "}
            Click to join
          </button>
        </form>
      )}
    </div>
  );
}
