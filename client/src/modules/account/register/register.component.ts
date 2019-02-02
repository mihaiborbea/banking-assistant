import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'modules/auth/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;

  private _unsubscribeAll: Subject<any>;

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
    this._unsubscribeAll = new Subject();
  }

  public ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm
      .get('password')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public async submit(): Promise<void> {
    try {
      const registered = await this._authService.register(this.registerForm.value);
      if (registered) {
        this._router.navigate(['account', 'login']);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
