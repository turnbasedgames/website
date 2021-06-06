import React, { useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';

import { onMove } from '../../../models/room';

interface Props {
  githubURL: string,
  commitSHA: string
}

type RoomURLParams = {
  roomId: string
};

const IFrame = ({ githubURL, commitSHA }: Props) => {
  const { roomId } = useParams<RoomURLParams>();
  const [owner, repo] = new URL(githubURL).pathname.match(/[^/]+/g) as RegExpMatchArray;
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${commitSHA}/FrontEnd/index.html`;
  console.log(url)

  useEffect(() => {
    async function sendMessage(data: JSON) {
      const roomRaw = await onMove(roomId, data);
      console.log(roomRaw);
    }
    const handler = (event: MessageEvent<any>) => {
      if (event.origin === 'null') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = JSON.parse(event.data);
        sendMessage(data);
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <iframe
      title="gameFrame"
      sandbox="allow-scripts"
      src={url
        .replace('raw.githubusercontent', 'rawcdn.githack')}
      id="gameFrame"
      style={{ height: 'calc(100vh - 50px)', width: '100%', border: 'none' }}
    />
  );
};

export default IFrame;
