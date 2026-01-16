export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  achievements?: string[];
}

export interface EducationSectionProps {
  education: Education[];
}