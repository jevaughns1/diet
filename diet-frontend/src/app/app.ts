import { Component, signal, computed, inject } from '@angular/core'; // Add inject
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Bell, ChevronDown, LogOut } from 'lucide-angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Inject the service directly into a property
  private authService = inject(AuthService);
  public router = inject(Router);

  // Now 'this.authService' is guaranteed to be available here
  user = this.authService.user;

  readonly SearchIcon = Search;
  readonly BellIcon = Bell;
  readonly ChevronDown = ChevronDown;
  readonly LogOutIcon = LogOut;

  initials = computed(() => {
    const u = this.user();
    if (!u || !u.userName) return '??';
    return u.userName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  });

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
