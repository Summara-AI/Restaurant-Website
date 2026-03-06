import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const CATEGORIES = ['Starters', 'Soups & Salads', 'Mains', 'Pasta & Risotto', 'Grills & Steaks', 'Vegetarian', 'Desserts', 'Cocktails', 'Wine', 'Non-Alcoholic'];

export function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    getMenu().then((res) => {
      setItems(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await updateMenuItem(editing._id, data);
        setItems((prev) => prev.map((i) => (i._id === editing._id ? { ...i, ...data } : i)));
        toast.success('Updated');
      } else {
        const res = await createMenuItem(data);
        setItems((prev) => [...prev, res.data]);
        toast.success('Created');
      }
      setEditing(null);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await deleteMenuItem(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success('Deleted');
    } catch (err) {
      toast.error('Failed');
    }
  };

  const edit = (item) => {
    setEditing(item);
    setValue('name', item.name);
    setValue('description', item.description);
    setValue('price', item.price);
    setValue('category', item.category);
    setValue('imageUrl', item.imageUrl || '');
    setValue('tags', item.tags?.join(', ') || '');
    setValue('isChefsPick', item.isChefsPick);
    setValue('isAvailable', item.isAvailable);
  };

  if (loading) return <div className="p-8 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="p-8">
      <h1 className="font-playfair text-3xl text-white-primary mb-6">Menu Manager</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-black-card border border-black-border rounded-lg p-6 space-y-4">
          <h2 className="font-playfair text-xl text-white-primary">{editing ? 'Edit Item' : 'Add Item'}</h2>
          <div>
            <label className="block text-sm text-white-muted mb-2">Name</label>
            <input {...register('name', { required: true })} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Description</label>
            <textarea {...register('description', { required: true })} rows={2} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Price</label>
            <input type="number" step="0.01" {...register('price', { required: true, valueAsNumber: true })} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Category</label>
            <select {...register('category', { required: true })} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Image URL</label>
            <input {...register('imageUrl')} className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Tags (comma-separated, e.g. GF, V)</label>
            <input {...register('tags')} placeholder="GF, V, VG, Spicy" className="w-full px-4 py-2 bg-black-primary border border-black-border rounded text-white-primary" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white-muted">
              <input type="checkbox" {...register('isChefsPick')} />
              Chef&apos;s Pick
            </label>
            <label className="flex items-center gap-2 text-white-muted">
              <input type="checkbox" {...register('isAvailable')} defaultChecked />
              Available
            </label>
          </div>
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
          {items.map((item) => (
            <div key={item._id} className="flex justify-between items-center bg-black-card border border-black-border rounded-lg p-4">
              <div>
                <p className="font-playfair text-white-primary">{item.name}</p>
                <p className="text-white-muted text-sm">{item.category} · ${item.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(item)} className="text-gold-primary text-sm hover:underline">Edit</button>
                <button onClick={() => remove(item._id)} className="text-red-accent text-sm hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
