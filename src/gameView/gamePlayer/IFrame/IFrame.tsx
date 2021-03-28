import React from 'react';

interface Props {
  src: string
}

const IFrame = ({ src }: Props) => <iframe title="gameFrame" sandbox="allow-scripts" src={src} id="gameFrame" style={{ height: '500px' }} />;

export default IFrame;
