
import React from 'react';
import type { Recommendation } from '../types';

interface ResultCardProps {
  recommendation: Recommendation;
}

const RANK_DETAILS: { [key: number]: { emoji: string; color: string; } } = {
  1: { emoji: '🥇', color: 'border-amber-400' },
  2: { emoji: '🥈', color: 'border-slate-400' },
  3: { emoji: '🥉', color: 'border-amber-600' },
};

export const ResultCard: React.FC<ResultCardProps> = ({ recommendation }) => {
  const { rank, commercial_area, estimated_sales, reasoning } = recommendation;
  const details = RANK_DETAILS[rank] || { emoji: '🏅', color: 'border-gray-300' };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${details.color} transition-shadow hover:shadow-2xl`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            <span className="mr-2">{details.emoji}</span>
            {`${rank}순위 추천 상권: ${commercial_area}`}
          </h3>
          <p className="text-indigo-600 font-semibold mt-1">
            해당 상권 추정 매출 규모: <span className="text-lg">{estimated_sales}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <h4 className="font-bold text-lg text-slate-700 mb-3">핵심 추천 근거</h4>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-start">
            <span className="text-indigo-500 font-bold mr-2">1.</span>
            <div>
              <strong className="text-slate-700">매출 기여도:</strong> {reasoning.sales_contribution}
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 font-bold mr-2">2.</span>
            <div>
              <strong className="text-slate-700">요일 특성:</strong> {reasoning.day_of_week_char}
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 font-bold mr-2">3.</span>
            <div>
              <strong className="text-slate-700">추가 분석:</strong> {reasoning.additional_analysis}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
