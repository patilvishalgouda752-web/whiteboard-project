import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({ children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

export const MousePointer = () => (
  <Icon>
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="M13 13l6 6" />
  </Icon>
);

export const Pen = () => (
  <Icon>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </Icon>
);

export const Highlighter = () => (
    <Icon>
        <path d="m19 14-8.5-8.5a1.5 1.5 0 0 0-2.12 0L3 11v6h6l5.5-5.5Z"/>
        <path d="m16.5 5.5 2.12 2.12"/>
    </Icon>
);

export const Eraser = () => (
  <Icon>
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
    <path d="M22 21H7" />
    <path d="m5 12 5 5" />
  </Icon>
);

export const Rectangle = () => <Icon><rect width="18" height="18" x="3" y="3" rx="2" /></Icon>;

export const Circle = () => <Icon><circle cx="12" cy="12" r="10" /></Icon>;

export const Arrow = () => (
    <Icon>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </Icon>
);

export const Text = () => (
    <Icon>
        <path d="M17 6.1H7" />
        <path d="M21 12.1H3" />
        <path d="M15 18.1H9" />
    </Icon>
);


export const Users = () => (
  <Icon>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const MessageSquare = () => (
  <Icon>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

export const Save = () => (
  <Icon>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </Icon>
);

export const Upload = () => (
  <Icon>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </Icon>
);

export const Sun = () => (
    <Icon>
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </Icon>
);

export const Moon = () => (
    <Icon>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
);

export const Send = () => (
    <Icon>
        <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </Icon>
);

export const ChevronRight = () => (
    <Icon>
        <path d="m9 18 6-6-6-6" />
    </Icon>
);