import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService, SharedService } from '@app/_services';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss', '../patient/patient.component.scss']
})
export class StepOneComponent implements OnInit {
  public stepOneForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.stepOneForm = this.fb.group({
      dateOfIncident: ['', Validators.required],
      seatBeltUsage: ['', Validators.required],
      airbagDeployment: ['', Validators.required],
      headImpactForm: this.fb.group({
        isHeadImpacted: ['', Validators.required],
        headImpactPosition: [''],
      }),
      vehicleDamageForm: this.fb.group({
        windSheild: ['', Validators.required],
        windBroken: ['', Validators.required],
        carTotaled: ['', Validators.required],
      }),
      concussionMemoryForm: this.fb.group({
        concussion: ['', Validators.required],
        windowBroken: ['', Validators.required],
        carrTotaled: ['', Validators.required],
      })
    });
  }

  get f() {
    return this.stepOneForm.controls;
  }

  get fh() {
    return (this.stepOneForm.get('headImpactForm') as FormGroup).controls;
  }

  get fv() {
    return (this.stepOneForm.get('vehicleDamageForm') as FormGroup).controls;
  }

  get fc() {
    return (this.stepOneForm.get('concussionMemoryForm') as FormGroup).controls;
  }

  ngOnInit(): void {
  }

  stepOneSubmit() {
    this.patientService.deletePatientData('section_1');
    if (!this.stepOneForm.invalid) {
      this.patientService.setPatientData({ 'section_1': this.stepOneForm.value });
      this.sharedService.updateStepOneValue(this.stepOneForm.value.dateOfIncident);
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
