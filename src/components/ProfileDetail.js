import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ProfileDetail({ profiles }) {
    const { name } = useParams();
    const profile = profiles.find((p) => p.name === decodeURIComponent(name));

    if (!profile) {
        return <p>Profile not found.</p>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Link
                to="/"
                style={{
                    textDecoration: 'none',
                    color: 'blue',
                    display: 'block',
                    marginBottom: '20px',
                }}
            >
                ← Back to Profiles
            </Link>
            <h1>{profile.name}</h1>
            <img
                src={`/images/${profile.profilePicture}`}
                alt={`${profile.name}'s profile`}
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    marginBottom: '20px',
                }}
            />
            <p>
                <strong>Role:</strong> {profile.role}
            </p>
            <h2>Links</h2>
            <ul style={{ paddingLeft: '20px' }}>
                {profile.links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'blue', textDecoration: 'none' }}
                        >
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
            {profile.sections.map((section, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                    {section.images && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {section.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={`/images/${img}`}
                                    alt={`Section ${section.title} image`}
                                    style={{
                                        maxWidth: '100%',
                                        borderRadius: '10px',
                                        marginTop: '10px',
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProfileDetail;