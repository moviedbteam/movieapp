import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  
  loginForm!:FormGroup;
  isSubmitted:boolean = false;
  userData:any;

  constructor(
    private fb:FormBuilder, 
    public userSvc:UserService,
    private alertSvc:AlertService,
    private router:Router
    ) {}

  ngOnInit() {
    
    this.loginForm = this.fb.group ({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5)]],

    });

    let userDataInStorage = localStorage.getItem('userData');
    this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};

  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  onSubmit() {

    if(this.loginForm.valid) {

      this.userSvc.login(this.loginForm.value)
      .subscribe(
        {
          next: (response:any) => {
            console.log(response);
            
            let userData = {
              id: response.user.id,
              token: response.jwt,
              email: response.user.email,
              username: response.user.username,
            };
            localStorage.setItem('token', response.jwt);
            localStorage.setItem('userData', JSON.stringify(userData));


            if(response.jwt){  
              this.router.navigate(['/']);
              this.alertSvc.showAlert('Vous êtes connecté(e)');
            }
          },
          error: (err) => console.log('mon erreur'+err)
        }
      
      )
    } 
  }





  logoutAction() {
    this.userSvc.logout()
  }

}
