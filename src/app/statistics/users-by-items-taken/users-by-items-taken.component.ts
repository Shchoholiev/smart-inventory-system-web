import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../statistics.service';
import { UserActivity } from '../user-activity.model';
import { UserDebt } from '../user-debt.model';

declare var google: any;
var users: UserDebt[];

@Component({
  selector: 'app-users-by-items-taken',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-by-items-taken.component.html',
  styleUrl: './users-by-items-taken.component.css'
})
export class UsersByItemsTakenComponent implements OnInit{

  groupId: string;

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.statisticsService.getUsersWithMostItemsTaken(this.groupId)
      .subscribe(data => {
        users = data;
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(this.drawChart);
      });
  }

  drawChart() {
    const chartData: any = [["User Name", "Items Taken"]];  // Header row
    console.log(users);
    
    users.forEach(userDebt => {
        chartData.push([userDebt.user?.name, userDebt.itemsTakenCount]);
    });

    const data = google.visualization.arrayToDataTable(chartData);
    const options = {
      chart: {
        title: 'Users by Items Taken',
        subtitle: 'Users that took and have not returned most items',
      }
    };

    const chart = new google.charts.Bar(document.getElementById('barChart'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
