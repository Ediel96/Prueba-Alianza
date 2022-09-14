import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { ClientService } from './../../shared/services/client.service';
import { User } from '../../shared/models/User'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { __values } from 'tslib';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  listUser!: User[]; 
  animal!: string;
  name!: string;
  user! : User;
  

  constructor(private clientService : ClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listClient();
  }

  listClient(){
    this.clientService.getLlistaClients().subscribe((res : any)   => {
      this.listUser = res['user'];
    });
  }


  addItem(event : any){
    const dialogRef = this.dialog.open(DialogModal, {
      width: '750px',
      data: event,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listClient();
    });
  }


  openDialog(){
    const dialogRef = this.dialog.open(DialogModal, {
      width: '750px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listClient();
    });
  }

}

@Component({
  selector: 'dialog-modal',
  templateUrl: 'dialog-modal.html',
})
export class DialogModal implements OnInit{

  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(
    public dialogRef: MatDialogRef<DialogModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
  ) {}


  ngOnInit(): void {
    this.createForm();
    if(this.data != null){
      this.editForm(this.data)
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'phone': [null, Validators.required],
      'email': [null, [Validators.required]],
      'businessId': [null, [Validators.required]],
      'dateStart': [null, [Validators.required]],
      'dateEnd': [null, [Validators.required]],
    });
  }

  editForm(data : any) {
    this.formGroup.setValue({
      'name': data['sharedKey'],
      'phone': data['phone'],
      'email': data['email'],
      'businessId': data['businessId'],
      'dateStart': data['dateStart'],
      'dateEnd': data['dateEnd'],
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  emitirClienteComponent(){
    this.emitirClienteComponent()
  }
  
  creatPost(){
    this.formGroup.value;

    let user = {
      name : this.formGroup.controls['name'].value,
      sharedKey : this.formGroup.controls['name'].value, // lo dejo con el mismo nombre
      phone: this.formGroup.controls['phone'].value,
      email : this.formGroup.controls['email'].value,
      businessId: this.formGroup.controls['businessId'].value,
      dateStart: this.formGroup.controls['dateStart'].value,
      dateEnd: this.formGroup.controls['dateEnd'].value,
    }

    this.clientService.postClient(user).subscribe( resp => {
      this.onNoClick();
    });
  }

  editClient(){
    this.formGroup.value;
    if(this.data){
      let user = {
        id : this.data.id,
        name : this.formGroup.controls['name'].value,
        sharedKey : this.formGroup.controls['name'].value, // lo dejo con el mismo nombre
        phone: this.formGroup.controls['phone'].value,
        email : this.formGroup.controls['email'].value,
        businessId: this.formGroup.controls['businessId'].value,
        dateStart: this.formGroup.controls['dateStart'].value,
        dateEnd: this.formGroup.controls['dateEnd'].value,
      }
  
      this.clientService.putClient(user).subscribe(resp => {
        this.onNoClick();
      })
    }else{
      this.creatPost();
    }
  }

}