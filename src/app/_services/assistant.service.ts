import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
 
const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = `${environment.apiUrl}/assistants`;
 
@Injectable({
providedIn: 'root'
})
export class AssistantService {
 
    
    constructor(private http: HttpClient) {

    }

   
    recordPatient(assistantId:string): Observable<any> {
        return this.http.post(baseUrl + `/${assistantId}/patients`, {}, httpOptions);
    }

    recordSectionWiseResults(assistantId: string, patientId: string, data: any): Observable<any> {
        return this.http.post(baseUrl + `/${assistantId}/patients/${patientId}/sectionResults`, {
            sectionId: data.sectionId,
            sectionForm: data.sectionForm
        } ,httpOptions);
    }

    updateSectionPromptResponse(assistantId: string, patientId: string, data: any): Observable<any> {
        return this.http.post(baseUrl + `/${assistantId}/patients/${patientId}/updateSectionPromptResponse`, {
            sectionId: data.sectionId,
            sectionPromptResponse: data.sectionPromptResponse,
            updatedResponseSize: data.updatedResponseSize
        } ,httpOptions);
    }
}