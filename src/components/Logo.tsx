import React from 'react';
import logoImage from '../assets/images/mandala_logo.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightMode?: boolean; // Set true when on dark background (maroon/black)
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showText = false,
  lightMode = true // Default to true as app main header/footer are dark maroon
}) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Official Brand Logo Image */}
      <img
        src={logoImage}
        alt="The Painted Dots"
        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:scale-105 transition-transform duration-300"
      />

      {showText && (
        <div className="text-left flex flex-col justify-center">
          <span className={`font-marcellus text-lg sm:text-xl font-bold tracking-wider leading-none ${lightMode ? 'text-[#F2E5C6]' : 'text-[#3B010B]'}`}>
            THE PAINTED DOTS
          </span>
          <span className={`text-[10px] font-sans tracking-[0.2em] uppercase font-semibold mt-1 ${lightMode ? 'text-[#F2D9A0]' : 'text-[#75162D]'}`}>
            Handmade Mandala Art Studio
          </span>
        </div>
      )}
    </div>
  );
};
