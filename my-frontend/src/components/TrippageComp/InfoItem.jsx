import React from 'react';
import { ArrowRight } from 'lucide-react';

const InfoItem = ({ text, color = "bg-[#0EA5E9]" }) => {
  return (
    <div className="flex items-start mb-4 last:mb-0">
      <div className={`${color} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-3 text-white`}>
        <ArrowRight size={14} />
      </div>
      <p className="text-sm text-gray-700 mt-0.5">{text}</p>
    </div>
  );
};

export default InfoItem;
