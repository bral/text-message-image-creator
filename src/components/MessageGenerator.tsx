import React from "react";
import "./MessageGenerator.css";

interface Message {
  text: string;
  isReceiver: boolean;
  timestamp: string;
}

interface MessageGeneratorProps {
  messages: Message[];
}

const MessageGenerator: React.FC<MessageGeneratorProps> = ({ messages }) => {
  return (
    <div className="message-generator">
      <div className="iphone-container">
        <div className="status-bar">
          <div className="status-left">
            <span className="time">9:41</span>
          </div>
          <div className="status-right">
            <span className="signal">●●●●</span>
            <span className="wifi">●●●</span>
            <span className="battery">100%</span>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.isReceiver ? "receiver" : "sender"
              }`}
            >
              <div className="message-bubble">
                <div className="message-text">{message.text}</div>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageGenerator;
