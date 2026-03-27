import { Component } from '@angular/core';
import { LucideAngularModule, ArrowRight, Play } from 'lucide-angular';
import { HowItWorksComponent } from './how-it-works.component';
import { FooterComponent } from './footer.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule, HowItWorksComponent, FooterComponent, RouterOutlet],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  // Expose icons to the template
  constructor(public router: Router) {}
  readonly ArrowRight = ArrowRight;
  readonly Play = Play;
}
