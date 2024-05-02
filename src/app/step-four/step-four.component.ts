import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '@app/_services';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {
  public stepFourForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService, 
    private router: Router
  ) {
    this.stepFourForm = this.fb.group({
      dateOfAccident: this.fb.control('', Validators.required),
      dateOfAssesment: this.fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.stepFourForm.controls; }

  stepFourSubmit() {
    this.patientService.resetPatientData();
    if (!this.stepFourForm.invalid) {
      this.patientService.setPatientData({ 'section_1': this.stepFourForm.value });
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }

}
