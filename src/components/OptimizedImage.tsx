interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = ""
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto object-cover ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
};