import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // BehaviorSubject to hold the value from Step 1
  private dateOfIncidentSubject = new BehaviorSubject<string>('');

  // Observable to track changes to the value from Step 1
  stepOneValue$ = this.dateOfIncidentSubject.asObservable();

  // Function to update the value from Step 1
  updateStepOneValue(value: string) {
    this.dateOfIncidentSubject.next(value);
  }
}