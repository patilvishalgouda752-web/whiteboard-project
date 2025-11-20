import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Toolbar } from './components/Toolbar';
import { UserPresence } from './components/UserPresence';
import { ChatSidebar } from './components/ChatSidebar';
import { Tool, DrawingAction, Point, User, ChatMessage } from './types';
import { DEFAULT_TOOL, DEFAULT_COLOR, DEFAULT_BRUSH_SIZE, MOCK_USERS } from './constants';
import { Moon, Sun } from './components/Icon';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>(DEFAULT_TOOL);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [brushSize, setBrushSize] = useState<number>(DEFAULT_BRUSH_SIZE);
  const [drawingHistory, setDrawingHistory] = useState<DrawingAction[]>([]);
  const [currentAction, setCurrentAction] = useState<DrawingAction | null>(null);
  
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const currentUser: User = { id: 'user-1', name: 'You', color: '#6366F1', position: { x: 0, y: 0 } };
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = isDarkMode ? '#1f2937' : '#ffffff'; // gray-800 for dark, white for light
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    const allActions = [...drawingHistory];
    if (currentAction) {
      allActions.push(currentAction);
    }
    
    allActions.forEach(action => {
      context.strokeStyle = action.color;
      context.lineWidth = action.size;
      context.fillStyle = action.color;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      if(action.tool === Tool.HIGHLIGHTER) {
          context.globalAlpha = 0.3;
      } else {
          context.globalAlpha = 1.0;
      }

      context.beginPath();
      switch (action.tool) {
        case Tool.PEN:
        case Tool.HIGHLIGHTER:
        case Tool.ERASER:
          if(action.tool === Tool.ERASER) context.strokeStyle = isDarkMode ? '#1f2937' : '#ffffff';
          action.points.forEach((point, index) => {
            if (index === 0) {
              context.moveTo(point.x, point.y);
            } else {
              context.lineTo(point.x, point.y);
            }
          });
          context.stroke();
          break;
        case Tool.RECTANGLE:
          if (action.points.length === 2) {
            const [start, end] = action.points;
            context.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
          }
          break;
        case Tool.CIRCLE:
          if (action.points.length === 2) {
            const [start, end] = action.points;
            const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
            context.arc(start.x, start.y, radius, 0, 2 * Math.PI);
            context.stroke();
          }
          break;
        case Tool.ARROW:
          if (action.points.length === 2) {
            const [start, end] = action.points;
            const headlen = 10 + action.size;
            const angle = Math.atan2(end.y - start.y, end.x - start.x);
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.lineTo(end.x - headlen * Math.cos(angle - Math.PI / 6), end.y - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(end.x, end.y);
            context.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 6), end.y - headlen * Math.sin(angle + Math.PI / 6));
            context.stroke();
          }
          break;
        case Tool.TEXT:
            if(action.text && action.points.length > 0) {
                context.font = `${action.size * 3}px Arial`;
                context.fillText(action.text, action.points[0].x, action.points[0].y);
            }
            break;
      }
    });
    context.globalAlpha = 1.0;
  }, [drawingHistory, currentAction, isDarkMode]);

  useEffect(redrawCanvas, [redrawCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redrawCanvas();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [redrawCanvas]);


  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === Tool.CURSOR) return;
    const { offsetX, offsetY } = event.nativeEvent;
    
    if(activeTool === Tool.TEXT) {
        const text = prompt("Enter text:");
        if (text) {
            const newAction: DrawingAction = {
                id: Date.now().toString(),
                tool: Tool.TEXT,
                color,
                size: brushSize,
                points: [{ x: offsetX, y: offsetY }],
                text,
            };
            setDrawingHistory(prev => [...prev, newAction]);
        }
        return;
    }

    setIsDrawing(true);
    const newAction: DrawingAction = {
      id: Date.now().toString(),
      tool: activeTool,
      color,
      size: brushSize,
      points: [{ x: offsetX, y: offsetY }],
    };
    setCurrentAction(newAction);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    // Simulate other users moving
    setUsers(prevUsers => prevUsers.map(u => ({
        ...u,
        position: {
            x: u.position.x + (Math.random() - 0.5) * 5,
            y: u.position.y + (Math.random() - 0.5) * 5
        }
    })));

    if (!isDrawing || !currentAction) return;

    setCurrentAction(prev => {
        if (!prev) return null;
        if (prev.tool === Tool.PEN || prev.tool === Tool.HIGHLIGHTER || prev.tool === Tool.ERASER) {
            return { ...prev, points: [...prev.points, { x: offsetX, y: offsetY }] };
        } else if (prev.tool === Tool.RECTANGLE || prev.tool === Tool.CIRCLE || prev.tool === Tool.ARROW) {
            return { ...prev, points: [prev.points[0], { x: offsetX, y: offsetY }] };
        }
        return prev;
    });
  };

  const handleMouseUp = () => {
    if (currentAction) {
      setDrawingHistory(prev => [...prev, currentAction]);
    }
    setIsDrawing(false);
    setCurrentAction(null);
  };
  
  const handleSave = () => {
    const data = JSON.stringify(drawingHistory);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'whiteboard-state.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const loadedHistory = JSON.parse(result) as DrawingAction[];
          setDrawingHistory(loadedHistory);
        }
      } catch (error) {
        console.error("Failed to load or parse file:", error);
        alert("Invalid file format.");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };
  
  const handleSendMessage = (message: string) => {
      const newMessage: ChatMessage = {
          id: Date.now().toString(),
          userId: currentUser.id,
          userName: currentUser.name,
          userColor: currentUser.color,
          message,
          timestamp: Date.now(),
      };
      setChatMessages(prev => [...prev, newMessage]);

      // Simulate a reply
      setTimeout(() => {
          const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
          const reply: ChatMessage = {
              id: (Date.now() + 1).toString(),
              userId: randomUser.id,
              userName: randomUser.name,
              userColor: randomUser.color,
              message: "That's a great point!",
              timestamp: Date.now(),
          };
          setChatMessages(prev => [...prev, reply]);
      }, 1500);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white dark:bg-gray-800">
      <Toolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        onSave={handleSave}
        onLoad={handleLoad}
      />
      <UserPresence users={users} />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`cursor-crosshair ${activeTool === Tool.CURSOR ? 'cursor-default' : ''}`}
      />
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute bottom-4 left-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
        title="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun /> : <Moon />}
      </button>
      <ChatSidebar messages={chatMessages} currentUser={currentUser} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;