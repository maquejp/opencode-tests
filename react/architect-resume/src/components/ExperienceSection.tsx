import React from "react";
import { Experience, ExperienceSectionProps } from "../types";

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-white via-primary-50 to-secondary-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Professional Experience
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp: Experience, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-8 hover-lift border border-primary-100">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {exp.company
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-lg text-primary-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="glass-effect px-4 py-2 rounded-full mb-2">
                      <p className="text-sm font-semibold text-primary-700">
                        {exp.duration}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-accent-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {exp.location}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-600 mb-3">
                      Technologies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm rounded-full font-medium hover:from-primary-200 hover:to-secondary-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default ExperienceSection;
