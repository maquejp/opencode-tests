import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/resume.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  @Input() experiences!: Experience[];

  getCompanyInitials(company: string): string {
    return company.split(' ').map(n => n[0]).join('').substring(0, 2);
  }
}
