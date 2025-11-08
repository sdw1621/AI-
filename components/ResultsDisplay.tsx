
import React from 'react';
import type { Recommendation } from '../types';
import { ResultCard } from './ResultCard';

interface ResultsDisplayProps {
  recommendations: Recommendation[] | null;
  isLoading: boolean;
  error: string | null;
  isInitialState: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        {[1,2,3].map(i => (
             <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                </div>
            </div>
        ))}
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ recommendations, isLoading, error, isInitialState }) => {
  if (isInitialState) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-xl shadow-lg border border-slate-200 min-h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h2 className="text-xl font-bold text-slate-700">분석 결과를 기다리고 있습니다.</h2>
        <p className="text-slate-500 mt-2 text-center">좌측 패널에서 조건을 설정하고 'AI 분석 시작' 버튼을 눌러주세요.</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-red-50 text-red-700 p-8 rounded-xl border border-red-200 min-h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold">오류 발생</h3>
        <p className="mt-2">{error}</p>
      </div>
    );
  }
  
  if (recommendations) {
    return (
      <div className="space-y-6">
        {recommendations.map((rec) => (
          <ResultCard key={rec.rank} recommendation={rec} />
        ))}
      </div>
    );
  }

  return null;
};
