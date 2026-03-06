import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPost } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Clock, ArrowLeft } from 'lucide-react';

export function JournalPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(slug)
      .then((res) => setPost(res.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32">
        <p className="text-white-muted">Post not found.</p>
        <Link to="/journal" className="text-gold-primary mt-4">Back to Journal</Link>
      </div>
    );
  }

  return (
    <main className="pt-24">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/journal" className="inline-flex items-center gap-2 text-white-muted hover:text-gold-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Journal
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-gold-primary text-xs uppercase tracking-wider">{post.category}</span>
          <h1 className="font-playfair text-4xl lg:text-5xl font-semibold text-white-primary mt-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-white-muted text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {post.featuredImage && (
            <div className="aspect-video rounded-lg overflow-hidden mb-12">
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div
            className="prose prose-invert prose-lg max-w-none text-white-muted leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/<p>/g, '<p class="mb-4">') }}
          />
        </motion.div>
      </article>
    </main>
  );
}
