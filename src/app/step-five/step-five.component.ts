import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '@app/_services';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.less', '../patient/patient.component.scss']
})
export class StepFiveComponent implements OnInit {
  public stepFiveForm: FormGroup;
  state!: string;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(private fb: FormBuilder, private patientService: PatientService, 
    private router: Router
  ) {
    this.stepFiveForm = this.fb.group({
      dateOfAccident: this.fb.control('', Validators.required),
      dateOfAssesment: this.fb.control('', Validators.required),
      symptoms: this.fb.group({
        physical: this.fb.control('', Validators.required),
        cognitive: this.fb.control('', Validators.required),
        emotional: this.fb.control('', Validators.required),
        sleepArousal: this.fb.control('', Validators.required),
      }),
      balance: this.fb.group({
        mbess: this.fb.control('', Validators.required),
      }),
      cognitive: this.fb.group({
        memory: this.fb.control('', Validators.required),
        reactionTime: this.fb.control('', Validators.required),
        impulseControl: this.fb.control('', Validators.required),
        inspectionTime: this.fb.control('', Validators.required),
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
    this.state = 'done';
    console.log(this.stepFiveForm);
    if (!this.stepFiveForm.invalid) {
      this.patientService.setPatientData({ 'section_5': this.stepFiveForm.value });
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
