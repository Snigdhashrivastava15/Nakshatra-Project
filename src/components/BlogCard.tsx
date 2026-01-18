import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  title: string;
  excerpt: string;
  thumbnail: string;
  slug?: string;
  date?: string;
  index?: number;
}

const BlogCard = ({ title, excerpt, thumbnail, slug, date, index = 0 }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (slug) {
      navigate(`/blogs/${slug}`);
    } else {
      navigate("/blogs");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group card-elegant overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 space-y-4">
        {date && (
          <div className="flex items-center gap-2 text-xs font-body text-foreground/50 uppercase tracking-wide">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        )}
        
        <h3 className="font-display text-xl text-foreground leading-tight group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="font-body text-sm text-foreground/60 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        
        <button
          onClick={handleReadMore}
          className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-body tracking-wide uppercase text-sm group/btn mt-4"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
};

export default BlogCard;
