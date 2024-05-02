import { Component, OnInit } from '@angular/core';
import { Role } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  account = this.accountService.accountValue;
  isAssistant: boolean = false;
  isPromptDesigner: boolean = false;

  constructor(private accountService: AccountService) { 
      this.account = accountService.accountValue;
      this.isAssistant = (this.account?.role === Role.Assistant) ? true : false;
  }
  
  ngOnInit(): void {
     
  }
}
