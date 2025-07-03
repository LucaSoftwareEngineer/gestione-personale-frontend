import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SecurityService } from '../../services/security.service';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  ls = new SecureLS();

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.validationToken();
  }

  periodicValidationToken = setInterval(() => {
    this.validationToken();
  }, 40000);

  validationToken() {
    this.securityService.validationToken(this.ls.get('user')).subscribe({
      next: (json) => {
        if (json.valido == false) {
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
