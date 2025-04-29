// // import { useState } from "react";

// // export default function Chat() {
// //   const [messages, setMessages] = useState([
// //     { sender: "owner", text: "Hello! How can I help you?" },
// //     { sender: "user", text: "Is the property still available?" },
// //   ]);
// //   const [newMessage, setNewMessage] = useState("");

// //   const sendMessage = () => {
// //     if (!newMessage.trim()) return;
// //     setMessages([...messages, { sender: "user", text: newMessage }]);
// //     setNewMessage("");
// //   };

// //   return (
// //     <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white flex flex-col h-[80vh]">
// //       <h2 className="text-xl font-bold mb-4 text-center bg-blue-500 text-white py-2 rounded">
// //         Chat with Owner
// //       </h2>

// //       {/* Chat Messages */}
// //       <div className="flex-1 overflow-y-auto p-2 space-y-2">
// //         {messages.map((msg, index) => (
// //           <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
// //             <div
// //               className={`px-4 py-2 rounded-lg max-w-[70%] ${
// //                 msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
// //               }`}
// //             >
// //               {msg.text}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Input Field */}
// //       <div className="flex gap-2 mt-2 border-t p-2">
// //         <input
// //           type="text"
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           className="border p-2 flex-1 rounded focus:outline-none"
// //           placeholder="Type a message..."
// //         />
// //         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import axios from "axios";
// import { BASE_URL } from "../../utils/url";

// const socket = io.connect("http://localhost:3500"); // Ensure correct backend URL

// export default function Chat() {
//   const { ownerId, userId } = useParams();
//   console.log("Chat component mounted with params:", { ownerId, userId });
//   const roomId = [userId, ownerId].sort().join("_"); // Ensures unique room ID

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // Join chat room and fetch messages
//   useEffect(() => {
//     socket.emit("join_room", roomId);
//     axios
//       .get(`${BASE_URL}/messages/${roomId}`)
//       .then((response) => {
//         setMessages(response.data);
//       })
//       .catch((error) => console.error(error));

//     // Listen for new messages
//     socket.on("receive_message", (data) => {
//       console.log("Received message:", data);
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [roomId]);

//   // Send message
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       roomId,
//       senderId: userId, // Assuming userId is sending, modify as needed
//       receiverId: ownerId,
//       message: newMessage,
//       timestamp: new Date(),
//     };

//     try {
//       await axios.post(`${BASE_URL}/messages`, messageData);
//       socket.emit("send_message", messageData);
//       setMessages((prev) => [...prev, messageData]); // Update UI instantly
//       setNewMessage("");
      
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white flex flex-col h-[80vh]">
//       <h2 className="text-xl font-bold mb-4 text-center bg-blue-500 text-white py-2 rounded">
//         Chat with Seller
//       </h2>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-2 space-y-4">
//         {messages.map((msg, index) => {
//           const msgDate = new Date(msg.timestamp).toLocaleDateString();
//           const prevMsgDate = index > 0 ? new Date(messages[index - 1].timestamp).toLocaleDateString() : null;

//           return (
//             <div key={index}>
//               {/* Show Date Separator */}
//               {msgDate !== prevMsgDate && (
//                 <div className="text-center text-gray-500 text-sm my-2">{msgDate}</div>
//               )}

//               {/* Message */}
//               <div className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}>
//                 <div className={`px-4 py-2 rounded-lg max-w-[70%] ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
//                   <p>{msg.message}</p>
//                   <p className="text-xs text-gray-300 mt-1 text-right">
//                     {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>


//       {/* Input Field */}
//       <div className="flex gap-2 mt-2 border-t p-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="border p-2 flex-1 rounded focus:outline-none"
//           placeholder="Type a message..."
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../../utils/url"; // e.g., http://localhost:3500

const socket = io.connect("http://localhost:3500");

export default function OwnerChat() {
  const { ownerId, userId } = useParams();
  const roomId = [userId, ownerId].sort().join("_");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", roomId);

    axios.get(`${BASE_URL}/messages/${roomId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      senderId: userId,
      receiverId: ownerId,
      message: newMessage,
      timestamp: new Date(),
    };

    try {
      await axios.post(`${BASE_URL}/messages/`, messageData);
      socket.emit("send_message", messageData);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white flex flex-col h-[80vh]">
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-500 text-white py-2 rounded">
        Chat with Customer
      </h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {messages.map((msg, index) => {
          const date = new Date(msg.timestamp).toLocaleDateString();
          const showDate = index === 0 || date !== new Date(messages[index - 1].timestamp).toLocaleDateString();
          return (
            <div key={index}>
              {showDate && (
                <div className="text-center text-gray-500 text-sm">{date}</div>
              )}
              <div className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-lg max-w-[70%] ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
                  <p>{msg.message}</p>
                  <p className="text-xs text-gray-300 mt-1 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-2 border-t p-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="border p-2 flex-1 rounded focus:outline-none"
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
