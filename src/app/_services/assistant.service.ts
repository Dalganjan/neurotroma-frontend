import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
 
const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = `${environment.apiUrl}/api/assistants`;
 
@Injectable({
providedIn: 'root'
})
export class AssistantService {
 
    
    constructor(private http: HttpClient) {

    }

   
    recordPatient(assistantId:string | null): Observable<any> {
        return this.http.post(baseUrl + `/${assistantId}/patients`, {}, httpOptions);
    }

    recordSectionWiseResult(assistantId: string, patientId: string, data: any): Observable<any> {    
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