
import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, Recommendation, GeminiResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          rank: {
            type: Type.INTEGER,
            description: "추천 순위 (1, 2, 3)"
          },
          commercial_area: {
            type: Type.STRING,
            description: "추천 상권의 이름 (예: 서울 강남역, 부산 서면)"
          },
          estimated_sales: {
            type: Type.STRING,
            description: "해당 상권의 타겟 기준 추정 매출 규모 (단위 포함, 예: 약 1,200억 원)"
          },
          reasoning: {
            type: Type.OBJECT,
            properties: {
              sales_contribution: {
                type: Type.STRING,
                description: "매출 기여도 분석 내용. 구체적인 수치 포함."
              },
              day_of_week_char: {
                type: Type.STRING,
                description: "요일 특성 분석 내용. 구체적인 비율 포함."
              },
              additional_analysis: {
                type: Type.STRING,
                description: "고객 유입/연대 효과 등 추가 분석 내용."
              }
            },
            required: ["sales_contribution", "day_of_week_char", "additional_analysis"]
          }
        },
        required: ["rank", "commercial_area", "estimated_sales", "reasoning"]
      }
    }
  },
  required: ["recommendations"]
};

export const generateRecommendations = async (userInput: UserInput): Promise<Recommendation[]> => {
  const { industry, targetAge, targetGender, additionalRequest } = userInput;

  const prompt = `
    당신은 대한민국 최고의 상권 분석 전문가입니다.
    주어진 분석 조건에 따라, 가장 적합한 상권 3곳을 추천하고 그 근거를 구체적인 데이터와 함께 제시해주세요.
    모든 데이터는 가상의 데이터이지만, 실제처럼 매우 현실적이고 논리적으로 생성해야 합니다.
    반드시 아래 JSON 형식에 맞춰서 한국어로 답변해주세요.

    **분석 조건:**
    * **업종:** ${industry}
    * **타겟 연령:** ${targetAge}
    * **타겟 성별:** ${targetGender}
    * **추가 요청사항:** ${additionalRequest}

    결과는 1순위부터 3순위까지 순서대로 정렬하여 제공해주세요.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse: GeminiResponse = JSON.parse(jsonText);

    if (parsedResponse && Array.isArray(parsedResponse.recommendations)) {
       return parsedResponse.recommendations.sort((a, b) => a.rank - b.rank);
    } else {
        throw new Error("Invalid response format from API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate recommendations from AI.");
  }
};
