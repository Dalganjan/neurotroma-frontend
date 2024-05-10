import { Options } from '@angular-slider/ngx-slider';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '@app/_services';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss', '../patient/patient.component.scss']
})
export class StepFourComponent implements OnInit {
  public stepFourForm: FormGroup;
  options: Options = {
    floor: 0,
    ceil: 100
  }

  constructor(private fb: FormBuilder, private patientService: PatientService, 
    private router: Router
  ) {
    this.stepFourForm = this.fb.group({
      Intro_Date_Of_Incident: this.fb.control('', Validators.required),
      Intro_Date_Of_Visit: this.fb.control('', Validators.required),
      Impact_Date_of_Eval: this.fb.control('', Validators.required),
      Impact_Word_Memory_percentage: this.fb.control('', Validators.required),
      Impact_Design_Memory_percentage: this.fb.control('', Validators.required),
      Impact_XO: this.fb.control('', Validators.required),
      Impact_Symbol_Match: this.fb.control('', Validators.required),
      Impact_Color_Match: this.fb.control('', Validators.required),
      Impact_Three_Letters: this.fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.stepFourForm.controls; }

  stepFourSubmit() {
    this.patientService.deletePatientData('section_4');
    if (!this.stepFourForm.invalid) {
      this.patientService.setPatientData({ 'section_4': this.stepFourForm.value });
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }

}
