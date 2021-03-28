import React, { useEffect, useState } from 'react';

interface Props {
    src: string
}

const IFrame = ( {src}: Props ) => {

    return (
        <iframe sandbox="allow-scripts allow-cross-origin" src={src} id="gameFrame" style={{ height: "500px" }}>
        </iframe>
    );
};

export default IFrame;
