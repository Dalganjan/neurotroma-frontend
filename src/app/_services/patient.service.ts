import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    private patientData: Array<any> = [];


    setPatientData(patientData: any = {}) {
        this.patientData.push(patientData);
    }

    resetPatientData() {
        this.patientData = [];
    }

    getPatientData() {
        return this.patientData;
    }

    deletePatientData(sectionKey: string | null) {
        if (sectionKey) {
            const indexToRemove = this.patientData.findIndex(item => sectionKey in item);

            // Remove the object at the specified index
            if (indexToRemove !== -1) {
                this.patientData.splice(indexToRemove, 1);
            }
        }
    }

}