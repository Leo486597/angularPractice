import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {
  @ViewChild('myChart') myChartDirective;
  myChart: any;
  labels = [];
  chartDataRaised = [];
  chartDataCleared = [];
  chartDataDiff = [];

  constructor(
    private dataService: DataServiceService
  ) { 
    this.dataService.getLatest10WeeksCount()
      .subscribe(data => this.setParameters(data));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.myChartLoad();    
    }, 0);
  }

  setParameters(data) {
    console.log('history kpi data', data)
    data.forEach((element, index, arr) => {
      this.labels.push(element.Label);
      this.chartDataRaised.push(element.Raised);
      this.chartDataCleared.push(element.Cleared);
      this.chartDataDiff.push(element.Cleared - element.Raised)
    });
  }

  myChartLoad() {
    console.log("drawing bar chart");
    let chartData = {
      labels: this.labels,
      datasets: [{
        label: 'Raised',
        data: this.chartDataRaised,
        backgroundColor: "#f53d3d",
        borderColor: "#f53d3d",
        borderWidth: 1,
      },
      {
        label: 'Cleared',
        data: this.chartDataCleared,
        backgroundColor: "#00a1e4",
        borderColor: "#00a1e4",
        borderWidth: 1,
      }]
    };

    let chartOption = {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: ''
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            autoSkip: false
          }
        }],
        yAxes: [{
          gridLines: {
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            display: true,
            callback: function (value) {
              if (Number.isInteger(value)) {
                return value;
              }
            }
          }
        }]
      },
    };

    this.myChart = new Chart(this.myChartDirective.nativeElement, {
      type: 'line',
      data: chartData,
      options: chartOption
    })
  }

}
