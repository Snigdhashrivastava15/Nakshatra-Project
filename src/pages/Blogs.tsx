import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/data/blogs";

const Blogs = () => {
  const navigate = useNavigate();
  const blogs = getAllBlogs();

  return (
    <>
      <Helmet>
        <title>Blogs & Insights | Planet Nakshatra - Sameer</title>
        <meta
          name="description"
          content="Explore insightful articles and videos on Vedic astrology, career guidance, relationships, and spiritual wisdom from Planet Nakshatra."
        />
        <meta name="keywords" content="vedic astrology blogs, astrology articles, spiritual guidance, career astrology, relationship astrology" />
        <meta property="og:title" content="Blogs & Insights | Planet Nakshatra" />
        <meta property="og:description" content="Explore insightful articles and videos on Vedic astrology, career guidance, relationships, and spiritual wisdom." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="py-24 bg-muted/20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="mb-8 font-body tracking-wide uppercase text-sm"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Home
                </Button>

                <div className="text-center mb-16">
                  <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">
                    INSIGHTS & KNOWLEDGE
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 deco-line">
                    Blogs & Insights
                  </h1>
                  <p className="font-body text-foreground/70 max-w-2xl mx-auto mt-8">
                    Explore our collection of articles, guides, and insights on Vedic astrology, 
                    career guidance, relationships, and spiritual wisdom.
                  </p>
                </div>
              </motion.div>

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
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blogs;
