import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-contact-us',
  standalone: false,

  templateUrl: './contact-us.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  constructor(private config: ConfigService, private sanitizer: DomSanitizer) { }
  private email = this.config.contactForm;
  private title = this.config.title || this.config.shortTitle;
  public formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://form.jotform.com/261085320887057?farm_email=${encodeURIComponent(this.email)}&farm_name=${encodeURIComponent(this.title)}`);
}
