import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MenubarModule } from 'primeng/menubar';
import { Menubar } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { CardModule } from 'primeng/card';
import { Textarea } from 'primeng/inputtextarea';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

const mismodulos: any = [
  ButtonModule,
  CardModule,
  Ripple,
  ToastModule,
  ToolbarModule,
  Toolbar,
  SplitButton,
  InputTextModule,
  IconField,
  InputIcon,
  MenubarModule,
  Menubar,
  MegaMenuModule,
  Textarea,
  ConfirmPopupModule,
  DialogModule,
  ImageModule,
  FileUploadModule,
  TableModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    mismodulos
  ],
  exports: [
    mismodulos
  ]
})
export class ModprimengModule { }
