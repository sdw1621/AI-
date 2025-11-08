
export interface UserInput {
  industry: string;
  targetAge: string;
  targetGender: string;
  additionalRequest: string;
}

export interface Reasoning {
  sales_contribution: string;
  day_of_week_char: string;
  additional_analysis: string;
}

export interface Recommendation {
  rank: number;
  commercial_area: string;
  estimated_sales: string;
  reasoning: Reasoning;
}

export interface GeminiResponse {
  recommendations: Recommendation[];
}
