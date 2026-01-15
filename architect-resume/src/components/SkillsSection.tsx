import React from 'react';

interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'basic';
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'from-accent-500 to-accent-600';
      case 'advanced':
        return 'from-primary-500 to-primary-600';
      case 'intermediate':
        return 'from-secondary-500 to-secondary-600';
      case 'basic':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert':
        return 'w-full';
      case 'advanced':
        return 'w-4/5';
      case 'intermediate':
        return 'w-3/5';
      case 'basic':
        return 'w-2/5';
      default:
        return 'w-2/5';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'expert':
        return '⭐⭐⭐⭐⭐';
      case 'advanced':
        return '⭐⭐⭐⭐';
      case 'intermediate':
        return '⭐⭐⭐';
      case 'basic':
        return '⭐⭐';
      default:
        return '⭐⭐';
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Technical Skills
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-secondary-500 to-primary-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-2xl transform -rotate-1 group-hover:rotate-1 transition-transform duration-300"></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover-lift border border-primary-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {category.category.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group/item">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-800 font-semibold text-lg group-hover/item:text-primary-600 transition-colors">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 capitalize font-medium bg-gray-100 px-2 py-1 rounded-full">
                            {skill.level}
                          </span>
                          <span className="text-sm">{getLevelIcon(skill.level)}</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)} transition-all duration-1000 ease-out relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;