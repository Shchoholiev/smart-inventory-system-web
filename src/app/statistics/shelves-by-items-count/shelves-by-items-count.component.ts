import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../statistics.service';
import { ShelfLoad } from '../shelf-load.model';

declare var google: any;
var shelves: ShelfLoad[];

@Component({
  selector: 'app-shelves-by-items-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shelves-by-items-count.component.html',
  styleUrl: './shelves-by-items-count.component.css'
})
export class ShelvesByItemsCountComponent implements OnInit{

  groupId: string;

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.statisticsService.getShelvesByItemsCount(this.groupId)
      .subscribe(data => {
        shelves = data;
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(this.drawChart);
      });
  }

  drawChart() {
    const chartData: any = [["Shelf Name", "Items Count"]]; 
    shelves.forEach(shelfLoad => {
      chartData.push([shelfLoad.shelf.name, shelfLoad.itemsCount]);
    });

    const data = google.visualization.arrayToDataTable(chartData);
    const options = {
      title: 'Shelves by Items count',
      is3D: true,
      pieSliceText: 'value', 
      legend: { position: 'labeled' },
      pieSliceTextStyle: {
        color: 'black', 
        fontSize: 14
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById('chartDiv')); 
    chart.draw(data, options);
  }
}
