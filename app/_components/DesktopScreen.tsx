import React from "react";

const DesktopScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-md text-center bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          📱 Mobile Optimized Experience
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed">
          This website is designed primarily for mobile and tablet devices.
          For the best experience, please open it on a mobile or tablet.
        </p>

        <div className="mt-6 text-xs text-gray-400">
          Thank you for understanding 🙏
        </div>
      </div>
    </div>
  );
};

export default DesktopScreen;
