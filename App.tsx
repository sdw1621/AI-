
import React, { useState, useCallback } from 'react';
import { InputPanel } from './components/InputPanel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateRecommendations } from './services/geminiService';
import type { Recommendation, UserInput } from './types';
import { DEFAULT_USER_INPUT } from './constants';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>(DEFAULT_USER_INPUT);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState<boolean>(true);

  const handleInputChange = useCallback((field: keyof UserInput, value: string) => {
    setUserInput(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsInitialState(false);
    setRecommendations(null);

    try {
      const result = await generateRecommendations(userInput);
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900">🎯 AI 기반 최적 입지 추천</h1>
          <p className="mt-3 text-md md:text-lg text-slate-600 max-w-3xl mx-auto">
            업종과 타겟 고객을 선택하여 AI가 분석한 최적의 상권을 추천받아 보세요.
          </p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <InputPanel 
              userInput={userInput}
              onInputChange={handleInputChange}
              onAnalysis={handleAnalysis}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-2">
            <ResultsDisplay 
              recommendations={recommendations}
              isLoading={isLoading}
              error={error}
              isInitialState={isInitialState}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
