import React, { useEffect } from 'react';

interface Props {
  src: string,
  commitSHA: string
}

const IFrame = ({ src, commitSHA }: Props) => {
  useEffect(() => {
    const handler = (event: MessageEvent<any>) => {
      if (event.origin === 'null') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = JSON.parse(event.data);
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <iframe
      title="gameFrame"
      sandbox="allow-scripts"
      src={src
        .replace('raw.githubusercontent', 'rawcdn.githack')
        .replace('master', commitSHA)}
      id="gameFrame"
      style={{ height: '500px' }}
    />
  );
};

export default IFrame;
