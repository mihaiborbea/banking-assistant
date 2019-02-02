import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { AuthService } from 'modules/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private readonly _fuseConfigService: FuseConfigService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }
  public ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public async submit(): Promise<void> {
    try {
      const logged = await this._authService.login(this.loginForm.value);
      if (logged) {
        this._router.navigate(['dashboards', 'transactions']);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
