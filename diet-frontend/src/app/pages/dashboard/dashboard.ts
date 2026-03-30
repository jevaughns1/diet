import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule],
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <app-sidebar
        class="hidden lg:block w-64 fixed h-full border-r border-gray-200 bg-white z-20"
      ></app-sidebar>

      <main class="flex-1 lg:ml-64 flex flex-col">
        <div class="p-6 lg:p-10 max-w-7xl mx-auto w-full">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent {}
