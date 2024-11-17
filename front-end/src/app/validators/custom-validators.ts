import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    const currentDate = new Date();
    const selectedDate = new Date(value);
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate >= currentDate ? null : { futureDate: 'Due date must be in the future' };
  };
}
