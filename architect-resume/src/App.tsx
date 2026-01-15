import React from 'react';
import Header from './components/Header';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import CertificationsSection from './components/CertificationsSection';

const App: React.FC = () => {
  const personalInfo = {
    name: "Dr. Jean-Pierre Dubois",
    title: "Senior Application Architect",
    location: "Paris, France | Brussels, Belgium",
    email: "jpdubois@architect.tech",
    phone: "+33 6 12 34 56 78",
    linkedin: "linkedin.com/in/jeanpierredubois"
  };

  const experiences = [
    {
      company: "European Commission - Directorate-General for Informatics",
      position: "Principal Application Architect",
      duration: "2018 - Present",
      location: "Brussels, Belgium",
      responsibilities: [
        "Lead architectural design and governance for 50+ enterprise applications serving 500,000+ EU citizens",
        "Establish and implement microservices architecture patterns across multi-cloud environments (AWS, Azure, GCP)",
        "Define API management strategies and service mesh implementations for cross-border digital services",
        "Mentor team of 15 architects and senior developers across 8 EU member states",
        "Ensure compliance with GDPR, NIS2 Directive, and EU cybersecurity frameworks"
      ],
      technologies: ["Kubernetes", "Docker", "Istio", "GraphQL", "Spring Boot", "Node.js", "React", "AWS", "Azure"]
    },
    {
      company: "BNP Paribas - Corporate & Investment Banking",
      position: "Enterprise Solutions Architect",
      duration: "2012 - 2018",
      location: "Paris, France",
      responsibilities: [
        "Designed and implemented real-time trading platform architecture handling 1M+ transactions daily",
        "Led digital transformation initiatives for retail banking across 15 European countries",
        "Established DevOps practices and CI/CD pipelines reducing deployment time by 75%",
        "Architected fraud detection systems using machine learning and big data technologies",
        "Managed technology risk assessment and compliance with Basel III and MiFID II regulations"
      ],
      technologies: ["Java EE", "Microservices", "Apache Kafka", "Elasticsearch", "MongoDB", "Docker", "Jenkins", "Splunk"]
    },
    {
      company: "Siemens AG - Digital Industries Software",
      position: "Senior Software Architect",
      duration: "2008 - 2012",
      location: "Munich, Germany",
      responsibilities: [
        "Architected Industry 4.0 solutions for manufacturing clients across Europe",
        "Designed scalable IoT platforms handling 10M+ connected devices",
        "Led cross-functional teams in agile development methodologies",
        "Implemented enterprise integration patterns using SAP and custom middleware"
      ],
      technologies: ["C#", ".NET", "WCF", "SAP PI/PO", "MQTT", "OPC UA", "SQL Server", "Azure"]
    },
    {
      company: "Capgemini Consulting",
      position: "Solution Architect",
      duration: "2003 - 2008",
      location: "Paris, France",
      responsibilities: [
        "Provided architectural consulting for Fortune 500 companies across Europe",
        "Designed enterprise resource planning (ERP) systems and custom business applications",
        "Led system integration projects merging legacy systems with modern architectures",
        "Conducted technology assessments and roadmap planning for C-level executives"
      ],
      technologies: ["J2EE", "Oracle", "IBM WebSphere", "SOA", "Web Services", "UML", "Rational Tools"]
    }
  ];

  const skillCategories = [
    {
      category: "Cloud & Infrastructure",
      skills: [
        { name: "AWS", level: "expert" as const },
        { name: "Azure", level: "expert" as const },
        { name: "Google Cloud", level: "advanced" as const },
        { name: "Kubernetes", level: "expert" as const },
        { name: "Docker", level: "expert" as const },
        { name: "Terraform", level: "advanced" as const }
      ]
    },
    {
      category: "Programming Languages",
      skills: [
        { name: "Java", level: "expert" as const },
        { name: "TypeScript/JavaScript", level: "expert" as const },
        { name: "Python", level: "advanced" as const },
        { name: "C#", level: "advanced" as const },
        { name: "Go", level: "intermediate" as const },
        { name: "SQL", level: "expert" as const }
      ]
    },
    {
      category: "Frameworks & Platforms",
      skills: [
        { name: "Spring Boot", level: "expert" as const },
        { name: "React", level: "advanced" as const },
        { name: "Node.js", level: "expert" as const },
        { name: ".NET Core", level: "advanced" as const },
        { name: "Angular", level: "intermediate" as const },
        { name: "Hibernate", level: "expert" as const }
      ]
    },
    {
      category: "Architecture & Design",
      skills: [
        { name: "Microservices", level: "expert" as const },
        { name: "Domain-Driven Design", level: "expert" as const },
        { name: "Event-Driven Architecture", level: "expert" as const },
        { name: "API Design", level: "expert" as const },
        { name: "System Integration", level: "expert" as const },
        { name: "Security Architecture", level: "advanced" as const }
      ]
    }
  ];

  const education = [
    {
      degree: "Ph.D. in Computer Science - Distributed Systems",
      institution: "École Polytechnique Fédérale de Lausanne (EPFL)",
      location: "Lausanne, Switzerland",
      duration: "1999 - 2003",
      achievements: [
        "Dissertation: 'Scalable Architectures for Enterprise Distributed Systems'",
        "Published 12 papers in peer-reviewed journals and conferences",
        "Graduated summa cum laude"
      ]
    },
    {
      degree: "Master of Science in Software Engineering",
      institution: "Technical University of Munich",
      location: "Munich, Germany",
      duration: "1997 - 1999",
      achievements: [
        "Focus on Software Architecture and Design Patterns",
        "GPA: 3.9/4.0"
      ]
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "École Centrale Paris",
      location: "Paris, France",
      duration: "1994 - 1997",
      achievements: [
        "Major in Software Systems and Networks",
        "Graduated with honors"
      ]
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-PRO-SAP-123456"
    },
    {
      name: "Azure Solutions Architect Expert",
      issuer: "Microsoft",
      date: "2022",
      credentialId: "AZ-305"
    },
    {
      name: "TOGAF 9.2 Certified",
      issuer: "The Open Group",
      date: "2021",
      credentialId: "OG0-092"
    },
    {
      name: "Certified Kubernetes Security Specialist (CKS)",
      issuer: "Cloud Native Computing Foundation",
      date: "2022",
      credentialId: "CKS-2022-001"
    },
    {
      name: "Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "PCA-2023-789012"
    },
    {
      name: "Certified Information Systems Security Professional (CISSP)",
      issuer: "ISC²",
      date: "2020",
      credentialId: "CISSP-789012"
    }
  ];

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
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
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
