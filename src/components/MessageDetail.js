import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MessageDetail() {
    const { title } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const loadMessage = async () => {
            try {
                // Fetch index.json to get the list of message files
                const response = await fetch('/messages/index.json');
                const fileNames = await response.json();

                // Fetch each message file and find the one matching the title
                const messagePromises = fileNames.map((fileName) =>
                    fetch(`/messages/${fileName}`).then((res) => res.json())
                );

                const loadedMessages = await Promise.all(messagePromises);

                const foundMessage = loadedMessages.find(
                    (msg) => msg.title === decodeURIComponent(title)
                );

                setMessage(foundMessage);
            } catch (error) {
                console.error('Error loading message detail:', error);
            }
        };

        loadMessage();
    }, [title]);

    if (!message) {
        return <p>Loading message...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue', display: 'block', marginBottom: '20px' }}>
                ← Back to Messages
            </Link>
            <h1>{message.title}</h1>
            <p>
                <strong>By:</strong> {message.author}
            </p>
            <p>
                <strong>Date:</strong> {new Date(message.timestamp).toLocaleString()}
            </p>
            <p>{message.content}</p>
        </div>
    );
}

export default MessageDetail;
