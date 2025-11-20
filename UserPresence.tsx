
import React from 'react';
import { User } from '../types';
import { MousePointer, Users } from './Icon';

interface UserPresenceProps {
  users: User[];
}

export const UserPresence: React.FC<UserPresenceProps> = ({ users }) => {
  const [isListOpen, setIsListOpen] = React.useState(true);

  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex -space-x-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-800"
                style={{ backgroundColor: user.color }}
                title={user.name}
              >
                {user.name.charAt(0)}
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsListOpen(!isListOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            title="Toggle User List"
          >
            <Users />
          </button>
        </div>
        {isListOpen && (
          <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-2">Active Users</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: user.color }}></div>
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {users.map((user) => (
        <div
          key={user.id}
          className="absolute z-20 flex items-center gap-1 transition-all duration-100 ease-linear pointer-events-none"
          style={{
            left: `${user.position.x}px`,
            top: `${user.position.y}px`,
            color: user.color,
          }}
        >
          <MousePointer />
          <span className="px-2 py-1 text-sm text-white rounded" style={{ backgroundColor: user.color }}>
            {user.name}
          </span>
        </div>
      ))}
    </>
  );
};
