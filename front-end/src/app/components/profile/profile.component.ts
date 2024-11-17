import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interface/user.interface'; 
import { UserService } from '../../services/user.service';  

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  user: IUser = {  
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    nuid: ''
  };
  isEditable: boolean = false;  
  successMessage: string = '';
  errorMessage: string = '';  
  constructor(private userService: UserService) {
    this.profileForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }), 
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }), 
      nuid: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (user: IUser) => {
        this.user = user;
        this.profileForm.patchValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          nuid: user.nuid,
        });
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.profileForm.valid) {
      // Use 'any' for profileData as per your request
      const profileData: any = {
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
      };

      this.userService.updateUserProfile(profileData).subscribe(
        (updatedUser) => {
          console.log('Profile updated successfully:', updatedUser);
          this.toggleEditability();        
          this.successMessage = 'Profile updated successfully!';
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.errorMessage = 'Error updating profile. Please try again.';
          this.successMessage = '';  
          
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  toggleEditability(): void {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.profileForm.get('firstName')?.enable();
      this.profileForm.get('lastName')?.enable();
    } else {
      this.profileForm.get('firstName')?.disable();
      this.profileForm.get('lastName')?.disable();
    }
  }

}
