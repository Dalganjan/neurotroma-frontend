import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ClipboardModule } from '@angular/cdk/clipboard';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService, AssistantService } from './_services';

import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { MainLandingComponent } from './main-landing/main-landing.component';
import { PatientComponent } from './patient/patient.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { StepSixComponent } from './step-six/step-six.component';
import { jsonprettypipe } from './_pipe/jsonpretty.pipe';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CdkStepperModule,
        NgStepperModule,
        NgxSliderModule,
        ClipboardModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        MainLandingComponent,
        PatientComponent,
        StepOneComponent,
        StepTwoComponent,
        StepThreeComponent,
        StepFourComponent,
        StepFiveComponent,
        TreatmentComponent,
        StepSixComponent,
        jsonprettypipe
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AssistantService
        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }