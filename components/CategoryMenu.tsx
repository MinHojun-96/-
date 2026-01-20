
import React from 'react';
import { Category } from '../types';
import { Plane, PawPrint, Globe } from 'lucide-react';

interface CategoryMenuProps {
  onSelect: (category: Category) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onSelect }) => {
  const categories = [
    { id: Category.TRAVEL, label: 'Travel', icon: Plane, color: 'bg-blue-500', desc: 'Explore the world' },
    { id: Category.ANIMAL, label: 'Animal', icon: PawPrint, color: 'bg-green-500', desc: 'Cute & wild friends' },
    { id: Category.COUNTRY, label: 'Country', icon: Globe, color: 'bg-purple-500', desc: 'Nations & cultures' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className="group relative flex flex-col items-center p-8 bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className={`${cat.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
            <cat.icon size={40} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{cat.label}</h3>
          <p className="text-slate-400 text-sm">{cat.desc}</p>
          
          <div className="mt-6 px-4 py-2 bg-slate-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Start Practice
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
