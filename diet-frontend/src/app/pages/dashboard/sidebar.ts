import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Important: Import RouterModule
  template: `
    <nav class="flex-1 px-4 py-6 space-y-2">
      <a
        *ngFor="let item of navItems"
        [routerLink]="item.path"
        routerLinkActive="bg-mint-50 text-mint-700 border-mint-200"
        [routerLinkActiveOptions]="{ exact: item.path === '/dashboard' }"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all border border-transparent"
      >
        {{ item.label }}
      </a>
    </nav>
  `,
})
export class SidebarComponent {
  navItems = [
    { icon: 'home', label: 'Dashboard', path: '/dashboard' },
    { icon: 'calendar', label: 'Calendar', path: '/dashboard/calendar' },
  ];
}
