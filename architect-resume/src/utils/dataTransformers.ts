import { 
  PersonalInfo, 
  Experience, 
  SkillCategory, 
  Education, 
  Certification 
} from '../types';
import * as rawData from '../data';

// Type assertion utility for consistent data transformation
export const transformData = {
  personalInfo: rawData.personalInfo as PersonalInfo,
  experiences: rawData.experiences as Experience[],
  skillCategories: rawData.skillCategories as SkillCategory[],
  education: rawData.education as Education[],
  certifications: rawData.certifications as Certification[]
};

// Alternative: Individual transformer functions for more control
export const transformPersonalInfo = (data: any): PersonalInfo => data as PersonalInfo;
export const transformExperiences = (data: any): Experience[] => data as Experience[];
export const transformSkillCategories = (data: any): SkillCategory[] => data as SkillCategory[];
export const transformEducation = (data: any): Education[] => data as Education[];
export const transformCertifications = (data: any): Certification[] => data as Certification[];

// Bulk transformer function
export const getAllTransformedData = () => ({
  personalInfo: transformPersonalInfo(rawData.personalInfo),
  experiences: transformExperiences(rawData.experiences),
  skillCategories: transformSkillCategories(rawData.skillCategories),
  education: transformEducation(rawData.education),
  certifications: transformCertifications(rawData.certifications)
});