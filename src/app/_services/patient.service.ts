import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    
    private patientData:Array<any> = [];


    setPatientData(patientData: any = {}) {
        this.patientData.push(patientData);
    }

    resetPatientData() {
        this.patientData = [];
    }

    getPatientData() {
        return this.patientData;
    }

}