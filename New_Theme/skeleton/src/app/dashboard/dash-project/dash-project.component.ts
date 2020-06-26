import { Component, OnInit } from '@angular/core';
import {SecEcommerceChartLine} from './chart/sec-ecommerce-chart-line';
import {SecEcommerceChartBar} from './chart/sec-ecommerce-chart-bar';
import {SecEcommerceChartBar1} from './chart/sec-ecommerce-chart-bar-1';

@Component({
  selector: 'app-dash-project',
  templateUrl: './dash-project.component.html',
  styleUrls: ['./dash-project.component.scss']
})
export class DashProjectComponent implements OnInit {
  public secEcommerceChartDataLine: any;
  public secEcommerceChartDataBar: any;
  public secEcommerceChartDataBar1: any;

  constructor() {
    this.secEcommerceChartDataLine = SecEcommerceChartLine.saleChartData;
    this.secEcommerceChartDataBar = SecEcommerceChartBar.saleChartData;
    this.secEcommerceChartDataBar1 = SecEcommerceChartBar1.saleChartData;
  }

  ngOnInit() {
  }

}
