import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { ExperienceComponent } from './components/experience/experience';
import { SkillsComponent } from './components/skills/skills';
import { EducationComponent } from './components/education/education';
import { CertificationsComponent } from './components/certifications/certifications';
import { ResumeService } from './services/resume.service';
import { PersonalInfo, Experience, Education, Certification, SkillCategory } from './models/resume.model';

interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skillCategories: SkillCategory[];
  education: Education[];
  certifications: Certification[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent,
    CertificationsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('angular-architect-resume');
  
  resumeData = signal<ResumeData>({
    personalInfo: {
      name: 'Jean-Philippe Maquestiaux',
      title: 'Senior Application Architect',
      location: 'Neufchâteau, Belgium',
      email: 'jean-philippe@maquestiaux.net',
      phone: '+352 661 234 164',
      linkedin: 'linkedin.com/in/jeanphilippemaquestiaux'
    },
    experiences: [],
    skillCategories: [],
    education: [],
    certifications: []
  });

  loading = signal(true);

  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.loadResumeData();
  }

  private loadResumeData() {
    this.resumeService.getAllData().subscribe({
      next: (data) => {
        this.resumeData.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map((n: string) => n[0]).join('');
  }
}
