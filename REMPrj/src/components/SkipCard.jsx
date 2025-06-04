import React, { useState, useEffect } from "react";

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 h-full ${
        isSelected ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(skip)}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-[#D8D2C2] via-[#c5bfaf] to-[#D8D2C2] rounded-2xl blur-lg opacity-0 transition-all duration-500 ${
          isSelected || isHovered ? "opacity-75" : "group-hover:opacity-50"
        }`}
      />

      {/* Main card */}
      <div
        className={`relative backdrop-blur-xl bg-[#FAF7F0]/90 rounded-2xl border border-[#D8D2C2]/40 shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full ${
          isSelected
            ? "bg-gradient-to-br from-[#FAF7F0]/90 to-[#f5f2eb]/90"
            : ""
        }`}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2 z-10">
          {!skip.allowedOnRoad && (
            <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
              Not for road use
            </div>
          )}
          {skip.allowsHeavyWaste && (
            <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
              Heavy waste OK
            </div>
          )}
        </div>

        {/* Skip Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <img
            src={skip.image}
            alt={`${skip.size} yard skip`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div
            className={`absolute top-4 right-4 px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 transform backdrop-blur-md ${
              isSelected || isHovered
                ? "bg-gradient-to-r from-[#D8D2C2] to-[#c5bfaf] text-gray-800 shadow-lg shadow-[#D8D2C2]/30 scale-110"
                : "bg-white/80 text-gray-700"
            }`}
          >
            {skip.size} yd³
          </div>
        </div>

        {/* Content*/}
        <div
          className={`flex-grow p-6 flex flex-col ${
            isSelected
              ? "bg-gradient-to-br from-[#FAF7F0]/20 to-[#f5f2eb]/20"
              : ""
          }`}
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start space-x-3">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 mt-1 `}
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {skip.size} Yard Skip
                </h3>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  {skip.description}
                </p>
              </div>
            </div>
          </div>

          {/* Visual separator */}
          <div
            className={`w-full h-px bg-gradient-to-r transition-all duration-500 my-4 ${
              isSelected || isHovered
                ? "from-[#D8D2C2] via-[#c5bfaf] to-[#D8D2C2] opacity-50"
                : "from-gray-200 to-gray-100 opacity-30"
            }`}
          />

          {/* Price and button*/}
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                  From
                </span>
                <p
                  className={`text-2xl font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#D8D2C2] to-[#c5bfaf] bg-clip-text text-transparent"
                      : "text-gray-800"
                  }`}
                >
                  £{skip.price.toFixed(2)}
                </p>
                <p className="text-gray-400 text-xs">
                  {skip.hirePeriod} days hire
                </p>
              </div>
              <button
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D8D2C2]/30 text-sm ${
                  isSelected
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40"
                    : "bg-gradient-to-r from-[#D8D2C2] to-[#c5bfaf] text-gray-800 shadow-lg shadow-[#D8D2C2]/30 hover:shadow-xl hover:shadow-[#D8D2C2]/40"
                }`}
              >
                {isSelected ? "Unselect" : "Select"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
