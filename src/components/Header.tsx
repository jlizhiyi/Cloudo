import { Link } from 'react-router-dom';
import { Cloud, Zap } from 'lucide-react';

interface HeaderProps {
  xp: number;
}

export default function Header({ xp }: HeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <div className="w-8 h-8 bg-linear-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">Cloudo</span>
          </Link>
          
          <div className="flex items-center gap-1 bg-slate-700/50 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-semibold text-sm">{xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
}