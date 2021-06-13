import React from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import GameEditor from '../gameEditor';
import GameInfo from './GameInfo';
import RoomPlayer from './RoomPlayer';

const GameRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <GameInfo />
      </Route>
      <Route path={`${match.path}/room/:roomId`}>
        <RoomPlayer />
      </Route>
      <Route path={`${match.path}/edit`}>
        <GameEditor />
      </Route>
    </Switch>
  );
};

export default GameRouter;
