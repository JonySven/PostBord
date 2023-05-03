import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../sherad/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  massage!: string
  form!: FormGroup;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }


  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if(params['loginAgain']){
        this.massage = 'Зарегистрируйтесь'
      }
    })
  }

  submit() {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.auth.isAuthenticatedMock = true
    })

  }


}
