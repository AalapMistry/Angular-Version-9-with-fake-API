import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApexChartService} from '../../theme/shared/components/chart/apex-chart/apex-chart.service';
import {AmountProcessed} from './chart/amount-processed';
import {AmountSpent} from './chart/amount-spent';
import {ProfitProcessed} from './chart/profit-processed';
import {SeoAnalytics1} from './chart/seo-analytics-1';
import {TrafficChart1} from './chart/traffic-chart-1';
import {SeoChart1} from './chart/seo-chart-1';
import {SeoChart2} from './chart/seo-chart-2';
import {SeoChart3} from './chart/seo-chart-3';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit, OnDestroy {
  public amountProcessedChartData: any;
  public amountSpentChartData: any;
  public profitProcessedChartData: any;
  public seoAnalyticsChartData: any;
  public trafficChartData: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;

  public lastDate: number;
  public siteVisitorCAC: any;
  public data: any;

  public intervalSub: any;
  public intervalMain: any;

  constructor(public apexEvent: ApexChartService) {
    this.amountProcessedChartData = AmountProcessed.analyticsChartData;
    this.amountSpentChartData = AmountSpent.analyticsChartData;
    this.profitProcessedChartData = ProfitProcessed.analyticsChartData;
    this.seoAnalyticsChartData = SeoAnalytics1.analyticsChartData;
    this.trafficChartData = TrafficChart1.analyticsChartData;
    this.seoChartData1 = SeoChart1.analyticsChartData;
    this.seoChartData2 = SeoChart2.analyticsChartData;
    this.seoChartData3 = SeoChart3.analyticsChartData;

    this.lastDate = 0;
    this.data = [];

    this.getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {min: 10, max: 90});
    this.siteVisitorCAC = {
      chart: {
        height: 300,
        type: 'area',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 2000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      series: [{
        name: 'active Users :',
        data: this.data
      }],
      colors: ['#ff5252'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: 777600000,
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    };
  }

  ngOnInit() {
    this.intervalSub = setInterval(() => {
      this.getNewSeries(this.lastDate, {min: 10, max: 90});
      this.apexEvent.eventChangeSeriesData();
    }, 2000);

    this.intervalMain = setInterval(() => {
      this.resetData();
      this.apexEvent.eventChangeSeriesData();
    }, 60000);

  }

  ngOnDestroy() {
    if (this.intervalSub) {
      clearInterval(this.intervalSub);
    }
    if (this.intervalMain) {
      clearInterval(this.intervalMain);
    }
  }

  getDayWiseTimeSeries(baseval, count, yrange) {
    let i = 0;
    while (i < count) {
      const x = baseval;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      this.data.push({x, y});
      this.lastDate = baseval;
      baseval += 86400000;
      i++;
    }
  }

  resetData() {
    this.data = this.data.slice(this.data.length - 10, this.data.length);
  }

  getNewSeries(baseval, yrange) {
    const newDate = baseval + 86400000;
    this.lastDate = newDate;
    this.data.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    });
  }

}
