import React from 'react';

interface Props {
    src: string
}

const IFrame = ( {src}: Props ) => {

    return (
        <iframe sandbox="allow-scripts" src={src} id="gameFrame" style={{ height: "500px" }}>
        </iframe>
    );
};

export default IFrame;
