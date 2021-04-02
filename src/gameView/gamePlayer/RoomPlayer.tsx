import React, { useEffect, useState } from 'react';
import {
  Theme, withStyles, createStyles, Typography,
} from '@material-ui/core';
import {
  useParams,
} from 'react-router-dom';

import IFrame from './IFrame/IFrame';
import {
  getRoom, Room,
} from '../../models/room';

type Props = {
  classes: any
};

type RoomURLParams = {
  roomId: string
};

const RoomPlayer = ({ classes }: Props) => {
  const { roomId } = useParams<RoomURLParams>();
  const [room, setRoom] = useState<null | Room>(null);

  useEffect(() => {
    async function setupRoom() {
      const roomRaw = await getRoom(roomId);
      setRoom(roomRaw);
    }

    setupRoom();
  }, []);

  if (room) {
    return (
      <div className={classes.root}>
        <Typography variant="h4">{`Room: ${room.id}`}</Typography>
        <IFrame githubURL={room.game.githubURL} commitSHA={room.game.commitSHA} />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <h1>Loading...</h1>
    </div>
  );
};

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto 0 auto',
  },
  button: {
    margin: '5px',
  },
});

export default withStyles(styles)(RoomPlayer);
