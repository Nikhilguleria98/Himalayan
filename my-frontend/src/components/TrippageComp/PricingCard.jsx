import React from 'react';

const PricingCard = ({ title, subtitle, price }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 mb-3 last:mb-0 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="text-[#0C8699] font-medium">₹ {price}</div>
      </div>
    </div>
  );
};

export default PricingCard;
