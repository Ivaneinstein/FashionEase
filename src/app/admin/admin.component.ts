import { Component, signal } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import {
  BrnPopoverComponent,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';

type Framework = { label: string; value: string };

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, HlmIconComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
          HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [provideIcons({ lucideChevronDown })],

})
export class AdminComponent {
  

  
}
