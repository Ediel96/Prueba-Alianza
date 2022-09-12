import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, ViewChild,  EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { User } from 'src/app/shared/models/User';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() user! : User[];
  @Output() userEdit = new EventEmitter<any>();

  displayedColumns: string[] = ['sharedKey', 'businessId', 'email', 'phone' , 'dateStart' , 'dateEnd', 'edit'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { 
    this.dataSource = new MatTableDataSource(this.user);
  }
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.user);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource!.paginator = this.paginator ;
    this.dataSource!.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }

  clientEdit(row : any){
    this.userEdit.emit(row); 
  }

}
