import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from './../../shared/services/client.service';
import { User } from '../../shared/models/User'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  listUser!: User[]; 

  animal!: string;
  name!: string;

  constructor(private clientService : ClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientService.getLlistaClients().subscribe((res : any)   => {
      this.listUser = res['user'];
    });
  }

  onClickNew () {

  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogModal, {
      width: '750px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  
  }

}


@Component({
  selector: 'dialog-modal',
  templateUrl: 'dialog-modal.html',
})
export class DialogModal {
  constructor(
    public dialogRef: MatDialogRef<DialogModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}