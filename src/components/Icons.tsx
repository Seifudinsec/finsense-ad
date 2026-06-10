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
    {/* Filled, rounded cloud for clearer silhouette */}
    <path d="M19.36 10.04A6.5 6.5 0 0012 4a6.5 6.5 0 00-7.36 6.04A4.5 4.5 0 004 20.5h13a4.5 4.5 0 002.36-8.46z" fill={color} />
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

export const FacebookIcon: React.FC<IconProps> = ({ size = 18, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3.5l.5-4H15V6a1 1 0 011-1h2V2z" fill={color} />
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ size = 18, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3c-2.5 0-4.5 2.26-4.5 5.05 0 .4.05.79.15 1.16C7.72 8.95 4.1 6.86 1.67 3.9c-.44.76-.69 1.64-.69 2.58 0 1.78.9 3.36 2.27 4.28a4.48 4.48 0 01-2.04-.58v.06c0 2.5 1.75 4.6 4.07 5.08a4.52 4.52 0 01-2.03.08c.57 1.78 2.22 3.08 4.17 3.12A9.03 9.03 0 012 19.54 12.74 12.74 0 008.14 21c7.72 0 11.95-6.59 11.95-12.29 0-.19 0-.37-.01-.55A8.18 8.18 0 0023 3z" fill={color} />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="1.4" fill="none" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.4" fill="none" />
    <circle cx="17.5" cy="6.5" r="0.8" fill={color} />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ size = 18, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke={color} strokeWidth="1.2" fill="none" />
    <path d="M6 9H4v8h2V9zM5 6.5a1 1 0 110-2 1 1 0 010 2zM10 9h2v1.2c.3-.6 1-1.2 2.2-1.2 2.1 0 2.8 1.4 2.8 3.3V17h-2v-3.2c0-.8 0-1.8-1.2-1.8-1.2 0-1.4.9-1.4 1.8V17h-2V9z" fill={color} />
  </svg>
);
