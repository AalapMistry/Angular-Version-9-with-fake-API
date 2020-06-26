import { Component, OnInit } from '@angular/core';
import {TotLeadChart} from './chart/tot-lead-chart';
import {TotVendorChart} from './chart/tot-vendor-chart';
import {TotInvoiceChart} from './chart/tot-invoice-chart';
import {MonthlyProfit3} from './chart/monthly-profit-3';
import {ClientMap1} from './chart/client-map-1';
import {ClientMap3} from './chart/client-map-3';

@Component({
  selector: 'app-dash-crm',
  templateUrl: './dash-crm.component.html',
  styleUrls: ['./dash-crm.component.scss']
})
export class DashCrmComponent implements OnInit {
  public totLeadChartData: any;
  public totVendorChartData: any;
  public totInvoiceChartData: any;
  public monthlyProfitChartData3: any;
  public clientMapChartData1: any;
  public clientMapChartData3: any;

  constructor() {
    this.totLeadChartData = TotLeadChart.crmChartData;
    this.totVendorChartData = TotVendorChart.crmChartData;
    this.totInvoiceChartData = TotInvoiceChart.crmChartData;
    this.monthlyProfitChartData3 = MonthlyProfit3.crmChartData;
    this.clientMapChartData1 = ClientMap1.crmChartData;
    this.clientMapChartData3 = ClientMap3.crmChartData;
  }

  ngOnInit() {
  }

}
