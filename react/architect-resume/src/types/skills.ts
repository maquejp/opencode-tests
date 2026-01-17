export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'basic';
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}