import { Component } from '@angular/core';
import { LucideAngularModule, UserPlus, Target, Utensils, TrendingUp } from 'lucide-angular';

interface Step {
  icon: any;
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [LucideAngularModule], // Removed NgComponentOutlet, not needed for Lucide
  template: `
    <section id="how-it-works" class="py-20 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4"
          >
            📋 How It Works
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your nutrition journey in minutes with our simple onboarding process.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div
            class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-mint-200 via-orange-200 to-mint-200 -translate-y-12"
            style="width: calc(100% - 8rem); margin-left: 4rem;"
          ></div>

          @for (step of steps; track step.number) {
            <div class="relative">
              <div
                class="h-full bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-mint-300 transition-all duration-300 relative z-10 shadow-sm hover:shadow-md"
              >
                <div
                  class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-mint-500 to-mint-600 text-white flex items-center justify-center font-bold text-lg shadow-lg"
                >
                  {{ step.number }}
                </div>

                <div
                  class="w-14 h-14 rounded-xl bg-mint-50 text-mint-600 flex items-center justify-center mb-6 mt-4"
                >
                  <lucide-icon [name]="step.icon" class="w-7 h-7"></lucide-icon>
                </div>

                <h3 class="text-xl font-semibold text-gray-800 mb-3">
                  {{ step.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class HowItWorksComponent {
  // Map the imported icons to properties so the template can access them via the array
  readonly UserPlus = UserPlus;
  readonly Target = Target;
  readonly Utensils = Utensils;
  readonly TrendingUp = TrendingUp;

  steps: Step[] = [
    {
      icon: UserPlus,
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and tell us about your diet preferences, fitness goals, and lifestyle.',
    },
    {
      icon: Target,
      number: '02',
      title: 'Set Your Goals',
      description: 'Choose from Keto, Paleo, Vegan, or customize your own nutrition targets.',
    },
    {
      icon: Utensils,
      number: '03',
      title: 'Track Your Meals',
      description: 'Log your meals effortlessly with our smart food database and quick entry.',
    },
    {
      icon: TrendingUp,
      number: '04',
      title: 'Monitor Progress',
      description: 'Watch your progress in real-time with visual analytics and insights.',
    },
  ];
}
