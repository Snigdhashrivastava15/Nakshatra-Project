import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import VideoCard from "./VideoCard";
import { getAllBlogs } from "@/data/blogs";

const videos = [
  {
    id: "dinF1sAjKZo",
    title: "Understanding Your Birth Chart: A Complete Guide",
  },
  {
    id: "dinF1sAjKZo", // Using same video ID as reference - replace with actual video IDs when available
    title: "Muhurta: The Art of Choosing Auspicious Times",
  },
  {
    id: "dinF1sAjKZo", // Using same video ID as reference - replace with actual video IDs when available
    title: "Vedic Remedies for Financial Prosperity",
  },
];

const BlogsInsightsSection = () => {
  const blogs = getAllBlogs().slice(0, 3); // Show only first 3 on homepage

  return (
    <section id="blogs-insights" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">
            INSIGHTS & KNOWLEDGE
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 deco-line">
            Latest Blogs & Videos
          </h2>
          <p className="font-body text-foreground/70 max-w-2xl mx-auto mt-8">
            Explore timeless wisdom, practical guidance, and profound insights from the ancient science of Vedic astrology. 
            Discover how cosmic intelligence can illuminate your path to success, harmony, and fulfillment.
          </p>
        </motion.div>

        {/* Blogs Grid */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl md:text-3xl text-foreground mb-8"
          >
            Featured Articles
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                thumbnail={blog.thumbnail}
                slug={blog.slug}
                date={blog.publishedDate}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Video Insights Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl md:text-3xl text-foreground mb-8"
          >
            Video Insights
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {videos.map((video, index) => (
              <VideoCard
                key={`${video.id}-${index}`}
                videoId={video.id}
                title={video.title}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsInsightsSection;
