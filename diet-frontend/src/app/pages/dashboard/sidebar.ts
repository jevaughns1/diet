import { Component } from '@angular/core';

interface NavItem {
  icon: string;
  label: string;
  active: boolean;
}

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  imports: [CommonModule],
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { icon: 'lucide-home', label: 'Dashboard', active: true },
    { icon: 'lucide-apple', label: 'Meals', active: false },
    { icon: 'lucide-target', label: 'Goals', active: false },
    { icon: 'lucide-trending-up', label: 'Progress', active: false },
    { icon: 'lucide-calendar', label: 'Calendar', active: false },
    { icon: 'lucide-award', label: 'Achievements', active: false },
  ];
}
