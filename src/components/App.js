import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProfileTile from './ProfileTile';
import ProfileDetail from './ProfileDetail';
import MessageBoard from './MessageBoard';
import MessageDetail from './MessageDetail';

function App() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        // Fetch the profiles index.json to get the list of user files
        fetch('/profiles/index.json')
            .then((response) => response.json())
            .then(async (fileNames) => {
                // Fetch each user's JSON file
                const profilePromises = fileNames.map((fileName) =>
                    fetch(`/profiles/${fileName}`).then((res) => res.json())
                );
                const profilesData = await Promise.all(profilePromises);
                setProfiles(profilesData);
            })
            .catch((error) => console.error('Error fetching profiles:', error));
    }, []);

    return (
        <Router>
            <div>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Message Board & Profile Directory</h1>
                <Routes>
                    {/* Homepage: Message Board + Profile Directory */}
                    <Route
                        path="/"
                        element={
                            <div>
                                {/* Message Board */}
                                <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
                                    <h2 style={{ textAlign: 'center' }}>Message Board</h2>
                                    <MessageBoard />
                                </div>

                                {/* Profile Directory */}
                                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {profiles.map((profile, index) => (
                                        <ProfileTile key={index} profile={profile} />
                                    ))}
                                </div>
                            </div>
                        }
                    />
                    {/* Profile Detail Route */}
                    <Route path="/profile/:name" element={<ProfileDetail profiles={profiles} />} />

                    {/* Message Detail Route */}
                    <Route path="/message/:title" element={<MessageDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
