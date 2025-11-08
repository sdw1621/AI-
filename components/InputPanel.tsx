
import React from 'react';
import type { UserInput } from '../types';
import { INDUSTRIES, AGE_GROUPS, GENDERS } from '../constants';
import { Spinner } from './icons/Spinner';

interface InputPanelProps {
  userInput: UserInput;
  onInputChange: (field: keyof UserInput, value: string) => void;
  onAnalysis: () => void;
  isLoading: boolean;
}

const SelectInput: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export const InputPanel: React.FC<InputPanelProps> = ({ userInput, onInputChange, onAnalysis, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 sticky top-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-3">분석 조건 설정</h2>
      <div className="space-y-4">
        <SelectInput
          label="업종 선택"
          value={userInput.industry}
          options={INDUSTRIES}
          onChange={(e) => onInputChange('industry', e.target.value)}
        />
        <SelectInput
          label="타겟 연령대"
          value={userInput.targetAge}
          options={AGE_GROUPS}
          onChange={(e) => onInputChange('targetAge', e.target.value)}
        />
        <SelectInput
          label="타겟 성별"
          value={userInput.targetGender}
          options={GENDERS}
          onChange={(e) => onInputChange('targetGender', e.target.value)}
        />
        <div>
          <label htmlFor="additional-request" className="block text-sm font-medium text-slate-700 mb-1">추가 요청사항</label>
          <textarea
            id="additional-request"
            rows={3}
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={userInput.additionalRequest}
            onChange={(e) => onInputChange('additionalRequest', e.target.value)}
            placeholder="예: 주말 유동인구가 많은 곳, 20대 여성 비중이 높은 곳 등"
          />
        </div>
        <button
          onClick={onAnalysis}
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : null}
          {isLoading ? '분석 중...' : 'AI 분석 시작'}
        </button>
      </div>
    </div>
  );
};
