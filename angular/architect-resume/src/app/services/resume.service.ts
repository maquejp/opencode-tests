import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PersonalInfo, Experience, Education, Certification, SkillCategory } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient) {}

  getPersonalInfo(): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>('/assets/data/personal-info.json').pipe(
      catchError(() => of({
        name: 'Jean-Philippe Maquestiaux',
        title: 'Senior Application Architect',
        location: 'Neufchâteau, Belgium',
        email: 'jean-philippe@maquestiaux.net',
        phone: '+352 661 234 164',
        linkedin: 'linkedin.com/in/jeanphilippemaquestiaux'
      }))
    );
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>('/assets/data/experience.json');
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>('/assets/data/education.json');
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>('/assets/data/certifications.json');
  }

  getSkills(): Observable<SkillCategory[]> {
    return this.http.get<SkillCategory[]>('/assets/data/skills.json');
  }

  getAllData(): Observable<{
    personalInfo: PersonalInfo;
    experiences: Experience[];
    education: Education[];
    certifications: Certification[];
    skillCategories: SkillCategory[];
  }> {
    return this.http.get<any>('/assets/data/db.json').pipe(
      map(data => ({
        personalInfo: data.personalInfo,
        experiences: data.experiences,
        education: data.education,
        certifications: data.certifications,
        skillCategories: data.skillCategories
      })),
      catchError(() => {
        return of({
          personalInfo: {
            name: 'Jean-Philippe Maquestiaux',
            title: 'Senior Application Architect',
            location: 'Neufchâteau, Belgium',
            email: 'jean-philippe@maquestiaux.net',
            phone: '+352 661 234 164',
            linkedin: 'linkedin.com/in/jeanphilippemaquestiaux'
          },
          experiences: [],
          education: [],
          certifications: [],
          skillCategories: []
        });
      })
    );
  }
}