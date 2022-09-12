import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { ClientService } from './../../shared/services/client.service';
import { User } from '../../shared/models/User'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { __values } from 'tslib';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit, OnChanges {

  listUser!: User[]; 
  animal!: string;
  name!: string;
  

  constructor(private clientService : ClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientService.getLlistaClients().subscribe((res : any)   => {
      console.log(res),
      this.listUser = res['user'];
    });
  }

  ngOnChanges(): void {
    console.log('que paso perro');
  }

  addItem(event : any){
    const dialogRef = this.dialog.open(DialogModal, {
      width: '750px',
      data: event,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
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
export class DialogModal implements OnChanges, OnInit{

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
    console.log(this.data);
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


  ngOnChanges(): void {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  emitirClienteComponent(){
    this.emitirClienteComponent()
  }
  

  
  creatPost(){
    this.formGroup.value;
    console.log(this.formGroup.value);

    let user = {
      name : this.formGroup.controls['name'].value,
      sharedKey : this.formGroup.controls['name'].value, // lo dejo con el mismo nombre
      phone: this.formGroup.controls['phone'].value,
      email : this.formGroup.controls['email'].value,
      businessId: this.formGroup.controls['email'].value,
      dateStart: this.formGroup.controls['dateStart'].value,
      dateEnd: this.formGroup.controls['dateEnd'].value,
    }

    this.clientService.postClient(user!).subscribe( resp => {
      console.log(resp)
      this.emitirClienteComponent();
    })

    

  }

}