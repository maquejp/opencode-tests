import React, { useEffect, useState } from 'react';
import { 
  Header,
  ExperienceSection,
  SkillsSection,
  EducationSection,
  CertificationsSection
} from './components';
import { fetchAllData, getAllTransformedData } from './utils/dataTransformers';

const App: React.FC = () => {
  const [data, setData] = useState(() => getAllTransformedData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData().then(apiData => {
      setData(apiData);
      setLoading(false);
    }).catch(error => {
      console.error('Failed to load data:', error);
      setLoading(false);
    });
  }, []);

  const {
    personalInfo,
    experiences,
    skillCategories,
    education,
    certifications
  } = data;

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading resume data...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <Header {...personalInfo} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection skillCategories={skillCategories} />
      <EducationSection education={education} />
      <CertificationsSection certifications={certifications} />
      
      <footer className="relative py-12 px-6 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-2xl mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {personalInfo.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">{personalInfo.name}</h3>
            <p className="text-white/80">{personalInfo.title}</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-6">
            <a href={`mailto:${personalInfo.email}`} className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Contact</span>
            </a>
            
            <a href={`tel:${personalInfo.phone}`} className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>Call</span>
            </a>
          </div>
          
          <div className="pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm">
              © 2024 {personalInfo.name}. Senior Application Architect with 25+ years of excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
