
import type { UserInput } from './types';

export const INDUSTRIES = [
  "한식 전문점",
  "카페/디저트",
  "이탈리안 레스토랑",
  "피트니스 센터",
  "의류/패션 매장",
  "스터디 카페",
  "이자카야/일본식 주점",
  "반려동물 용품점"
];

export const AGE_GROUPS = [
  "10대",
  "20대",
  "30대",
  "40대",
  "50대 이상",
  "전 연령"
];

export const GENDERS = [
  "남성",
  "여성",
  "모두"
];

export const DEFAULT_USER_INPUT: UserInput = {
  industry: INDUSTRIES[1], // 카페/디저트
  targetAge: AGE_GROUPS[1], // 20대
  targetGender: GENDERS[1], // 여성
  additionalRequest: "주말 매출 비중이 높은 곳으로 추천해주세요."
};
