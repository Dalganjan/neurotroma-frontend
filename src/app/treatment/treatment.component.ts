import { Options } from '@angular-slider/ngx-slider/options';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AssistantService, PatientService, SharedService } from '@app/_services';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CSVHelper } from '@app/_helpers';


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.less', '../patient/patient.component.scss']
})
export class TreatmentComponent implements OnInit {
  form!: FormGroup;
  items: FormArray<any> | undefined;
  account = this.accountService.accountValue;
  patientId!: string;
  options: Options = {
    floor: 0,
    ceil: 500
  };
  pageLoaded = false;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,
    private route: ActivatedRoute, private sharedService: SharedService, private assistantService: AssistantService,
    private patientService: PatientService, private router: Router, private clipboard: Clipboard,
    private csvService: CSVHelper
  ) { 
    this.patientId = this.route.snapshot.params['patientId'];
    this.assistantService.getSectionWiseResultByAssistantIdPatientId(this.account?.id!, this.patientId).subscribe((data) => {
      data.forEach((d: any) => {
        this.addItems(d); // Add initial items
      });
      this.pageLoaded = true;
    })
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    //this.addItems(); // Add initial items
  }

  get f() { return (this.form.get('items') as FormArray).controls };

  addItems(data: any): void {
    this.items = this.form?.get('items') as FormArray;
    this.items.push(this.createItem(data.sectionPromptResponse, data.version, data.sectionId));
  }

  createItem(text: string, version: string, sectionId: string): FormGroup {
    return this.formBuilder.group({
      text: [text, Validators.required],
      isEditing: [false],
      wordLimit: [500],
      version: [version],
      sectionId: [sectionId]
    });
  }

  editItem(index: number): void {
    (this.form.get('items') as FormArray)?.at(index).get('isEditing')?.setValue(true);
  }

  isEditing(index: number): boolean {
    return (this.form.get('items') as FormArray)?.at(index).get('isEditing')?.value;
  }

  saveItem(index: number): void {
    (this.form.get('items') as FormArray)?.at(index).get('isEditing')?.setValue(false);
  }

  cancelEdit(index: number): void {
    (this.form.get('items') as FormArray)?.at(index).get('isEditing')?.setValue(false);
  }

  regenerate(index: number): void {
    // Logic to regenerate items goes here
    // You can clear existing items and add new ones
    // call bastiongpt to generate new data
    this.pageLoaded = false;
    const data = (this.form.get('items') as FormArray).at(index).value;
    this.assistantService.updateSectionPromptResponse(this.account?.id!, this.patientId, {
      sectionId: data.sectionId,
      sectionPromptResponse: data.text,
      updatedResponseSize: data.wordLimit
    }).subscribe((data) => {
      (this.form.get('items') as FormArray).at(index).get('text')?.setValue(data.sectionPromptResponse);
      this.pageLoaded = true;
    })
  }

  cancelPatient() {
    this.patientService.resetPatientData();
    this.router.navigate(['/dashboard']);
  }
    
  copyToClipboard() {
    const columns = this.csvService.getColumns(this.form.get('items')?.value);
    const csvData = this.csvService.convertToCsv(this.form.get('items')?.value, columns);
    this.clipboard.copy(csvData);
    alert("copied succesfully");
  }
  
  download(divRef: any) {
    html2canvas(divRef)
      .then((successRef) => {
        const pdf = new jsPDF();
        const imgData = successRef.toDataURL('image/png');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        return pdf;
      })
      .then((doc) => doc.save(`${this.patientId}_treatment.pdf`));
  }

}
