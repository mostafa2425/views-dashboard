import React from 'react';
import bookingLogo from 'figma:asset/79489f20d7d283bb36874a830dd0926e845d7e7a.png';
import expediaLogo from 'figma:asset/4f7dc648dc48af9c9505b0c4b605e3b58ac6dd5b.png';
import agodaLogo from 'figma:asset/93c41c22262e283d24620e388c425b26c5597024.png';

interface PlatformLogoProps {
  className?: string;
}

export function GoogleLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function TripAdvisorLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#34E0A1"/>
      <path d="M7.5 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 3.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" fill="#000"/>
      <circle cx="7.5" cy="12" r="0.5" fill="#000"/>
      <path d="M16.5 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 3.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" fill="#000"/>
      <circle cx="16.5" cy="12" r="0.5" fill="#000"/>
      <path d="M12 6c-1.5 0-3 0.5-4.2 1.3C6.5 8.5 5.5 10 5 11.5c0.8-1.2 2.2-2 3.8-2 1.6 0 3 0.8 3.8 2 0.8-1.2 2.2-2 3.8-2 1.6 0 3 0.8 3.8 2-0.5-1.5-1.5-3-2.8-4.2C15.2 6.5 13.5 6 12 6z" fill="#000"/>
      <path d="M10.5 12c0 0.8-0.7 1.5-1.5 1.5s-1.5-0.7-1.5-1.5S8.2 10.5 9 10.5s1.5 0.7 1.5 1.5z" fill="#000" opacity="0.2"/>
      <path d="M16.5 12c0 0.8-0.7 1.5-1.5 1.5s-1.5-0.7-1.5-1.5 0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5z" fill="#000" opacity="0.2"/>
    </svg>
  );
}

export function BookingLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <img src={bookingLogo} alt="Booking.com" className={className} />
  );
}

export function InstagramLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="url(#instagram-gradient)"/>
      <path d="M12 8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5.77c-1.25 0-2.27-1.02-2.27-2.27 0-1.25 1.02-2.27 2.27-2.27 1.25 0 2.27 1.02 2.27 2.27 0 1.25-1.02 2.27-2.27 2.27z" fill="white"/>
      <circle cx="16.2" cy="7.8" r="0.9" fill="white"/>
      <path d="M15.5 4h-7C6.02 4 4 6.02 4 8.5v7c0 2.48 2.02 4.5 4.5 4.5h7c2.48 0 4.5-2.02 4.5-4.5v-7C20 6.02 17.98 4 15.5 4zm3.27 11.5c0 1.8-1.47 3.27-3.27 3.27h-7c-1.8 0-3.27-1.47-3.27-3.27v-7c0-1.8 1.47-3.27 3.27-3.27h7c1.8 0 3.27 1.47 3.27 3.27v7z" fill="white"/>
      <defs>
        <linearGradient id="instagram-gradient" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#FD5949"/>
          <stop offset="50%" stopColor="#D6249F"/>
          <stop offset="100%" stopColor="#285AEB"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FacebookLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1877F2"/>
      <path d="M16.5 12.75h-2.75V20h-3v-7.25H9V10h1.75V8.25c0-2.3 1.1-3.5 3.5-3.5.7 0 1.5.1 1.5.1v2.1h-1c-1 0-1.25.6-1.25 1.25V10h2.5l-.5 2.75z" fill="white"/>
    </svg>
  );
}

export function TwitterLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1DA1F2"/>
      <path d="M18.5 8.1c-.4.2-.9.3-1.4.4.5-.3.9-.8 1.1-1.4-.5.3-1 .5-1.6.6-.5-.5-1.1-.8-1.9-.8-1.4 0-2.6 1.2-2.6 2.6 0 .2 0 .4.1.6-2.2-.1-4.1-1.2-5.4-2.8-.2.4-.3.8-.3 1.3 0 .9.5 1.7 1.2 2.2-.4 0-.8-.1-1.2-.3v.1c0 1.3.9 2.3 2.1 2.6-.2.1-.5.1-.7.1-.2 0-.3 0-.5-.1.3 1.1 1.3 1.9 2.5 1.9-.9.7-2.1 1.2-3.3 1.2-.2 0-.4 0-.6-.1 1.1.7 2.5 1.2 3.9 1.2 4.7 0 7.3-3.9 7.3-7.3v-.3c.5-.4.9-.8 1.2-1.3z" fill="white"/>
    </svg>
  );
}

export function LinkedInLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#0A66C2"/>
      <path d="M8.5 18.5h-2v-9h2v9zm-1-10.2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2zm10.5 10.2h-2v-4.5c0-1.1-.4-1.9-1.4-1.9-.8 0-1.2.5-1.4 1-.1.2-.1.4-.1.7v4.7h-2v-9h2v1.2c.3-.4.8-1.1 2-1.1 1.5 0 2.6 1 2.6 3v5.9h.3z" fill="white"/>
    </svg>
  );
}

export function TikTokLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000000"/>
      <path d="M16.6 8.1c.8.6 1.8.9 2.9.9v-2c-.2 0-.5 0-.7-.1v1.6c-1.1 0-2.1-.4-2.9-.9v4.3c0 2.2-1.8 4-4 4-1.1 0-2.1-.4-2.9-1.1.9.9 2.2 1.5 3.6 1.5 2.2 0 4-1.8 4-4V7.4zm.8-2.6c-.5-.5-.8-1.2-.9-1.9v-.3h-.7c.2.9.7 1.6 1.6 2.2zM8.5 14.7c-.3-.4-.5-.9-.5-1.4 0-1.2 1-2.2 2.2-2.2.2 0 .4 0 .7.1V9c-.2 0-.5-.1-.7-.1v1.6c-.2-.1-.4-.1-.7-.1-1.2 0-2.2 1-2.2 2.2 0 .9.5 1.7 1.2 2.1z" fill="#EE1D52"/>
      <path d="M15.9 7.7c.8.6 1.8.9 2.9.9V7c-.6-.1-1.1-.4-1.5-.8-.9-.6-1.4-1.3-1.6-2.2h-1.6v9.3c0 1.2-1 2.2-2.2 2.2-.7 0-1.4-.3-1.8-.9-.7.4-1.2 1.2-1.2 2.1 0 1.2 1 2.2 2.2 2.2 2.2 0 4-1.8 4-4V7.7z" fill="#69C9D0"/>
      <path d="M18.8 7v-.4c-.6 0-1.1-.2-1.5-.5.4.4.9.7 1.5.9zM15.7 3.7c0-.1-.1-.2-.1-.4v-.3h-2.3v9.3c0 1.2-1 2.2-2.2 2.2-.4 0-.8-.1-1.2-.3.4.5 1.1.9 1.8.9 1.2 0 2.2-1 2.2-2.2V3.7h1.8zm-5.4 5.5v-.4c-.2 0-.5-.1-.7-.1-2.2 0-4 1.8-4 4 0 1.4.7 2.7 1.9 3.4-.8-.5-1.3-1.4-1.3-2.4 0-2.2 1.8-4 4-4 .3 0 .7 0 1 .1z" fill="white"/>
    </svg>
  );
}

export function ExpediaLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <img src={expediaLogo} alt="Expedia" className={className} />
  );
}

export function WegoLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill="#ED1C24"/>
      <path d="M6 8l1.5 6L9 8h2l1.5 6L14 8h2l-2.5 8h-2l-1.5-5-1.5 5h-2L4 8h2z" fill="white"/>
    </svg>
  );
}

export function AgodaLogo({ className = "w-4 h-4" }: PlatformLogoProps) {
  return (
    <img src={agodaLogo} alt="Agoda" className={className} />
  );
}

interface GetPlatformLogoProps {
  platform: string;
  className?: string;
}

export function getPlatformLogo(platform: string, className?: string) {
  const normalizedPlatform = platform.toLowerCase();
  
  if (normalizedPlatform.includes('google')) {
    return <GoogleLogo className={className} />;
  } else if (normalizedPlatform.includes('tripadvisor')) {
    return <TripAdvisorLogo className={className} />;
  } else if (normalizedPlatform.includes('booking')) {
    return <BookingLogo className={className} />;
  } else if (normalizedPlatform.includes('expedia')) {
    return <ExpediaLogo className={className} />;
  } else if (normalizedPlatform.includes('wego')) {
    return <WegoLogo className={className} />;
  } else if (normalizedPlatform.includes('agoda')) {
    return <AgodaLogo className={className} />;
  }
  
  // Default fallback - return null or a generic icon
  return null;
}

export function getSocialPlatformLogo(platform: string, className?: string) {
  const normalizedPlatform = platform.toLowerCase();
  
  if (normalizedPlatform.includes('instagram')) {
    return <InstagramLogo className={className} />;
  } else if (normalizedPlatform.includes('facebook')) {
    return <FacebookLogo className={className} />;
  } else if (normalizedPlatform.includes('twitter') || normalizedPlatform.includes('x')) {
    return <TwitterLogo className={className} />;
  } else if (normalizedPlatform.includes('linkedin')) {
    return <LinkedInLogo className={className} />;
  } else if (normalizedPlatform.includes('tiktok')) {
    return <TikTokLogo className={className} />;
  }
  
  // Default fallback - return null or a generic icon
  return null;
}
