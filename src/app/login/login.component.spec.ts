
// //#region Testing Code
// import { DebugElement } from '@angular/core';
// import {
//   ComponentFixture,
//   fakeAsync,
//   TestBed,
//   tick,
//   waitForAsync,
// } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import { async, empty, Observable, of, throwError } from 'rxjs';
// import { LoginComponent } from './login.component';
// import { DataLoaderPortalService } from '../data-loader-portal.service';
// // import { of } from 'rxjs/observable/of';


// class Page {
//   get submitButton() {
//     return this.fixture.nativeElement.querySelector('button');
//   }
//   get usernameInput() {
//     return this.fixture.debugElement.nativeElement.querySelector('user');
//   }
//   get passwordInput() {
//     return this.fixture.debugElement.nativeElement.querySelector('password');
//   }

//   // get errorMsg() {
//   //   return this.fixture.debugElement.query(By.css('.error')).nativeElement;
//   // }

//   constructor(private fixture: ComponentFixture<LoginComponent>) {}

//   public updateValue(input: HTMLInputElement, value: string) {
//     input.value = value;
//     input.dispatchEvent(new Event('input'));
//   }
// }
// describe('Login Component', () => {
//   let loginComponent: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let debugEl: DebugElement;

//   let loginService: DataLoaderPortalService;
//   let loginServiceSpy: { login: jasmine.Spy };
//   let routerSpy: { navigateByUrl: jasmine.Spy };
//   let router: Router;
//   let page: Page;
//   beforeEach(() => {
//     loginServiceSpy = jasmine.createSpyObj(DataLoaderPortalService, ['Login']);
//     routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, FormsModule],
//       declarations: [LoginComponent],
//       providers: [
//         { provide: DataLoaderPortalService, useValue: loginServiceSpy },
//         { provide: Router, useValue: routerSpy },
//       ],
//     });
//     fixture = TestBed.createComponent(LoginComponent);
//     loginComponent = fixture.componentInstance;
//     debugEl = fixture.debugElement;
//     loginService = TestBed.inject(DataLoaderPortalService);
//     router = TestBed.inject(Router);
//     page = new Page(fixture);
//     loginComponent.ngOnInit();
//     fixture.detectChanges();
//   });

//   it('is created', () => {
//     expect(loginComponent).toBeDefined();
//   });
  
//   it('empty username', () => {
//     expect(loginComponent.loginForm.value.user).toBe('');
//   });
//   it('empty password', () => {
//     // page.updateValue(page.usernameInput, 'admin@gmail.com');
//     loginComponent.loginForm.value.user = "admin@gmail.com"
//     loginComponent.loginForm.value.password = ""
//     expect(loginComponent.loginForm.value.user).toBe('admin@gmail.com');
//     expect(loginComponent.loginForm.value.password).toBe('');
//     // page.submitButton.click();
//     fixture.detectChanges();
//     // expect(loginComponent.errorMessage).toBe('Please fill all fields');
//     // expect(page.errorMsg.textContent).toBe(loginComponent.errorMessage);
//   });
//   it('invalid username', () => {
//     loginComponent.loginForm.value.user = "admin@gmail.com";
//     expect(loginComponent.loginForm.value.user).toBe('admin@gmail.com');
//     fixture.detectChanges();
    
//   });
//   it('form invalid when empty', () => {
//     expect(loginComponent.loginForm.valid).toBeFalsy();
//   });
//   it('form invalid when enter wrong values', () => {
//     loginComponent.loginForm.value.user = "admin@gm";
//     loginComponent.loginForm.value.password = "admin";
//     expect(loginComponent.loginForm.valid).toBeFalsy();
//   });

//   it('should make the user control required', () => {
//     let control = loginComponent.loginForm.get('user');

//     control?.setValue('Admin@gmail');
    
//     expect(control?.valid).toBeFalsy();
//   });

//   it('should make the password control required ', () => {
//     let control = loginComponent.loginForm.get('password');

//     control?.setValue('Admin');
    
//     expect(control?.valid).toBeFalsy();
//   });

//   it('valid credentials', () =>{ fakeAsync(() =>{
//     fixture.detectChanges();
//     spyOn(loginComponent,'login');
//     let userControl = loginComponent.loginForm.get('user');
//         userControl?.setValue('Admin@gmail.com');
//         let passControl = loginComponent.loginForm.get('password');
//         passControl?.setValue('Admin@123');
//     // el=fixture.debugElement.query(By.css('Login')).nativeElement;
//     (loginService.Login as jasmine.Spy).and.returnValue(
//       Promise.resolve(true)
//     );

//      loginComponent.login();
//     // expect(loginComponent.login).toHaveBeenCalledTimes(0);

//     fixture.whenStable().then(() => {
//             fixture.detectChanges();
//             const navArgs = (router.navigateByUrl as jasmine.Spy).calls.first()
//               .args[0];
//             expect(navArgs).toBe('/header');
//           });

//   })});

 

//   // it(
//   //   'Valid credentials',
//   //   fakeAsync(() => {
//   //     // page.updateValue(page.usernameInput, 'Admin@gmail.com');
//   //     // page.updateValue(page.passwordInput, 'Admin@123');

//   //     let userControl = loginComponent.loginForm.get('user');
//   //     userControl?.setValue('Admin@gmail.com');
//   //     let passControl = loginComponent.loginForm.get('password');
//   //     passControl?.setValue('Admin@123');
//   //     const response: any[] = [];

//   //     (loginService.Login as jasmine.Spy).and.returnValue(
//   //        true
//   //     );
      
//   //     loginComponent.login();
//   //     fixture.whenStable().then(() => {
//   //       fixture.detectChanges();
        
//   //       const navArgs = (router.navigateByUrl as jasmine.Spy).calls.first()
//   //         .args[0];
//   //       expect(navArgs).toBe('/header');
//   //     });
//   //   })
//   // );
//   // it('Invalid credentials', fakeAsync(() => {
//   //   let userControl = loginComponent.loginForm.get('user');
//   //       userControl?.setValue('Admin');
//   //       let passControl = loginComponent.loginForm.get('password');
//   //       passControl?.setValue('Admi');
//   //   // (loginService.Login as jasmine.Spy).and.returnValue(Promise.resolve(false));
//   //   (loginService.Login as jasmine.Spy).and.returnValue('');
//   //   loginComponent.login();
//   //   tick();
//   //   fixture.detectChanges();
//   //   expect(loginComponent.alertMessage).toBe('Invalid Credentials');
//   // }));
//   // it('Login Error', fakeAsync(() => {
//   //   page.updateValue(page.usernameInput, 'admin');
//   //   page.updateValue(page.passwordInput, 'admin');
//   //   (loginService.login as jasmine.Spy).and.rejectWith(
//   //     throwError('Login failed')
//   //   );
//   //   page.submitButton.click();
//   //   tick();
//   //   fixture.detectChanges();
//   //   expect(loginComponent.errorMessage).toBe('Login Failed');
//   //   expect(page.errorMsg.textContent).toBe(loginComponent.errorMessage);
//   // }));
// });
// //#endregion


//#region 
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataLoaderPortalService } from '../data-loader-portal.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DataLoaderPortalService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ], 
       providers: [DataLoaderPortalService,DatePipe],
      imports: [HttpClientModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login form validation - user check', () => {
    let user = component.loginForm.controls['user'];
    expect(user.valid).toBeFalsy();
    expect(user.errors).toBeTruthy();
    });

  it('Login form validation - set email id check', () => {
    let user = component.loginForm.controls['user'];
    user.setValue('Test@test.com');
    expect(user.valid).toBeTruthy();
    expect(user.value).toEqual('Test@test.com');
    });

    it('Login form  validation - password check', () => {
      let password = component.loginForm.controls['password'];
      expect(password.valid).toBeFalsy();
      expect(password.errors).toBeTruthy();
      });
  
    it('Login form  validation - set password check', () => {
      let password = component.loginForm.controls['password'];
      password.setValue('Test@123');
      expect(password.valid).toBeTruthy();
      expect(password.value).toEqual('Test@123');
      });

      it('Login form  validation - invalid form then disable login button', () => {
               expect(fixture.nativeElement.querySelector('button').disabled).toBeTruthy();
        });

        it('Login form  validation - valid form then enable login button', () => {
          expect(fixture.nativeElement.querySelector('button').disable).toBeFalsy();
   });

      it('form invalid when empty', () => {
        expect(component.loginForm.valid).toBeFalsy();
      });
      it('form invalid when enter wrong values', () => {
        component.loginForm.value.user = "admin@gm";
        component.loginForm.value.password = "admin";
        expect(component.loginForm.valid).toBeFalsy();
      });

      it('valid credentials', () =>{ fakeAsync (() =>{
            fixture.detectChanges();
            spyOn(component,'login');
            let userControl = component.loginForm.get('user');
                userControl?.setValue('Admin@gmail.com');
                let passControl = component.loginForm.get('password');
                passControl?.setValue('Admin@123');
                
            (service.Login as jasmine.Spy).and.returnValue(
              Promise.resolve(true)
            );
        
             component.login();
            
            tick();
            expect(component.login).toHaveBeenCalledTimes(0);

            fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const navArgs = (router.navigateByUrl as jasmine.Spy).calls.first()
                      .args[0];
                    expect(navArgs).toBe('/header');
                  });
                  
          })});


});

//#endregion

