import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const allMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const allBatches = [
  {
    id: 1,
    month: "Jan",
    range: "05-Jan To 10-Jan",
    available: true,
    startPoint: "Delhi",
    endPoint: "Agra",
    startTime: "05 Jan, 2025 (10:00 AM)",
    endTime: "10 Jan, 2025 (07:00 PM)",
  },
  {
    id: 2,
    month: "Feb",
    range: "10-Feb To 17-Feb",
    available: true,
    startPoint: "Delhi",
    endPoint: "Manali",
    startTime: "10 Feb, 2025 (09:00 AM)",
    endTime: "17 Feb, 2025 (08:00 PM)",
  },
  {
    id: 3,
    month: "Feb",
    range: "20-Feb To 27-Feb",
    available: false,
    startPoint: "Delhi",
    endPoint: "Shimla",
    startTime: "20 Feb, 2025 (10:00 AM)",
    endTime: "27 Feb, 2025 (07:30 PM)",
  },
  {
    id: 4,
    month: "Mar",
    range: "05-Mar To 11-Mar",
    available: true,
    startPoint: "Mumbai",
    endPoint: "Goa",
    startTime: "05 Mar, 2025 (12:00 PM)",
    endTime: "11 Mar, 2025 (06:00 PM)",
  },
  {
    id: 5,
    month: "Oct",
    range: "11-Oct To 17-Oct",
    available: true,
    startPoint: "Guwahati",
    endPoint: "Guwahati",
    startTime: "11 Oct, 2025 (12:00 PM)",
    endTime: "17 Oct, 2025 (07:00 PM)",
  },
  {
    id: 6,
    month: "Oct",
    range: "20-Oct To 26-Oct",
    available: true,
    startPoint: "Shillong",
    endPoint: "Dawki",
    startTime: "20 Oct, 2025 (10:00 AM)",
    endTime: "26 Oct, 2025 (07:00 PM)",
  },
];

const BatchCard = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(allMonths[0]);
  const [expandedBatchId, setExpandedBatchId] = useState(null);

  const visibleMonths = allMonths.slice(monthIndex, monthIndex + 6);

  const handleArrowClick = (dir) => {
    setMonthIndex((prev) =>
      dir === "left" ? Math.max(prev - 1, 0) : Math.min(prev + 1, allMonths.length - 6)
    );
  };

  const toggleBatch = (id) => {
    setExpandedBatchId((prev) => (prev === id ? null : id));
  };

  const filteredBatches = allBatches.filter((batch) => batch.month === selectedMonth);

  return (
    <div className="bg-white border rounded-xl shadow-md p-4 w-full max-w-md">
      <h3 className="text-center text-lg font-bold mb-4">Batches</h3>

      {/* Month Selector */}
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <button onClick={() => handleArrowClick("left")} className="text-[#0C8699] hover:text-cyan-600">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-3 overflow-x-auto">
          {visibleMonths.map((month) => (
            <button
              key={month}
              onClick={() => {
                setSelectedMonth(month);
                setExpandedBatchId(null);
              }}
              className={`text-sm transition-all ${
                selectedMonth === month
                  ? "text-[#0C8699] font-bold underline"
                  : "text-[#0C8699] hover:text-[#0C8699]"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        <button onClick={() => handleArrowClick("right")} className="text-[#0C8699] hover:text-cyan-600">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Batch Cards */}
      {filteredBatches.length === 0 ? (
        <div className="text-center text-sm text-[#0C8699]">No trips for this month.</div>
      ) : (
        filteredBatches.map((batch) => (
          <div key={batch.id} className="border border-[#C6EAF2] rounded-md mb-3 bg-[#F5FCFD]">
            <div onClick={() => toggleBatch(batch.id)} className="flex justify-between items-center px-3 py-2 cursor-pointer">
              <div>
                <span className="font-medium text-sm">{batch.range}</span>
                <span className={`text-sm font-medium ml-2 ${
                  batch.available ? "text-[#0C8699]" : "text-red-500"
                }`}>
                  ({batch.available ? "Available" : "Full"})
                </span>
              </div>
              <ChevronDown
                className={`transition-transform ${expandedBatchId === batch.id ? "rotate-180" : ""}`}
                size={18}
              />
            </div>

            {expandedBatchId === batch.id && (
              <div className="border-t px-3 py-3 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Start Point:</p>
                    <p>{batch.startPoint}</p>
                    <p className="text-gray-500">{batch.startTime}</p>
                  </div>
                  <div className="flex items-center justify-center text-lg text-gray-400">→</div>
                  <div>
                    <p className="font-semibold">End Point:</p>
                    <p>{batch.endPoint}</p>
                    <p className="text-gray-500">{batch.endTime}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BatchCard;
