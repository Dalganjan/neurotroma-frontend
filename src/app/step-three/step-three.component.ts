import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService, SharedService } from '@app/_services';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss', '../patient/patient.component.scss']
})
export class StepThreeComponent implements OnInit {
  public stepThreeForm: FormGroup;
  public dateOfInjury: string = '';

  constructor(private fb: FormBuilder, private patientService: PatientService,
    private router: Router, private sharedService: SharedService
  ) {
    this.stepThreeForm = this.fb.group({
      dailyRoutine: this.fb.group({
        dailyRoutineMeasure: this.fb.control('', Validators.required),
        dailyRoutineText: this.fb.control('',  Validators.required)
      }),
      mobility: this.fb.group({
        mobilityMeasure: this.fb.control('', Validators.required),
        mobilityText: this.fb.control('',  Validators.required)
      }),
      household: this.fb.group({
        householdMeasure: this.fb.control('', Validators.required),
        householdText: this.fb.control('',  Validators.required)
      }),
      work: this.fb.group({
        workMeasure: this.fb.control('', Validators.required),
        workText: this.fb.control('',  Validators.required)
      }),
      social: this.fb.group({
        socialMeasure: this.fb.control('', Validators.required),
        socialText: this.fb.control('',  Validators.required)
      }),
      leisure: this.fb.group({
        leisureMeasure: this.fb.control('', Validators.required),
        leisureText: this.fb.control('',  Validators.required)
      }),
      family: this.fb.group({
        familyMeasure: this.fb.control('', Validators.required),
        familyText: this.fb.control('',  Validators.required)
      }),
      physical: this.fb.group({
        physicalMeasure: this.fb.control('', Validators.required),
        physicalText: this.fb.control('',  Validators.required)
      }),
      quality: this.fb.group({
        qualityMeasure: this.fb.control('', Validators.required),
        qualityText: this.fb.control('',  Validators.required)
      }),
      future: this.fb.group({
        futureMeasure: this.fb.control('', Validators.required),
        futureText: this.fb.control('',  Validators.required)
      }),
    });
  }

  ngOnInit(): void {
    this.sharedService.stepOneValue$.subscribe(value => {
      this.dateOfInjury = value;
    });
  }

  get f() {
    return this.stepThreeForm.controls;
  }

  get fd() { return (this.stepThreeForm.get('dailyRoutine') as FormGroup).controls }

  get fm() { return (this.stepThreeForm.get('mobility') as FormGroup).controls }

  get fh() { return (this.stepThreeForm.get('household') as FormGroup).controls }

  get fw() { return (this.stepThreeForm.get('work') as FormGroup).controls }

  get fs() { return (this.stepThreeForm.get('social') as FormGroup).controls }

  get fl() { return (this.stepThreeForm.get('leisure') as FormGroup).controls }

  get ff() { return (this.stepThreeForm.get('family') as FormGroup).controls }

  get fp() { return (this.stepThreeForm.get('physical') as FormGroup).controls }

  get fq() { return (this.stepThreeForm.get('quality') as FormGroup).controls }

  get ffu() { return (this.stepThreeForm.get('future') as FormGroup).controls }

  stepThreeSubmit() {
    this.patientService.deletePatientData('section_3');
    if (!this.stepThreeForm.invalid) {
      this.patientService.setPatientData({ 'section_3': this.stepThreeForm.value });
      this.sharedService.updateStepOneValue(this.dateOfInjury);
      console.log(this.patientService.getPatientData());
    }
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
}
