'use client';

import { Play, Square, Loader2, PlayCircle } from 'lucide-react';
import { useTransition } from 'react';
import { triggerScrapeJob, stopAllJobs, triggerAllJobs } from './actions';

export function ActionButtons() {
  const [isPendingScrape, startScrape] = useTransition();
  const [isPendingStop, startStop] = useTransition();
  const [isPendingStartAll, startStartAll] = useTransition();

  const handleScrape = () => {
    startScrape(async () => {
      const res = await triggerScrapeJob();
      if (res.success) {
        alert(`Scrape job triggered successfully (Run: ${res.runId})`);
      } else {
        alert(`Failed: ${res.error}`);
      }
    });
  };

  const handleStartAll = () => {
    startStartAll(async () => {
      const res = await triggerAllJobs();
      if (res.success) {
        alert(`Successfully triggered all jobs!`);
      } else {
        alert(`Failed: ${res.error}`);
      }
    });
  };

  const handleStop = () => {
    startStop(async () => {
      const res = await stopAllJobs();
      if (res.success) {
        alert(`Cancelled ${res.cancelled} active run(s).`);
      } else {
        alert(`Failed: ${res.error}`);
      }
    });
  };

  return (
    <div className="flex space-x-3">
      <button 
        onClick={handleStop}
        disabled={isPendingStop}
        className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700 disabled:opacity-50"
      >
        {isPendingStop ? <Loader2 size={16} className="animate-spin text-red-400" /> : <Square size={16} className="text-red-400" />}
        <span>Stop All</span>
      </button>

      <button 
        onClick={handleStartAll}
        disabled={isPendingStartAll}
        className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
      >
        {isPendingStartAll ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />}
        <span>Start All</span>
      </button>
      
      <button 
        onClick={handleScrape}
        disabled={isPendingScrape}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
      >
        {isPendingScrape ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
        <span>Trigger Scrape</span>
      </button>
    </div>
  );
}
