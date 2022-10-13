import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { DataLoaderPortalService } from '../data-loader-portal.service';
import { Location } from '@angular/common';
import { ForgetpasswordComponent } from './forgetpassword.component';

describe('ForgetpasswordComponent', () => {
  let component: ForgetpasswordComponent;
  let fixture: ComponentFixture<ForgetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetpasswordComponent ],
      providers: [DataLoaderPortalService],
      imports: [ReactiveFormsModule,AppRoutingModule,HttpClientModule,RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Forget password form  validation - email id check', () => {
    let user = component.forgetPassForm.controls['user'];
    expect(user.valid).toBeFalsy();
    expect(user.errors).toBeTruthy();
    });

  it('Search patient form  validation - set email id check', () => {
    let user = component.forgetPassForm.controls['user'];
    user.setValue('Test@test.com');
    expect(user.valid).toBeTruthy();
    expect(user.value).toEqual('Test@test.com');
    });

    it('Forget password form  validation - password check', () => {
      let password = component.forgetPassForm.controls['password'];
      expect(password.valid).toBeFalsy();
      expect(password.errors).toBeTruthy();
      });
  
    it('Search patient form  validation - set password check', () => {
      let password = component.forgetPassForm.controls['password'];
      password.setValue('Test@123');
      expect(password.valid).toBeTruthy();
      expect(password.value).toEqual('Test@123');
      });

      it('Forget password form  validation - confirm password check', () => {
        let confirmPassword = component.forgetPassForm.controls['confirmPassword'];
        expect(confirmPassword.valid).toBeFalsy();
        expect(confirmPassword.errors).toBeTruthy();
        });
    
      it('Forget password form  validation - set confirm password check', () => {
        let confirmPassword = component.forgetPassForm.controls['confirmPassword'];
        let Password = component.forgetPassForm.controls['password'];
        confirmPassword.setValue('Test@123');
        Password.setValue('Test@123');
        expect(confirmPassword.valid).toBeTruthy();
        expect(confirmPassword.value).toEqual(Password.value);
        });

        it('Forget password form  validation - change password click', () => {
          expect(component.forgetPassForm.invalid).toBeTruthy();
      
          let service = fixture.debugElement.injector.get(DataLoaderPortalService);
          let data =  [
            {
            }];
      
          spyOn(service,'ForgetPassowrd').and.callFake(() => {
            return of(
             data
              )
                });
      
          let user = component.forgetPassForm.controls['user'];
          user.setValue('Test@gmail.com');
          let password = component.forgetPassForm.controls['password'];
          password.setValue('Test@123');
      
          component.ChangePasswordClick();
          fixture.detectChanges();
      
          expect(component.alertMessage).toEqual('Password changed successfully.');
      
          expect(component.alertClass).toEqual('alert-success');

          let objRouter : Router;
          let location : Location;
          
          objRouter = TestBed.inject(Router);
          location = TestBed.inject(Location);
      
        fixture.detectChanges();
        fixture.whenStable().then( () =>{
          expect(location.path()).toEqual('/login');
        })
      
      
          });


});
