import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AssistantService, PatientService, SharedService } from '@app/_services';
import { Options } from '@angular-slider/ngx-slider';
import { Account } from '@app/_models';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.less', '../patient/patient.component.scss']
})
export class StepFiveComponent implements OnInit {
  public stepFiveForm: FormGroup;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(private fb: FormBuilder, private patientService: PatientService, 
    private router: Router, private sharedService: SharedService
  ) {
    this.stepFiveForm = this.fb.group({
      symptoms: this.fb.group({
        physical: this.fb.control(0, Validators.required),
        cognitive: this.fb.control(0, Validators.required),
        emotional: this.fb.control(0, Validators.required),
        sleepArousal: this.fb.control(0, Validators.required),
      }),
      balance: this.fb.group({
        Sway_MBESS_Percentile: this.fb.control(0, Validators.required),
      }),
      cognitive: this.fb.group({
        Sway_Memory_Percentile: this.fb.control(0, Validators.required),
        Sway_ReactionTime_Percentile: this.fb.control(0, Validators.required),
        Sway_ImpulseControl_Percentile: this.fb.control(0, Validators.required),
        Sway_InspectionTime_Percentile: this.fb.control(0, Validators.required),
      })
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.stepFiveForm.controls; }

  get fs() { return (this.stepFiveForm.get('symptoms') as FormGroup).controls; }

  get fba() { return (this.stepFiveForm.get('balance') as FormGroup).controls; }

  get fc() { return (this.stepFiveForm.get('cognitive') as FormGroup).controls; }

  stepFiveSubmit() {
    console.log(this.stepFiveForm);
    this.patientService.deletePatientData('section_5');
    if (!this.stepFiveForm.invalid) {
      this.patientService.setPatientData({ 'section_5': this.stepFiveForm.value });
      this.sharedService.updatePatientReviewData(this.patientService.getPatientData());
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
