import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { LoaderService } from './core/core-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showLoader = false;

  constructor(
    private router: Router,
    
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.loaderService.status.subscribe((val: boolean) => {
      this.cdRef.detectChanges();
      this.showLoader = val;
    });
  }
}
