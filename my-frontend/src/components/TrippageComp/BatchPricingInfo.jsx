import React, { useState } from 'react';
import BatchCard from './BatchCard';
import PricingTabs from './PricingTabs';
import InfoItem from './InfoItem';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const inclusionsData = [
  "Live interactive classes with expert instructors",
  "Access to recorded lectures for 1 year",
  "Downloadable study material and resources",
  "Weekly assignments with feedback",
  "Doubt-clearing sessions every weekend",
  "Certificate of completion after final assessment"
];

const exclusionsData = [
  "Laptop or personal device is not provided",
  "No job guarantee or placement assurance",
  "Certification fee is charged separately",
  "Accommodation or travel expenses for workshops",
  "No refund after course has started"
];

const animationProps = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

const BatchPricingInfo = () => {
  const [activeMonth, setActiveMonth] = useState('Mar');
  const [showInclusions, setShowInclusions] = useState(true);
  const [showExclusions, setShowExclusions] = useState(true);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* BatchCard */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex justify-center">
          <BatchCard month={activeMonth} />
        </div>

        {/* PricingTabs */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <PricingTabs />
        </div>

        {/* Inclusions */}
        <div className="border border-gray-100 rounded-lg bg-white">
          <div
            className="flex flex-row items-center justify-between p-5 pb-0 border-b cursor-pointer"
            onClick={() => setShowInclusions(!showInclusions)}
          >
            <h2 className="text-lg font-bold">Inclusions</h2>
            <div className="bg-[#0C8699] p-1 rounded-full text-white transition-all">
              {showInclusions ? <Minus size={16} /> : <Plus size={16} />}
            </div>
          </div>
          <AnimatePresence>
            {showInclusions && (
              <motion.div {...animationProps} className="overflow-hidden px-5 pt-4">
                {inclusionsData.map((text, index) => (
                  <InfoItem key={`inc-${index}`} text={text} color="bg-[#0C8699]" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Exclusions */}
        <div className="border border-gray-100 rounded-lg bg-white">
          <div
            className="flex flex-row items-center justify-between p-5 pb-0 border-b cursor-pointer"
            onClick={() => setShowExclusions(!showExclusions)}
          >
            <h2 className="text-lg font-bold">Exclusions</h2>
            <div className="bg-[#0C8699] p-1 rounded-full text-white transition-all">
              {showExclusions ? <Minus size={16} /> : <Plus size={16} />}
            </div>
          </div>
          <AnimatePresence>
            {showExclusions && (
              <motion.div {...animationProps} className="overflow-hidden px-5 pt-4">
                {exclusionsData.map((text, index) => (
                  <InfoItem key={`exc-${index}`} text={text} color="bg-[#0C8699]" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default BatchPricingInfo;
