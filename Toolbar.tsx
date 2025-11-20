
import React from 'react';
import { Tool } from '../types';
import { MousePointer, Pen, Highlighter, Eraser, Rectangle, Circle, Arrow, Text, Save, Upload } from './Icon';
import { DEFAULT_BRUSH_SIZE, DEFAULT_HIGHLIGHTER_SIZE } from '../constants';

interface ToolbarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  onSave: () => void;
  onLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const tools = [
  { id: Tool.CURSOR, icon: <MousePointer />, name: 'Cursor' },
  { id: Tool.PEN, icon: <Pen />, name: 'Pen' },
  { id: Tool.HIGHLIGHTER, icon: <Highlighter />, name: 'Highlighter' },
  { id: Tool.ERASER, icon: <Eraser />, name: 'Eraser' },
  { id: Tool.RECTANGLE, icon: <Rectangle />, name: 'Rectangle' },
  { id: Tool.CIRCLE, icon: <Circle />, name: 'Circle' },
  { id: Tool.ARROW, icon: <Arrow />, name: 'Arrow' },
  { id: Tool.TEXT, icon: <Text />, name: 'Text' },
];

const colors = ['#000000', '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'];

const ToolButton: React.FC<{
  toolId: Tool;
  name: string;
  activeTool: Tool;
  onClick: (tool: Tool) => void;
  children: React.ReactNode;
}> = ({ toolId, name, activeTool, onClick, children }) => (
  <button
    title={name}
    onClick={() => onClick(toolId)}
    className={`p-2 rounded-lg transition-colors ${
      activeTool === toolId
        ? 'bg-blue-500 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  setActiveTool,
  color,
  setColor,
  brushSize,
  setBrushSize,
  onSave,
  onLoad,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleToolChange = (tool: Tool) => {
    setActiveTool(tool);
    if (tool === Tool.HIGHLIGHTER) {
      setBrushSize(DEFAULT_HIGHLIGHTER_SIZE);
    } else if (tool === Tool.PEN || tool === Tool.ERASER) {
      setBrushSize(DEFAULT_BRUSH_SIZE);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {tools.map((tool) => (
        <ToolButton key={tool.id} toolId={tool.id} name={tool.name} activeTool={activeTool} onClick={handleToolChange}>
          {tool.icon}
        </ToolButton>
      ))}
      <div className="w-px h-8 bg-gray-200 dark:bg-gray-600 mx-2"></div>
      
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => setColor(c)}
          className={`w-6 h-6 rounded-full border-2 transition-transform transform hover:scale-110 ${
            color === c ? 'border-blue-500' : 'border-transparent'
          }`}
          style={{ backgroundColor: c }}
        />
      ))}
      <div className="w-px h-8 bg-gray-200 dark:bg-gray-600 mx-2"></div>
      {(activeTool === Tool.PEN || activeTool === Tool.HIGHLIGHTER || activeTool === Tool.ERASER) && (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <label htmlFor="brush-size" className="text-sm">Size:</label>
          <input
            id="brush-size"
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
        </div>
      )}
      <div className="w-px h-8 bg-gray-200 dark:bg-gray-600 mx-2"></div>
      <button
        onClick={onSave}
        title="Save Board"
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
      >
        <Save />
      </button>
      <button
        onClick={handleUploadClick}
        title="Load Board"
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
      >
        <Upload />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onLoad}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};
