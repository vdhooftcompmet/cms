import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MessageBoard() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                // Fetch index.json to get the list of message files
                const response = await fetch('/messages/index.json');
                const fileNames = await response.json();

                // Fetch each message file listed in index.json
                const messagePromises = fileNames.map((fileName) =>
                    fetch(`/messages/${fileName}`).then((res) => res.json())
                );

                const loadedMessages = await Promise.all(messagePromises);

                // Sort messages by timestamp (descending)
                const sortedMessages = loadedMessages.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                );

                setMessages(sortedMessages);
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        };

        loadMessages();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Message Board</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {messages.map((message, index) => (
                    <li
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '15px',
                            marginBottom: '10px',
                        }}
                    >
                        <Link
                            to={`/message/${encodeURIComponent(message.title)}`}
                            style={{
                                textDecoration: 'none',
                                color: 'blue',
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            {message.title}
                        </Link>
                        <p style={{ margin: '5px 0', color: '#555' }}>
                            By {message.author} on {new Date(message.timestamp).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MessageBoard;
