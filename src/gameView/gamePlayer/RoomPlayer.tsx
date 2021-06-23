import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import { io } from 'socket.io-client';

import IFrame from './IFrame/IFrame';
import {
  getRoom, getRoomUsers, Room, RoomState,
} from '../../models/room';
import { User } from '../../models/user';
import classes from './RoomPlayer.module.css';

type RoomURLParams = {
  roomId: string
};

type WatchRoomRes = {
  error: string
};

type UnwatchRoomRes = {
  error: string
};

const socket = io();

const RoomPlayer = () => {
  const { roomId } = useParams<RoomURLParams>();
  const [room, setRoom] = useState<null | Room>(null);
  const [latestState, setLatestState] = useState<null | RoomState>();
  const [users, setUsers] = useState<User[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // TODO: Why is "iframe received message:" being printed twice?
  // is the iframe getting loaded multiple times?
  console.log('latestState updated', latestState);

  const setLatestStateWithContender = (contender: RoomState) => {
    console.log('setlateststatewithcontender', contender);
    setLatestState((prevLatestState) => {
      console.log('prevlateststate', prevLatestState);
      console.log(iframeRef);
      if (!prevLatestState || (prevLatestState.version < contender.version)) {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          console.log('sending message to iframe');
          iframeRef.current.contentWindow.postMessage({
            event: 'stateChanged',
            latestState: contender,
          }, '*');
        }
        return contender;
      }
      return prevLatestState;
    });
  };

  useEffect(() => {
    async function setupRoom() {
      const roomRaw = await getRoom(roomId);
      setRoom(roomRaw);
      setLatestStateWithContender(roomRaw.latestState);
    }
    async function setupUsers() {
      const usersRaw = await getRoomUsers(roomId);
      setUsers(usersRaw);
    }

    setupRoom();
    setupUsers();
  }, []);

  useEffect(() => {
    socket.emit('watchRoom', { roomId }, (res: null | WatchRoomRes) => {
      if (res) {
        console.log('error trying to watch room', res.error);
      }
    });
    socket.on('room:latestState', setLatestStateWithContender);

    return () => {
      socket.emit('unwatchRoom', { roomId }, (res: null | UnwatchRoomRes) => {
        if (res) {
          console.log('error trying to unwatch room', res.error);
        }
      });
      socket.off('room:latestState', setLatestStateWithContender);
    };
  }, []);

  if (room) {
    return (
      <div className={classes.container}>
        <h3>{room.game.name}</h3>
        <h5 style={{ color: 'white' }}>{`Room: ${room.id}`}</h5>
        <IFrame
          githubURL={room.game.githubURL}
          commitSHA={room.game.commitSHA}
          iframeRef={iframeRef}
        />
        <h5 style={{ color: 'white' }}>
          {`${users.length} Users in Room`}
        </h5>
        {users.map((user: User) => (
          <p
            key={user.id}
          >
            {`User-${user.id}`}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default RoomPlayer;
