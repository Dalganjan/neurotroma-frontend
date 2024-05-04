import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AssistantService, PatientService, SharedService } from '@app/_services';
import { zip } from 'rxjs';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.less']
})
export class StepSixComponent implements OnInit {
  @Output() stepLoaded: EventEmitter<void> = new EventEmitter<void>();
  public stepSixForm: FormGroup;
  account = this.accountService.accountValue;
  state!: string;
  patientDetails = [];

  constructor(private fb: FormBuilder, private patientService: PatientService,
    private router: Router, private sharedService: SharedService,
    private assistantService: AssistantService, private accountService: AccountService,
  ) {
    this.stepSixForm = this.fb.group({
      review: this.fb.control(true),
    });
  }

  ngOnInit(): void {
    this.sharedService.patientReviewValue$.subscribe(value => {
      this.patientDetails = value;
    });
  }

  stepSixSubmit() {
    this.state = 'done';
    console.log(this.patientDetails);
    this.submitSectionWiseRecords(this.patientService.getPatientData());
  }


  submitSectionWiseRecords(patientData: any[]) {
    this.assistantService.recordPatient(this.account?.id!).subscribe((data) => {
      this.sharedService.updatePatientIdValue(data.patientId);
      const requests = patientData.map(patientData => 
        this.assistantService.recordSectionWiseResult(this.account?.id!, data.patientId, {
          sectionId: Object.keys(patientData)[0],
          sectionForm: Object.values(patientData)[0]
      }));
      zip(requests).subscribe((result: any[]) => {
        result.map((res, index) => {
          console.log(res, index);
        });
        this.router.navigate(['/patientDetails', this.account?.id, 'treatment']);
      })
    });
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
