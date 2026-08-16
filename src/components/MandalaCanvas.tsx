import React, { useMemo } from 'react';
import { CustomMandalaDesign } from '../types';

interface MandalaCanvasProps {
  design: CustomMandalaDesign;
  size?: number; // width & height in px
  className?: string;
  showShadow?: boolean;
}

export const MandalaCanvas: React.FC<MandalaCanvasProps> = ({
  design,
  size = 320,
  className = '',
  showShadow = true
}) => {
  const { shape, baseColor, patternStyle, palette, personalisationText } = design;

  // Generate deterministic ring layers based on patternStyle and palette dots
  const ringsData = useMemo(() => {
    const dots = palette.dots;
    const ringCount = patternStyle === 'Traditional' ? 7 : patternStyle === 'Geometric' ? 6 : 5;
    const rings = [];

    for (let r = 1; r <= ringCount; r++) {
      const radiusPct = (r / (ringCount + 1)) * 42; // percentage of half-size
      let count = r * 8;
      if (patternStyle === 'Floral') count = r * 6;
      if (patternStyle === 'Sun') count = r * 12;

      const ringDots = [];
      for (let i = 0; i < count; i++) {
        const angle = (i * 360) / count;
        const color = dots[(i + r) % dots.length];
        const dotRadius = Math.max(1.5, 4.5 - r * 0.4);
        ringDots.push({ angle, color, dotRadius });
      }

      rings.push({
        radiusPct,
        dots: ringDots,
        ringColor: dots[r % dots.length]
      });
    }

    return rings;
  }, [patternStyle, palette]);

  // Center motif shapes
  const centerColor = palette.dots[0] || '#D4AF37';
  const secondaryColor = palette.dots[1] || '#FFFFFF';
  const accentColor = palette.dots[2] || '#C59B27';

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={`transition-all duration-300 ${
          showShadow ? 'drop-shadow-xl' : ''
        }`}
      >
        <defs>
          {/* Metallic Gold Sheen Gradient */}
          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0C2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>

          {/* Base Rim Gradient */}
          <linearGradient id="baseRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={baseColor.hex} />
            <stop offset="100%" stopColor={baseColor.hex} stopOpacity="0.85" />
          </linearGradient>

          {/* Pattern Arch Path for Text */}
          <path id="textArchPath" d="M 30,100 A 70,70 0 0,1 170,100" />
          <path id="textBottomPath" d="M 170,100 A 70,70 0 0,1 30,100" />
        </defs>

        {/* 1. Base Shape (Circle, Square, Hexagon) */}
        {shape === 'Circle' && (
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="url(#baseRimGrad)"
            stroke="#D4AF37"
            strokeWidth="3.5"
          />
        )}

        {shape === 'Square' && (
          <rect
            x="12"
            y="12"
            width="176"
            height="176"
            rx="20"
            fill="url(#baseRimGrad)"
            stroke="#D4AF37"
            strokeWidth="3.5"
          />
        )}

        {shape === 'Hexagon' && (
          <polygon
            points="100,10 180,55 180,145 100,190 20,145 20,55"
            fill="url(#baseRimGrad)"
            stroke="#D4AF37"
            strokeWidth="3.5"
          />
        )}

        {/* Outer Gold Decorative Border Ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeDasharray="2,3"
          opacity="0.8"
        />

        {/* 2. Concentric Dot Rings */}
        {ringsData.map((ring, rIdx) => {
          const r = (ring.radiusPct / 100) * 200;
          return (
            <g key={`ring-${rIdx}`}>
              {/* Thin guide circle */}
              <circle
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke={ring.ringColor}
                strokeWidth="0.4"
                opacity="0.3"
              />

              {/* Dots in this ring */}
              {ring.dots.map((dot, dIdx) => {
                const rad = (dot.angle * Math.PI) / 180;
                const cx = 100 + r * Math.cos(rad);
                const cy = 100 + r * Math.sin(rad);

                return (
                  <circle
                    key={`dot-${rIdx}-${dIdx}`}
                    cx={cx}
                    cy={cy}
                    r={dot.dotRadius}
                    fill={dot.color}
                    stroke="#2A050A"
                    strokeWidth="0.2"
                  />
                );
              })}
            </g>
          );
        })}

        {/* 3. Center Mandala Flower / Star Motif */}
        {/* Petal layer for Floral & Traditional */}
        {(patternStyle === 'Floral' || patternStyle === 'Traditional') && (
          <g transform="translate(100,100)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <path
                key={`petal-${idx}`}
                d="M 0,0 C -6,-15 0,-26 0,-26 C 0,-26 6,-15 0,0"
                fill={idx % 2 === 0 ? centerColor : secondaryColor}
                stroke="#D4AF37"
                strokeWidth="0.5"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
        )}

        {/* Rays for Sun motif */}
        {patternStyle === 'Sun' && (
          <g transform="translate(100,100)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
              <line
                key={`sun-ray-${idx}`}
                x1="0"
                y1="0"
                x2="0"
                y2="-24"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
        )}

        {/* Moon motif crescent */}
        {patternStyle === 'Moon' && (
          <g transform="translate(100,100)">
            <path
              d="M -10,-12 A 15,15 0 1,0 12,10 A 11,11 0 1,1 -10,-12 Z"
              fill="url(#goldGlow)"
              stroke="#D4AF37"
              strokeWidth="0.5"
            />
          </g>
        )}

        {/* Center Focal Pearl */}
        <circle cx="100" cy="100" r="10" fill={centerColor} stroke="#D4AF37" strokeWidth="1" />
        <circle cx="100" cy="100" r="6" fill={secondaryColor} />
        <circle cx="100" cy="100" r="3" fill={accentColor} />

        {/* 4. Personalisation Text Curve */}
        {personalisationText && (
          <g>
            <text fill={baseColor.textHex || '#EED284'} fontSize="7" fontWeight="600" letterSpacing="2">
              <textPath href="#textBottomPath" startOffset="50%" textAnchor="middle">
                • {personalisationText.toUpperCase()} •
              </textPath>
            </text>
          </g>
        )}
      </svg>

      {/* Subtle brand watermark tag at top right */}
      <div className="absolute top-2 right-2 text-[9px] font-marcellus tracking-wider text-[#D4AF37]/70 uppercase pointer-events-none">
        The Painted Dots
      </div>
    </div>
  );
};
