import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../statistics.service';
import { ItemPopularity } from '../item-popularity.model';

declare var google: any;
var items: ItemPopularity[];

@Component({
  selector: 'app-items-popularity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-popularity.component.html',
  styleUrl: './items-popularity.component.css'
})
export class ItemsPopularityComponent implements OnInit{

  groupId: string;

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.statisticsService.getItemsByPopularity(this.groupId)
      .subscribe(data => {
        items = data;
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(this.drawChart);
      });
  }

  drawChart() {
    const chartData: any = [["Item Name", "Actions Count"]];  // Header row
    items.forEach(itemPop => {
        chartData.push([itemPop.item.name, itemPop.actionsCount]);
    });

    const data = google.visualization.arrayToDataTable(chartData);
    const options = {
      chart: {
        title: 'Items Popularity',
        subtitle: 'Item popularity based on actions count',
      }
    };

    const chart = new google.charts.Bar(document.getElementById('barChart'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
