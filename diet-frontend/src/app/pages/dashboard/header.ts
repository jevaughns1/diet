import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Bell, Search, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true, // 1. Must be standalone to be imported by Dashboard
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  // 2. This @Input fixes the NG8002 binding error
  @Input() user: any = null;

  // Icons for your header UI
  readonly BellIcon = Bell;
  readonly SearchIcon = Search;
  readonly ChevronDown = ChevronDown;

  get initials(): string {
    if (!this.user?.name) return 'U';
    return this.user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }
}
