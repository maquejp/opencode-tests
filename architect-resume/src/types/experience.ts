export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies?: string[];
}

export interface ExperienceSectionProps {
  experiences: Experience[];
}