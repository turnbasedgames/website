import axios from 'axios';

import { Game } from './game';
import { User } from './user';

export interface Room {
  id: string
  game: Game,
  leader: User,
}

export const joinRoom = async (roomId: String) => {
  const res = await axios.post(`/api/room/${roomId}/join`);
  return res.data.room;
};

export const createRoom = async (gameId: String) => {
  const res = await axios.post('/api/room', { game: gameId });
  return res.data.room;
};

export const getRooms = async (gameId: String) => {
  const res = await axios.get('/api/room', { params: { gameId } });
  return res.data.rooms;
};

export const getRoom = async (roomId: String) => {
  const res = await axios.get(`/api/room/${roomId}`);
  return res.data.room;
};
