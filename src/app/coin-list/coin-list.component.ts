import {Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {ApiService} from '../service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  bannerData:any=[];

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol','current_price','price_change_percentage_24h','market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  getBannerData(){
    this.api.getTrendingCurrency("INR")
    .subscribe(res=>{
      console.log(res);
      this.bannerData = res;
    })
  }
  
  getAllData(){
    this.api.getCurrency("INR")
    .subscribe(res=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
