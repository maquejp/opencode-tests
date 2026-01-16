import React from 'react';
import Header from './components/Header';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import CertificationsSection from './components/CertificationsSection';
import { 
  PersonalInfo, 
  Experience, 
  SkillCategory, 
  Education, 
  Certification 
} from './types';
import personalInfo from './data/personal-info.json';
import experiences from './data/experience.json';
import skillCategories from './data/skills.json';
import education from './data/education.json';
import certifications from './data/certifications.json';

// Type assertions for imported JSON data
const typedPersonalInfo: PersonalInfo = personalInfo;
const typedExperiences: Experience[] = experiences;
const typedSkillCategories: SkillCategory[] = skillCategories as SkillCategory[];
const typedEducation: Education[] = education;
const typedCertifications: Certification[] = certifications;

const App: React.FC = () => {









  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <Header {...typedPersonalInfo} />
      <ExperienceSection experiences={typedExperiences} />
      <SkillsSection skillCategories={typedSkillCategories} />
      <EducationSection education={typedEducation} />
      <CertificationsSection certifications={typedCertifications} />
      
      <footer className="relative py-12 px-6 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-2xl mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {typedPersonalInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">{typedPersonalInfo.name}</h3>
            <p className="text-white/80">{typedPersonalInfo.title}</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-6">
            <a href={`mailto:${typedPersonalInfo.email}`} className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Contact</span>
            </a>
            
            <a href={`tel:${typedPersonalInfo.phone}`} className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>Call</span>
            </a>
          </div>
          
          <div className="pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm">
              © 2024 {typedPersonalInfo.name}. Senior Application Architect with 25+ years of excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
