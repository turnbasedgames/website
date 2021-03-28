import React, { useEffect, useState } from 'react';
import {
  Theme, withStyles, createStyles, Typography, List, Button,
} from '@material-ui/core';
import {
  useParams,
} from 'react-router-dom';

import { Game, getGame } from '../../models/game';
import IFrame from './IFrame/IFrame';
import { createRoom, getRooms, Room } from '../../models/room';

type Props = {
  classes: any
};

type GamesURLParams = {
  gameId: string
};

const GamePlayer = ({ classes }: Props) => {
  const { gameId } = useParams<GamesURLParams>();
  const [game, setGame] = useState<null | Game>(null);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    async function setupGame() {
      const gameRaw = await getGame(gameId);
      setGame(gameRaw);
    }
    async function setupRooms() {
      const roomsRaw = await getRooms(gameId);
      setRooms(roomsRaw);
    }
    setupGame();
    setupRooms();
  }, []);

  if (game) {
    const gitHubInfo = `GitHub Info: ${game.githubURL} ${game.commitSHA}`;
    // TODO: display rooms and way to join room
    // TODO: form to create a room
    return (
      <div className={classes.root}>
        <Typography variant="h3">
          {game.name}
        </Typography>
        <Typography variant="body1">{game.description}</Typography>
        <Typography variant="body1">{gitHubInfo}</Typography>
        <Button
          variant="contained"
          disableElevation
          className={classes.button}
          onClick={async (ev) => {
            ev.preventDefault();
            const room = await createRoom(game.id);
            console.log('room created', room);
          }}
        >
          Create Room
        </Button>
        {rooms.length > 0
        && (
        <List>
          hello
        </List>
        )}
        <IFrame githubURL={game.githubURL} commitSHA={game.commitSHA} />
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

export default withStyles(styles)(GamePlayer);
