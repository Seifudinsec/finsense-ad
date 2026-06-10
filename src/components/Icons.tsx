import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const CheckIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const BoxIcon: React.FC<IconProps> = ({ size = 26, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8a2 2 0 00-1-1.73L12 3 4 6.27A2 2 0 003 8v8a2 2 0 001 1.73L12 21l8-3.27A2 2 0 0021 16z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M7 8.5L12 11l5-2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ size = 26, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill={color} />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 22, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M7 11V8a5 5 0 0110 0v3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const CloudIcon: React.FC<IconProps> = ({ size = 72, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 17.5A4.5 4.5 0 0016 9h-1.26A6.5 6.5 0 104 17.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ size = 26, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14a5 5 0 007.07 0l3.54-3.54a5 5 0 00-7.07-7.07L10 6.93" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M14 10a5 5 0 00-7.07 0L3.39 14.54a5 5 0 007.07 7.07L14 17.07" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 18, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.4" fill="none" />
    <path d="M2 12h20" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 2c2.5 3 2.5 17 0 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 16, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.4" fill="none" />
    <path d="M22 6l-10 7L2 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 16, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.86 19.86 0 01-3.07-8.63A2 2 0 015.11 2h3a2 2 0 012 1.72c.15 1.21.44 2.39.88 3.5a2 2 0 01-.45 2.11L9.91 9.91a12.57 12.57 0 006 6l1.58-1.58a2 2 0 012.11-.45c1.11.44 2.29.73 3.5.88A2 2 0 0122 16.92z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ size = 16, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10c0 7-9 11-9 11s-9-4-9-11a9 9 0 1118 0z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="12" cy="10" r="2.5" fill={color} />
  </svg>
);
