import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const RoleCard = ({ role, icon: Icon, description, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5, borderColor: '#a855f7' }}
      onClick={() => onSelect(role)}
      className="group p-8 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800 cursor-pointer transition-all relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
          <Icon size={24} className="text-purple-500 group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2 tracking-tight uppercase italic">{role}</h3>
        <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
          Initialize <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export default RoleCard;