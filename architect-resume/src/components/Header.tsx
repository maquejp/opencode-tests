import React from 'react';
import { PersonalInfo } from '../types';

interface HeaderProps extends PersonalInfo {}

const Header: React.FC<HeaderProps> = ({ name, title, location, email, phone, linkedin }) => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-500 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="floating mb-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-28 h-28 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {name}
          </h1>
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl text-white/90 font-medium mb-2">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift cursor-default">
              <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{location}</span>
            </div>
            
            <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift cursor-default">
              <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="font-medium">{email}</span>
            </div>
            
            <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift cursor-default">
              <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-medium">{phone}</span>
            </div>
            
            {linkedin && (
              <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 hover-lift cursor-default">
                <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">LinkedIn</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </header>
  );
};

export default Header;