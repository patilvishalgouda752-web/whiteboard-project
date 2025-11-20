
import { Tool, User } from './types';

export const DEFAULT_TOOL = Tool.PEN;
export const DEFAULT_COLOR = '#000000';
export const DEFAULT_BRUSH_SIZE = 5;
export const DEFAULT_HIGHLIGHTER_SIZE = 20;

export const MOCK_USERS: User[] = [
  { id: 'user-2', name: 'Alice', color: '#34D399', position: { x: 200, y: 200 } },
  { id: 'user-3', name: 'Bob', color: '#F87171', position: { x: 400, y: 400 } },
];
