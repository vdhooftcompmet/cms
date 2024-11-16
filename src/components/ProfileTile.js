import React from 'react';
import { Link } from 'react-router-dom';

function ProfileTile({ profile }) {
    return (
        <div
            className="profile-tile"
            style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                margin: '20px',
                textAlign: 'center',
                maxWidth: '300px',
                display: 'inline-block',
            }}
        >
            <img
                src={`/images/${profile.profilePicture}`}
                alt={`${profile.name}'s profile`}
                style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    marginBottom: '10px',
                }}
            />
            <h2 style={{ margin: '10px 0' }}>{profile.name}</h2>
            <p>{profile.role}</p>
            <Link
                to={`/profile/${encodeURIComponent(profile.name)}`}
                style={{
                    color: 'blue',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    marginTop: '10px',
                }}
            >
                View Profile
            </Link>
        </div>
    );
}

export default ProfileTile;