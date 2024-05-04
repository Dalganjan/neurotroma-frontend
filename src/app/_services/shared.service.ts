import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // BehaviorSubject to hold the value from Step 1
  private dateOfIncidentSubject = new BehaviorSubject<string>('');
  private patientIdSubject = new BehaviorSubject<string>('');
  private patientReviewSubject =  new BehaviorSubject<any>([]);

  // Observable to track changes to the value from Step 1
  stepOneValue$ = this.dateOfIncidentSubject.asObservable();
  patientIdValue$ = this.patientIdSubject.asObservable();
  patientReviewValue$ = this.patientReviewSubject.asObservable();

  // Function to update the value from Step 1
  updateStepOneValue(value: string) {
    this.dateOfIncidentSubject.next(value);
  }

  updatePatientIdValue(value: string) {
    this.patientIdSubject.next(value);
  }

  getPatientId() {
    this.patientIdSubject.getValue();
  }

  updatePatientReviewData(value: any[]) {
    this.patientReviewSubject.next(value);
  }
}