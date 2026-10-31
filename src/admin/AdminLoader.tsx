import { Loader2 } from 'lucide-react';

export default function AdminLoader() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-zinc-950">
      <Loader2 className="h-8 w-8 animate-spin text-orange-500" aria-label="Загрузка" />
    </div>
  );
}
