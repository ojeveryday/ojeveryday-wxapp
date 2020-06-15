import { RankItemModel } from "./rank-item";

export { RankItemModel };

export interface ProblemDetail {
  content: string;
  translatedContent: string;
  allProblemId?: number;
  boundTopicId?: number;
  createDt?: string;
  difficulty?: string;
  frontendId?: string;
  likes?: number;
  questionId?: string;
  sampleTestCase?: string;
  similarQuestions?: string; // serializedArray
  stats?: string; // "{"totalAccepted": "7.2K", "totalSubmission": "13.5K", "totalAcceptedRaw": 7214, "totalSubmissionRaw": 13512, "acRate": "53.4%"}"
  title?: string;
  titleSlug?: string;
  topicEnTags?: string;
  topicTags?: string;
  translatedTitle?: string;
  updateTime?: string;
  urlCnAddress?: string;
  urlEnAddress?: string;
}
