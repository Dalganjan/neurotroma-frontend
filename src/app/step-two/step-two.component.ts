import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService, SharedService } from '@app/_services';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss', '../patient/patient.component.scss']
})
export class StepTwoComponent implements OnInit {
  public stepTwoForm: FormGroup;
  public dateOfInjury: string = '';

  constructor(private fb: FormBuilder, private patientService: PatientService, 
    private router: Router, private sharedService: SharedService
  ) {
    this.stepTwoForm = this.fb.group({
      dizziness: this.fb.control('', Validators.required),
      headaches: this.fb.control('', Validators.required),
      hearingChanges: this.fb.control('', Validators.required),
      visionChanges: this.fb.control('', Validators.required),
      balanceChanges: this.fb.control('', Validators.required),
      nauseaOrVomiting: this.fb.control('', Validators.required),
      lightSensitivity: this.fb.control('', Validators.required),
      brightLight: this.fb.control('', Validators.required),
      noiseSensitivity: this.fb.control('', Validators.required),
      loudNoises: this.fb.control('', Validators.required),
      sleepDisturbance: this.fb.control('', Validators.required),
      fatigue: this.fb.control('', Validators.required),
      beingIrritable: this.fb.control('', Validators.required),
      feelingDepressed: this.fb.control('', Validators.required),
      feelingAnxious: this.fb.control('', Validators.required),
      poorMemory: this.fb.control('', Validators.required),
      poorConcentration: this.fb.control('', Validators.required),
      feelingMentallyFoggy: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.sharedService.stepOneValue$.subscribe(value => {
      this.dateOfInjury = value;
    });
  }

  get f() {
    return this.stepTwoForm.controls;
  }

  stepTwoSubmit() {
    this.patientService.deletePatientData('section_2');
    if (!this.stepTwoForm.invalid) {
      this.patientService.setPatientData({ 'section_2': this.stepTwoForm.value });
      this.sharedService.updateStepOneValue(this.dateOfInjury);
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
