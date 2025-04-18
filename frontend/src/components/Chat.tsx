import { useEffect, useState } from "react";
import { MessageCircle, Send, Paperclip, Image } from "lucide-react";
import Header from "@/components/Header";
import "../components/styles/Chat.css";
import Pusher from "pusher-js";

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const [userName, setUserName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  let allMessages = [];
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("4be3c15811c268e47e4b", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
    return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/api/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({
        username: userName,
        message: newMessage,
      }),
    });
    setNewMessage("");
  };

  return (
    <div className="app">
      <Header />
      <main className="chat-container">
        <div className="chat-header">
          <MessageCircle className="chat-icon" />
          <h1>Messages</h1>
        </div>
        <div className="user-name-container">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="user-name-input"
          />
        </div> 
        <div className="messages-container">
          {messages.map((message) => (
            <div
            //   key={message.id}
            //   className={`message ${message.sent ? "sent" : "received"}`}
            >
              <div className="message-content">
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="message-input-container">
          <button type="button" className="attachment-button">
            <Paperclip size={20} />
          </button>
          <button type="button" className="attachment-button">
            <Image size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button
            type="submit"
            className="send-button"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chat;
