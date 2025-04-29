import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'component-header-admin',
  standalone: false,
  templateUrl: './header-admin.component.html',
})
export class HeaderAdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
