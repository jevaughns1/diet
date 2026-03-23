import { Component } from '@angular/core';
import { LucideAngularModule, ArrowRight, Play } from 'lucide-angular';
import { HowItWorksComponent } from './how-it-works.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule, HowItWorksComponent, FooterComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  // Expose icons to the template
  readonly ArrowRight = ArrowRight;
  readonly Play = Play;
}
