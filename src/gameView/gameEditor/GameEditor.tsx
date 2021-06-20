import React, { useEffect, useState, useContext } from 'react';
import classes from './GameEditor.module.css';
import { UserContext } from '../../models/user';

const GameEditor = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setupFileSystem() {
      console.log('user:', user);
      if (!user) {
        return;
      }
      console.log(user.firebaseId);

      setLoading(false);
    }

    setupFileSystem();
  }, [user]);

  return (
    <div className={classes.root}>
      {loading ? <h1 style={{ color: 'white' }}>Loading :D</h1>
        : <h1 style={{ color: 'white' }}>Hello</h1>}
    </div>
  );
};

export default GameEditor;
