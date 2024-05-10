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
      Stanford_Dizziness: this.fb.control('', Validators.required),
      Stanford_Headache: this.fb.control('', Validators.required),
      Stanford_Hearing: this.fb.control('', Validators.required),
      Stanford_Vision: this.fb.control('', Validators.required),
      Stanford_Balance: this.fb.control('', Validators.required),
      Stanford_Nausea: this.fb.control('', Validators.required),
      Stanford_Lights: this.fb.control('', Validators.required),
      Stanford_Noises: this.fb.control('', Validators.required),
      Stanford_Sleep: this.fb.control('', Validators.required),
      Stanford_Fatigue: this.fb.control('', Validators.required),
      Stanford_Angered: this.fb.control('', Validators.required),
      Stanford_Depression: this.fb.control('', Validators.required),
      Stanford_Anxious: this.fb.control('', Validators.required),
      Stanford_Memory: this.fb.control('', Validators.required),
      Stanford_Concentration: this.fb.control('', Validators.required),
      Stanford_Mentally_Foggy: this.fb.control('', Validators.required),
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
