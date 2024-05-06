import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../statistics.service';
import { UserActivity } from '../user-activity.model';

declare var google: any;
var users: UserActivity[];

@Component({
  selector: 'app-users-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-activity.component.html',
  styleUrl: './users-activity.component.css'
})
export class UsersActivityComponent implements OnInit{

  groupId: string;

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.statisticsService.getUsersByActivityWithItems(this.groupId)
      .subscribe(data => {
        users = data;
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(this.drawChart);
      });
  }

  drawChart() {
    const chartData: any = [["User Name", "Actions Count"]];  // Header row
    users.forEach(itemPop => {
        chartData.push([itemPop.user.name, itemPop.actionsCount]);
    });

    const data = google.visualization.arrayToDataTable(chartData);
    const options = {
      chart: {
        title: 'Users Activity',
        subtitle: 'Users activity based on actions count',
      }
    };

    const chart = new google.charts.Bar(document.getElementById('barChart'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
