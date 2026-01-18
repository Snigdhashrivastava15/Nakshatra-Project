import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogBySlug, getRelatedBlogs, Blog } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import { useEffect } from "react";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const blog = slug ? getBlogBySlug(slug) : undefined;
  const relatedBlogs = blog ? getRelatedBlogs(blog.id, 3) : [];

  useEffect(() => {
    // Scroll to top when blog loads
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <>
        <Helmet>
          <title>Blog Not Found | Planet Nakshatra - Sameer</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="py-24">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                  Blog Not Found
                </h1>
                <p className="font-body text-foreground/70 mb-8">
                  The blog post you're looking for doesn't exist or may have been moved.
                </p>
                <Button
                  onClick={() => navigate("/blogs")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Blogs
                </Button>
              </motion.div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Planet Nakshatra - Sameer</title>
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={blog.tags.join(", ")} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.thumbnail} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blog.publishedDate} />
        <meta property="article:author" content={blog.author} />
        {blog.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Banner */}
          <section className="relative h-64 md:h-96 overflow-hidden bg-muted">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {blog.category && (
                    <span className="inline-block text-xs font-body tracking-[0.2em] uppercase text-secondary mb-3">
                      {blog.category}
                    </span>
                  )}
                  <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                    {blog.title}
                  </h1>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Blog Content */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/blogs")}
                    className="font-body tracking-wide uppercase text-sm"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Blogs
                  </Button>
                </motion.div>

                {/* Article Meta */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border"
                >
                  <div className="flex items-center gap-2 text-sm font-body text-foreground/70">
                    <User className="w-4 h-4 text-secondary" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-body text-foreground/70">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{blog.publishedDate}</span>
                  </div>
                  {blog.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-4 h-4 text-secondary" />
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-body uppercase tracking-wide bg-muted text-foreground/70 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Article Content */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="prose prose-lg max-w-none font-body text-foreground/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: "1.75rem",
                  }}
                />

                {/* Share Section (Optional - can be enhanced later) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12 pt-8 border-t border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-body text-sm text-foreground/70 uppercase tracking-wide">
                      Share:
                    </span>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: blog.title,
                              text: blog.excerpt,
                              url: window.location.href,
                            });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                          }
                        }}
                        className="font-body tracking-wide uppercase text-xs"
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <section className="py-12 md:py-16 bg-muted/20">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                    Related Articles
                  </h2>
                  <p className="font-body text-foreground/70">
                    Continue exploring our insights and knowledge
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {relatedBlogs.map((relatedBlog, index) => (
                    <BlogCard
                      key={relatedBlog.id}
                      title={relatedBlog.title}
                      excerpt={relatedBlog.excerpt}
                      thumbnail={relatedBlog.thumbnail}
                      slug={relatedBlog.slug}
                      date={relatedBlog.publishedDate}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogDetail;
