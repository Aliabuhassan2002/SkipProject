import React, { useState, useEffect } from "react";

const Notepad = ({ selectedSkip }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!selectedSkip) {
    return (
      <div className="fixed top-6 left-6 z-50 animate-in slide-in-from-left duration-500">
        <div className="bg-[#FAF7F0] backdrop-blur-lg rounded-2xl shadow-2xl border border-[#D8D2C2] p-6 w-80">
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-3">📋</div>
            <p className="font-semibold text-gray-700">No skip selected</p>
            <p className="text-sm opacity-70 mt-1">
              Choose a skip to see details here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-6 left-6 z-50 animate-in slide-in-from-left duration-500">
      <div className="relative group">
        {/* Card shadow for depth */}
        <div className="absolute top-2 left-2 w-full h-full bg-[#D8D2C2]/40 rounded-2xl blur-sm" />

        {/* Main notepad */}
        <div className="relative bg-[#FAF7F0] rounded-2xl shadow-2xl border border-[#D8D2C2] overflow-hidden transform transition-all duration-300 hover:scale-105 w-80">
          <div
            className="absolute inset-0 opacity-5 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Minimize/Maximize button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="absolute top-4 right-4 w-8 h-8 bg-[#D8D2C2] hover:bg-[#c5bfaf] text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl z-20"
          >
            {isMinimized ? "+" : "−"}
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#D8D2C2] to-[#c5bfaf] text-gray-800 p-4">
            <h2 className="text-lg font-bold flex items-center">
              📋 Selected Skip Details
            </h2>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isMinimized ? "max-h-0" : "max-h-150"
            }`}
          >
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#D8D2C2]/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📦</span>
                    <span className="text-gray-600 font-medium">Size</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {selectedSkip.size} Yard
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#D8D2C2]/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">💷</span>
                    <span className="text-gray-600 font-medium">Price</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    £{selectedSkip.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#D8D2C2]/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">⏱️</span>
                    <span className="text-gray-600 font-medium">
                      Hire Period
                    </span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {selectedSkip.hirePeriod} days
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#D8D2C2]/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🛣️</span>
                    <span className="text-gray-600 font-medium">Road Use</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {selectedSkip.allowedOnRoad ? "Allowed" : "Not Allowed"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#D8D2C2]/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🏗️</span>
                    <span className="text-gray-600 font-medium">
                      Heavy Waste
                    </span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {selectedSkip.allowsHeavyWaste ? "Allowed" : "Not Allowed"}
                  </span>
                </div>

                {/* Status note */}
                <div className="mt-4 p-3 bg-gradient-to-r from-[#FAF7F0] to-[#f5f2eb] rounded-lg border-l-4 border-[#D8D2C2]">
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="mr-2">✨</span>
                    {selectedSkip.allowedOnRoad
                      ? "Ready for booking"
                      : "Requires private land for placement"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notepad;
