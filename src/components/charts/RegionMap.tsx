import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import mapImage from 'figma:asset/cc334ca16e88540809102a819a9b979be617d7a1.png';

interface RegionData {
  region: string;
  mentions: number;
  sentiment: number;
}

interface RegionMapProps {
  data: RegionData[];
}

interface CountryData {
  name: string;
  percentage: number;
  x: number;
  y: number;
}

export function RegionMap({ data }: RegionMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [pressedCountry, setPressedCountry] = useState<string | null>(null);

  // Country data with accurate map coordinates matching the reference image
  const countries: CountryData[] = [
    { name: 'United States', percentage: 8, x: 180, y: 130 },
    { name: 'Saudi Arabia', percentage: 78, x: 540, y: 160 },
    { name: 'Egypt', percentage: 19, x: 510, y: 155 },
    { name: 'Australia', percentage: 21, x: 730, y: 280 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 850 350"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Dark map filter */}
          <filter id="mapDarkFilter">
            <feColorMatrix
              type="matrix"
              values="0.2 0 0 0 0
                      0.2 0 0 0 0
                      0.2 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          
          {/* Glow effect for dots */}
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
            <feFlood floodColor="#0EA5E9" floodOpacity="0.5" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Dark world map silhouette */}
        <image
          href={mapImage}
          x="0"
          y="0"
          width="850"
          height="350"
          preserveAspectRatio="xMidYMid meet"
          opacity="0.85"
          filter="url(#mapDarkFilter)"
        />

        {/* Country dots */}
        {countries.map((country, index) => {
          const isHovered = hoveredCountry?.name === country.name;
          const isPressed = pressedCountry === country.name;
          
          return (
            <g key={country.name}>
              {/* Outer ring (appears on hover) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.circle
                    cx={country.x}
                    cy={country.y}
                    r={14}
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="2"
                    opacity={0.4}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {/* Main dot with pressure effect */}
              <motion.circle
                cx={country.x}
                cy={country.y}
                r={8}
                fill="#0EA5E9"
                stroke="white"
                strokeWidth="2.5"
                className="cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isPressed ? 0.85 : (isHovered ? 1.15 : 1),
                  opacity: 1
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut"
                }}
                whileTap={{ scale: 0.85 }}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
                onMouseDown={() => setPressedCountry(country.name)}
                onMouseUp={() => setPressedCountry(null)}
                filter={isHovered ? "url(#dotGlow)" : undefined}
                style={{
                  filter: 'drop-shadow(0 2px 6px rgba(14, 165, 233, 0.4))',
                }}
              />
              
              {/* Inner dot highlight */}
              <motion.circle
                cx={country.x}
                cy={country.y - 2}
                r={3}
                fill="white"
                opacity={0.6}
                initial={{ scale: 0 }}
                animate={{ scale: isPressed ? 0.7 : 1 }}
                transition={{ 
                  delay: index * 0.1 + 0.1,
                  duration: 0.2
                }}
                pointerEvents="none"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute pointer-events-none z-20"
            style={{
              left: `${(hoveredCountry.x / 850) * 100}%`,
              top: `${(hoveredCountry.y / 350) * 100}%`,
              transform: 'translate(-50%, -130%)',
            }}
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3 min-w-[160px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-gray-900 dark:text-white font-semibold text-sm">
                    {hoveredCountry.name}
                  </h4>
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Engagement</span>
                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                      {hoveredCountry.percentage}%
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${hoveredCountry.percentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Tooltip arrow */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 rotate-45"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
