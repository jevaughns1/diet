import { Component } from '@angular/core';
import { LucideAngularModule, Facebook, Twitter, Instagram, Linkedin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <footer class="bg-gray-900 text-gray-300 py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div class="md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center"
              >
                <span class="text-white font-bold text-lg">DS</span>
              </div>
              <span class="text-xl font-bold text-white">Diet Smart</span>
            </div>
            <p class="text-sm text-gray-400 mb-6">
              Your personal nutrition coach for achieving fitness goals.
            </p>

            <div class="flex gap-3">
              <a
                href="#"
                class="w-9 h-9 bg-gray-800 hover:bg-mint-600 text-gray-300 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <lucide-icon [name]="Facebook" class="w-4 h-4"></lucide-icon>
              </a>
              <a
                href="#"
                class="w-9 h-9 bg-gray-800 hover:bg-mint-600 text-gray-300 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <lucide-icon [name]="Twitter" class="w-4 h-4"></lucide-icon>
              </a>
              <a
                href="#"
                class="w-9 h-9 bg-gray-800 hover:bg-mint-600 text-gray-300 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <lucide-icon [name]="Instagram" class="w-4 h-4"></lucide-icon>
              </a>
              <a
                href="#"
                class="w-9 h-9 bg-gray-800 hover:bg-mint-600 text-gray-300 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <lucide-icon [name]="Linkedin" class="w-4 h-4"></lucide-icon>
              </a>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-white mb-4">Product</h3>
            <ul class="space-y-2">
              <li>
                <a href="#features" class="text-sm hover:text-mint-400 transition-colors"
                  >Features</a
                >
              </li>
              <li>
                <a href="#pricing" class="text-sm hover:text-mint-400 transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-mint-400 transition-colors">Download App</a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-mint-400 transition-colors">Integrations</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-white mb-4">Company</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-sm hover:text-mint-400 transition-colors">About Us</a>
              </li>
              <li><a href="#" class="text-sm hover:text-mint-400 transition-colors">Blog</a></li>
              <li><a href="#" class="text-sm hover:text-mint-400 transition-colors">Careers</a></li>
              <li><a href="#" class="text-sm hover:text-mint-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-white mb-4">Legal</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-sm hover:text-mint-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-mint-400 transition-colors"
                  >Terms of Service</a
                >
              </li>
              <li>
                <a href="#" class="text-sm hover:text-mint-400 transition-colors">Cookie Policy</a>
              </li>
              <li><a href="#" class="text-sm hover:text-mint-400 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div
          class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-gray-500">© 2026 Diet Smart. All rights reserved.</p>
          <div class="flex gap-6 text-sm">
            <a href="#" class="text-gray-500 hover:text-mint-400 transition-colors">Support</a>
            <a href="#" class="text-gray-500 hover:text-mint-400 transition-colors">Help Center</a>
            <a href="#" class="text-gray-500 hover:text-mint-400 transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  // Define icons for the template
  readonly Facebook = Facebook;
  readonly Twitter = Twitter;
  readonly Instagram = Instagram;
  readonly Linkedin = Linkedin;
}
