export class TrafficChart1 {
  public static analyticsChartData = {
    chart: {
      height: 250,
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      }
    },
    series: [85.7, 77.56, 20.9, 10.9, 15.8, 86.7],
    colors: ['#4680ff', '#0e9e4a', '#00acc1', '#ffba57', '#ff5252', '#536dfe'],
    labels: ['Facebook ads', 'Amazon ads', 'Youtube videos', 'Google adsense', 'Twitter ads', 'News ads'],
    legend: {
      show: true,
      position: 'bottom',
    }
  };
}
