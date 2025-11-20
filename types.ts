
export enum Tool {
  CURSOR = 'cursor',
  PEN = 'pen',
  HIGHLIGHTER = 'highlighter',
  ERASER = 'eraser',
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  ARROW = 'arrow',
  TEXT = 'text',
}

export interface Point {
  x: number;
  y: number;
}

export type Path = Point[];

export interface DrawingAction {
  id: string;
  tool: Tool;
  color: string;
  size: number;
  points: Path;
  text?: string;
}

export interface User {
  id: string;
  name: string;
  color: string;
  position: Point;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  message: string;
  timestamp: number;
}
