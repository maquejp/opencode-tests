import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../../models/resume.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  @Input() skillCategories!: SkillCategory[];

  getCategoryInitials(categoryName: string): string {
    return categoryName.substring(0, 2).toUpperCase();
  }
}
