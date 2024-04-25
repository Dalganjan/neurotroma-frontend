import { Component, OnInit } from '@angular/core';
import { Role } from '@app/_models';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.scss'] })
export class HomeComponent implements OnInit {
    account = this.accountService.accountValue;
    isAssistant: boolean = false;
    isPromptDesigner: boolean = false;

    constructor(private accountService: AccountService) { 
        this.account = accountService.accountValue;
        this.isAssistant = (this.account?.role === Role.Assistant) ? true : false;
        this.isPromptDesigner = (this.account?.role === Role.PromptAdmin) ? true : false;
    }
    ngOnInit(): void {
       
    }
}