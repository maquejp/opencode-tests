import React from "react";
import { Education, EducationSectionProps } from "../types";

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-accent-50 via-white to-primary-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Education
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-500 to-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {education.map((edu: Education, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-200/30 to-primary-200/30 rounded-2xl transform rotate-1 group-hover:-rotate-1 transition-transform duration-300"></div>

              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover-lift border border-accent-100">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-accent-600 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="glass-effect px-4 py-2 rounded-full mb-2">
                      <p className="text-sm font-semibold text-accent-700">
                        {edu.duration}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {edu.location}
                    </p>
                  </div>
                </div>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="pt-6 border-t border-accent-100">
                    <p className="text-sm font-semibold text-accent-600 mb-3">
                      Key Achievements:
                    </p>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
