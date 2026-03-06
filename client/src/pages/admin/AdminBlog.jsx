import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    getBlogPosts().then((res) => {
      setPosts(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const onSubmit = async (data) => {
    const slug = data.slug || slugify(data.title);
    const payload = { ...data, slug };
    try {
      if (editing) {
        await updateBlogPost(editing._id, payload);
        setPosts((prev) => prev.map((p) => (p._id === editing._id ? { ...p, ...payload } : p)));
        toast.success('Updated');
      } else {
        const res = await createBlogPost(payload);
        setPosts((prev) => [...prev, res.data]);
        toast.success('Created');
      }
      setEditing(null);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Deleted');
    } catch (err) {
      toast.error('Failed');
    }
  };

  const edit = (post) => {
    setEditing(post);
    setValue('title', post.title);
    setValue('slug', post.slug);
    setValue('excerpt', post.excerpt);
    setValue('content', post.content);
    setValue('category', post.category);
    setValue('featuredImage', post.featuredImage || '');
    setValue('readTime', post.readTime);
    setValue('published', post.published);
  };

  if (loading) return <div className="p-8 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="p-8">
      <h1 className="font-playfair text-3xl text-white-primary mb-6">Blog Manager</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-black-card border border-black-border rounded-lg p-6 space-y-4">
          <h2 className="font-playfair text-xl text-white-primary">{editing ? 'Edit Post' : 'Add Post'}</h2>
          <div>
            <label className="block text-sm text-white-muted mb-2">Title</label>
            <input {...register('title', { required: true })} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Slug</label>
            <input {...register('slug')} placeholder="auto-generated from title" className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Excerpt</label>
            <textarea {...register('excerpt', { required: true })} rows={2} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Content (HTML)</label>
            <textarea {...register('content', { required: true })} rows={6} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Category</label>
            <input {...register('category', { required: true })} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Featured Image URL</label>
            <input {...register('featuredImage')} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Read Time (min)</label>
            <input type="number" {...register('readTime', { valueAsNumber: true })} defaultValue={5} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <label className="flex items-center gap-2 text-white-muted">
            <input type="checkbox" {...register('published')} defaultChecked />
            Published
          </label>
          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-red-primary text-white-primary rounded hover:bg-red-hover">
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); reset(); }} className="px-4 py-2 border border-black-border rounded text-white-muted">
                Cancel
              </button>
            )}
          </div>
        </form>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {posts.map((post) => (
            <div key={post._id} className="flex justify-between items-center bg-black-card border border-black-border rounded-lg p-4">
              <div>
                <p className="font-playfair text-white-primary">{post.title}</p>
                <p className="text-white-muted text-sm">{post.category} · {new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(post)} className="text-gold-primary text-sm hover:underline">Edit</button>
                <button onClick={() => remove(post._id)} className="text-red-accent text-sm hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
