import { NgModule } from "@angular/core";
import { CoreHttpService } from "./core-http.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoaderService } from "./core-loader.service";
import { CoreHelperService } from "./core-helper.service";
import { CoreFormValidationService } from "./core-form-validation.service";
import { ErrorDialogComponent } from "./dialog/error-list.component";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [ErrorDialogComponent],
    providers: [
        CoreHttpService,
        LoaderService,
        CoreHelperService,
        CoreFormValidationService
    ],
    exports: [],
    entryComponents: [ErrorDialogComponent]
})

export class CoreModule { }
