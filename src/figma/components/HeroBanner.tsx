import { useState } from 'react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  )
}

export default function HeroBanner({
  title,
  subtitle,
  imageUrl,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick
}: HeroBannerProps) {
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      <ImageWithFallback
        src={imageUrl}
        alt="Hero banner"
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl mb-4">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onPrimaryClick}
                className="px-8 py-4 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)] transition-colors text-lg"
              >
                {primaryButtonText}
              </button>
              {secondaryButtonText && onSecondaryClick && (
                <button
                  onClick={onSecondaryClick}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-lg border border-white/50"
                >
                  {secondaryButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
