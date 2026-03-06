import { Flame } from 'lucide-react';

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="h-px flex-1 bg-gold-primary/50" />
      <Flame className="w-5 h-5 text-gold-primary" strokeWidth={1.5} />
      <div className="h-px flex-1 bg-gold-primary/50" />
    </div>
  );
}
