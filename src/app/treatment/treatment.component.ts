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

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,
    private route: ActivatedRoute, private sharedService: SharedService,
    private patientService: PatientService, private router: Router, private clipboard: Clipboard,
    private csvService: CSVHelper
  ) { 
    this.patientId = this.route.snapshot.params['patientId'];
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.addItems(); // Add initial items
  }

  get f() { return (this.form.get('items') as FormArray).controls };

  addItems(): void {
    this.items = this.form?.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      text: ['values', Validators.required],
      isEditing: [false],
      wordLimit: [400]
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
    console.log((this.form.get('items') as FormArray).at(index).value);
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
    //    doc.addImage('https://via.placeholder.com/150');
    // console.log(divRef);
    // const div = document.getElementById('print-paper');
    html2canvas(divRef)
      .then((successRef) => {
        var doc = new jsPDF('p', 'mm', 'a4');
        var img = successRef.toDataURL('image/png');

        // Add image Canvas to PDF
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((doc) => doc.save(`${this.patientId}_treatment.pdf`));
  }

}
