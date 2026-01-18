import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoCardProps {
  videoId: string;
  title: string;
  index?: number;
}

const VideoCard = ({ videoId, title, index = 0 }: VideoCardProps) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = `https://youtu.be/${videoId}`;

  const handleClick = () => {
    window.open(youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleClick}
      className="group relative cursor-pointer card-elegant overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden bg-muted">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback to placeholder if thumbnail fails to load
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 group-hover:bg-background/30 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/90 to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="font-display text-base text-foreground leading-tight group-hover:text-secondary transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default VideoCard;
