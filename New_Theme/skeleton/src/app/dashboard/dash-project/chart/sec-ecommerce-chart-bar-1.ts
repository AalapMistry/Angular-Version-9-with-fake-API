export class SecEcommerceChartBar1 {
  public static saleChartData = {
    chart: {
      type: 'bar',
      height: 70,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#0491a2'],
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    },
    series: [{
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 25, 66, 41, 89, 63, 54, 25, 66, 41, 89]
    }],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName) => 'Affiliate :'
        }
      },
      marker: {
        show: false
      }
    }
  };
}
