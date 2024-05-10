import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AssistantService, PatientService, SharedService } from '@app/_services';
import { zip } from 'rxjs';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.less', '../patient/patient.component.scss']
})
export class StepSixComponent implements OnInit {
  public stepSixForm: FormGroup;
  account = this.accountService.accountValue;
  state!: string;
  patientDetails = [];
  pageLoaded: boolean = true;

  constructor(private fb: FormBuilder, private patientService: PatientService,
    private router: Router, private sharedService: SharedService,
    private assistantService: AssistantService, private accountService: AccountService,
  ) {
    this.stepSixForm = this.fb.group({
      Stanford_Dizziness: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Headache: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Hearing: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Vision: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Balance: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Nausea: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Lights: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Noises: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Sleep: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Fatigue: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Angered: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Depression: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Anxious: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Memory: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Concentration: this.fb.control({value: '', disabled: true}, Validators.required),
      Stanford_Mentally_Foggy: this.fb.control({value: '', disabled: true}, Validators.required),
    });
  }

  ngOnInit(): void {
    this.sharedService.patientReviewValue$.subscribe(value => {
      this.patientDetails = value;
      const data = this.patientService.getPatientData().find((d) => (Object.keys(d)[0] === 'section_2'))?.['section_2'];
      if(data) {
        this.stepSixForm.patchValue(data);
        this.pageLoaded = true;
      }
    });
  }

  get f() { return this.stepSixForm.controls; }

  stepSixSubmit() {
    this.state = 'done';
    this.pageLoaded = false;
    console.log(this.patientDetails);
    this.patientService.deletePatientData('section_6');
    this.patientService.setPatientData({ 'section_6' : this.stepSixForm.value });
    this.submitSectionWiseRecords(this.patientService.getPatientData());
  }


  submitSectionWiseRecords(patientData: any[]) {
    this.assistantService.recordPatient(this.account?.id!).subscribe((data) => {
      this.sharedService.updatePatientIdValue(data.patientId);
      const requests = patientData.map(patient =>
        this.assistantService.recordSectionWiseResult(this.account?.id!, data.patientId, {
          sectionId: Object.keys(patient)[0],
          sectionForm: Object.values(patient)[0]
        }));
      zip(requests).subscribe((result: any[]) => {
        result.map((res, index) => {
          console.log(res, index);
        });
        this.pageLoaded = true;
        this.router.navigate(['/patientDetails', data.patientId, 'treatment']);
      })
    });
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
