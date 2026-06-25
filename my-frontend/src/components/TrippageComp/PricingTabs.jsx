import React, { useState } from 'react';
import PricingCard from './PricingCard';

const tabData = [
  {
    key: 'triple',
    label: 'Triple Occupancy',
    content: [
      { title: 'Tempo Traveller', subtitle: 'Triple Occupancy', price: '12,500' },
      { title: '350 cc', subtitle: 'Triple Occupancy', price: '12,500' },
    ],
  },
  {
    key: 'double',
    label: 'Double Occupancy',
    content: [
      { title: 'Double Occupancy', subtitle: '', price: '12,500' },
    ],
  },
  {
    key: 'quarter',
    label: 'Quarter Occupancy',
    content: [
      { title: 'Quarter Occupancy', subtitle: '', price: '12,500' },
      { title: 'Himalayan 411cc', subtitle: 'Dual Rider', price: '12,500' },
      { title: 'Himalayan 411cc', subtitle: 'Solo Rider', price: '12,500' },
    ],
  },
];

const PricingTabs = () => {
  const [activeTab, setActiveTab] = useState('triple');
  const currentTab = tabData.find(tab => tab.key === activeTab);

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-bold mb-4 text-center">Pricing</h2>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {tabData.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-sm py-2 border-b-2 font-medium transition-colors duration-200 ${
              activeTab === tab.key
                ? 'border-[#0C8699] text-[#0C8699]'
                : 'border-transparent text-[#0C8699] hover:text-[#0C8699]/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {currentTab.content.map((card, index) => (
          <PricingCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            price={card.price}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingTabs;
