import React, { useState } from 'react';
import './VirtualInstructorComponent.css';
import customFetch from '../../Utils/customFetch';
import { IoSendSharp } from "react-icons/io5";
import { PiBarbellLight } from 'react-icons/pi';

const VirtualInstructorComponent = () => {
    const [messageSend, setMessageSend] = useState('');
    const [messages, setMessages] = useState([]); 

    const sendMessage = async () => {
        if (!messageSend.trim()) return; 

        const userMessage = { message: messageSend, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await customFetch.post('/virtualInstructor/virtualInstructorChat', { message: messageSend });

            const assistantMessage = { message: response.data.message, sender: 'assistant' };
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.log(error);
        }

        setMessageSend('');
    };


    return (
        <div className="virtual-instructor-container">
            <div className="chat-icon">
                <div className="icon">
                     <PiBarbellLight size={75} color='#0099ff'/>
                </div>
            </div>
            <div className="chat-container">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'user' ? 'user-message' : 'assistant-message'}>
                            <strong>{msg.sender === 'user' ? '' : ''}</strong> {msg.message}
                        </div>
                    ))}
                </div>
            </div>
            <div className="response-container">
                <input
                    type="text"
                    value={messageSend}
                    onChange={(e) => setMessageSend(e.target.value)}
                    placeholder="Preguntale a Sigrun!"
                />
                <div className="send-icon">
                    <IoSendSharp size={50} color='#0099ff' onClick={sendMessage}/>
                </div>
            </div>
        </div>
    );
};

export default VirtualInstructorComponent;