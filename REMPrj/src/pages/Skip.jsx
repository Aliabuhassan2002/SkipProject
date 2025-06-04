import React, { useState, useEffect } from "react";
import SkipCard from "../components/SkipCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notepad from "../components/NotePad";
import axios from "axios";
function SkipPage() {
  const [skips, setSkips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );

        // Transform API data to match our component needs
        const transformedData = response.data.map((skip) => ({
          id: skip.id,
          size: skip.size,
          price:
            skip.price_before_vat + skip.price_before_vat * (skip.vat / 100), // Calculate total price
          description: getSkipDescription(skip.size),
          hirePeriod: skip.hire_period_days,
          allowedOnRoad: skip.allowed_on_road,
          image: getSkipImage(skip.size),
          allowsHeavyWaste: skip.allows_heavy_waste,
          originalData: skip, // Keep original data for Notepad
        }));

        setSkips(transformedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching skip data:", err);
        setError("Failed to load skip options. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchSkips();
  }, []);

  // Helper function to generate descriptions based on size
  const getSkipDescription = (size) => {
    const descriptions = {
      4: "Perfect for small home projects or garden clearance",
      6: "Ideal for medium-sized home renovations",
      8: "Great for large home projects or small construction work",
      10: "Suitable for major home renovations or small commercial projects",
      12: "Perfect for construction sites or large clearance projects",
      14: "Ideal for major construction or demolition work",
      16: "Large capacity for significant waste removal needs",
      20: "Commercial grade skip for heavy-duty projects",
      40: "Maximum capacity for industrial waste management",
    };
    return (
      descriptions[size] || `Professional ${size} yard skip for all your needs`
    );
  };
  // Helper function to import images based on size
  const getSkipImage = (size) => {
    const imageMap = {
      4: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
      6: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
      8: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
      10: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg",
      12: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
      14: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
      16: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
      18: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
    };
    return (
      imageMap[size] ||
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg"
    );
  };

  const handleSkipSelect = (skip) => {
    setSelectedSkip((prev) => (prev?.id === skip.id ? null : skip));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F0] to-[#f5f2eb]">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D8D2C2]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D8D2C2]/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-20 left-1/2 w-60 h-60 bg-[#D8D2C2]/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Fixed Notepad for selected item */}
      <Notepad selectedSkip={selectedSkip} />

      <main className="relative w-full px-4 py-16">
        {/* Header section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-[#D8D2C2] to-[#c5bfaf] bg-clip-text text-transparent text-sm font-bold uppercase tracking-wider">
              Premium Skip Hire Service
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-[#D8D2C2] to-[#c5bfaf] bg-clip-text text-transparent">
              Skip Size
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Select the skip size that fits your project needs with our premium
            waste management solutions
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && !error ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin" />
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#D8D2C2] rounded-full animate-spin" />
            </div>
            <p className="text-gray-500 font-medium">Loading skip options...</p>
          </div>
        ) : (
          <>
            {/* Skip cards grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {skips.map((skip, index) => (
                <div
                  key={skip.id}
                  className="animate-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SkipCard
                    skip={skip}
                    isSelected={selectedSkip?.id === skip.id}
                    onSelect={handleSkipSelect}
                  />
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="max-w-2xl mx-auto mt-16 text-center px-4">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/80 to-[#FAF7F0]/50 backdrop-blur-xl border border-white/30 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Need Help Choosing?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our experts are here to help you find the perfect skip size
                  for your project
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-[#D8D2C2] to-[#c5bfaf] text-gray-800 font-semibold rounded-xl hover:shadow-xl hover:shadow-[#D8D2C2]/30 transition-all duration-300 transform hover:scale-105">
                  Get Expert Advice
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default SkipPage;
