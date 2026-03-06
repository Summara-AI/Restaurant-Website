import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Clock } from 'lucide-react';

export function Journal() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((res) => {
      setPosts(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="pt-24">
      <section className="py-16 bg-black-secondary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">Journal</p>
          <h1 className="font-playfair text-4xl lg:text-6xl font-semibold text-white-primary">Stories & Insights</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/journal/${post.slug}`} className="block group">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4">
                    <img
                      src={post.featuredImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-gold-primary text-xs uppercase tracking-wider">{post.category}</span>
                  <h2 className="font-playfair text-xl font-semibold text-white-primary mt-2 group-hover:text-gold-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white-muted text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-white-subtle text-sm">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read · {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
