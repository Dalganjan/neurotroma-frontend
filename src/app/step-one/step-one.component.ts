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
      Intro_DateOf_Incident: ['', Validators.required],
      Intro_Seatbelt: ['', Validators.required],
      Intro_Airbags: ['', Validators.required],
      headImpactForm: this.fb.group({
        Intro_Head_Impact: ['', Validators.required],
        Intro_HeadInjury_Location: [''],
      }),
      vehicleDamageForm: this.fb.group({
        Intro_Windshield: ['', Validators.required],
        Intro_Windows: ['', Validators.required],
        Intro_Totaled: ['', Validators.required],
      }),
      concussionMemoryForm: this.fb.group({
        Intro_LossOf_Conciousness: ['', Validators.required],
        Intro_LossOf_Conciousness_Time: [''],
        Intro_LossOf_Memory: ['', Validators.required],
      }),
      Intro_LossOf_Seizures: this.fb.control('', Validators.required),
      mentalStatus: this.fb.group({
        Intro_Altered_Mental_Status: ['', Validators.required],
        Intro_Altered_Mental_Status_Description: ['']
      }),
      vehicleImpact: this.fb.group({
        Intro_Direction_of_Accident: ['', Validators.required],
        Intro_Multiple_Impacts: ['', Validators.required],
      }),
      extrication: this.fb.group({
        Intro_Self_Extraction: ['', Validators.required],
        Intro_EMS_Extraction: ['', Validators.required],
      }),
      medicalEvaluation: this.fb.group({
        Intro_EmergencyRoom: ['', Validators.required],
        Intro_EmergencyRoom_CT_MRI: [''],
        Intro_EmergencyRoom_CT_MRI_Results: [''],
      }),
      occupationHistory: this.fb.group({
        Intro_Occupation: ['', Validators.required],
        Intro_Occupation_Missed: ['', Validators.required],
        Intro_Education: ['', Validators.required],
        Intro_Degree: ['', Validators.required],
      }),
      Intro_Vision: this.fb.control('', Validators.required),
      medicalHistory: this.fb.group({
        Intro_History_Seizures: ['', Validators.required],
        Intro_History_Migraine: ['', Validators.required],
        Intro_History_Concussions: ['', Validators.required],
        Intro_History_ADHD: ['', Validators.required],
        Intro_History_Motion_Sickness: ['', Validators.required],
      }),
      Intro_Rehab_PT: this.fb.control('', Validators.required),
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

  get fms() {
    return (this.stepOneForm.get('mentalStatus') as FormGroup).controls;
  }

  get fvi() {
    return (this.stepOneForm.get('vehicleImpact') as FormGroup).controls;
  }

  get fex() {
    return (this.stepOneForm.get('extrication') as FormGroup).controls;
  }

  get fme() {
    return (this.stepOneForm.get('medicalEvaluation') as FormGroup).controls;
  }

  get foh() {
    return (this.stepOneForm.get('occupationHistory') as FormGroup).controls;
  }

  get fmh() {
    return (this.stepOneForm.get('medicalHistory') as FormGroup).controls;
  }

  ngOnInit(): void {
  }

  stepOneSubmit() {
    this.patientService.deletePatientData('section_1');
    if (!this.stepOneForm.invalid) {
      this.patientService.setPatientData({ 'section_1': this.stepOneForm.value });
      this.sharedService.updateStepOneValue(this.stepOneForm.value.Intro_DateOf_Incident);
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
