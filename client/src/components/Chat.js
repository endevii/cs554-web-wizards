import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default function Chat({ thisRoom }) {
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState('');

  const socketRef = useRef();

  useEffect(() => {
    setRoom(thisRoom);
    socketRef.current = io.connect('http://localhost:3001');
    return () => {
      socketRef.current.disconnect();
    };
  }, [thisRoom]);

  useEffect(() => {
    socketRef.current.on('message', ({ name, message }) => {
      console.log('The server has sent some data to all clients');
      setChat([...chat, { name, message }]);
    });
    socketRef.current.on('user_join', function (data) {
      setChat([
        ...chat,
        { name: 'ChatBot', message: `${data} has joined the chat` },
      ]);
    });
    socketRef.current.on('user_disconnect', function (data) {
      setChat([
        ...chat,
        { name: 'ChatBot', message: `${data} has left the chat` },
      ]);
    });

    return () => {
      socketRef.current.off('message');
      socketRef.current.off('user-join');
    };
  }, [chat]);

  const userjoin = (name, room) => {
    socketRef.current.emit('user_join', name, room);
  };

  const onMessageSubmit = (e) => {
    let msgEle = document.getElementById('message');
    console.log([msgEle.name], msgEle.value);
    setState({ ...state, [msgEle.name]: msgEle.value });
    socketRef.current.emit('message', {
      name: state.name,
      message: msgEle.value,
      room: room,
    });
    e.preventDefault();
    setState({ message: '', name: state.name });
    msgEle.value = '';
    msgEle.focus();
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div>
      {state.name && room && (
        <div className='chat-card'>
          <div className='render-chat'>
            <h1>Chat Log for Room {room}</h1>
            {renderChat()}
          </div>
          <form onSubmit={onMessageSubmit}>
            <h1>Messenger</h1>
            <div>
              <input
                name='message'
                id='message'
                variant='outlined'
                label='Message'
              />
            </div>
            <button>Send Message</button>
          </form>
        </div>
      )}

      {!state.name && (
        <form
          className='form'
          onSubmit={(e) => {
            console.log(document.getElementById('username_input').value);
            e.preventDefault();
            setState({ name: document.getElementById('username_input').value });
            userjoin(document.getElementById('username_input').value, room);
            // userName.value = '';
          }}>
          <div className='form-group'>
            <label>
              User Name:
              <br />
              <input id='username_input' />
            </label>
            <br />
          </div>
          <br />

          <br />
          <br />
          <button type='submit'> Click to join</button>
        </form>
      )}
    </div>
  );
}
