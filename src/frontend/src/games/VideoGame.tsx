import React from 'react';

const VideoGame: React.FC = () => {
    return (
        <div>
            <h1>Baby Learning Videos</h1>
            <iframe width="560" height="315" src="https://www.youtube.com/embed?playlist={PLAYLIST_ID}" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    );
};

export default VideoGame;