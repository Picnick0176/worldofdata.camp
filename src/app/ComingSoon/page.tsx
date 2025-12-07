"use client";
import { useState, useEffect } from 'react';

export default function RegisterComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to November 7, 2025 (2568 in Buddhist calendar)
    const targetDate = new Date('2025-12-08T18:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="min-h-screen  from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4"  style={{ backgroundImage: "url('/Group2.svg')" }}>
      <div className="text-center bg-white/5 backdrop-blur-2xl text-white p-8 rounded-3xl w-full max-w-2xl shadow-xl mt-30 mb-5">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-16">
          Coming Soon Announcement of results
        </h1>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-8 md:gap-12 mb-12">
          <div className="text-center">
            <div className="text-5xl md:text-7xl font-bold text-white mb-2">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-xl md:text-2xl font-semibold text-white uppercase">
              Day
            </div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-7xl font-bold text-white mb-2">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-xl md:text-2xl font-semibold text-white uppercase">
              Hour
            </div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-7xl font-bold text-white mb-2">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-xl md:text-2xl font-semibold text-white uppercase">
              Min
            </div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-7xl font-bold text-white mb-2">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-xl md:text-2xl font-semibold text-white uppercase">
              Sec
            </div>
          </div>
        </div>

        {/* Thai Date Text */}
        <p className="text-yellow-400 text-xl md:text-2xl font-semibold mb-12">
          ประกาศผล 8 ธันวาคม 2568 เวลา 18.00 น.
        </p>

        {/* Home Button */}
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-xl px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          HOME
        </button>
      </div>
    </div>
  );
}