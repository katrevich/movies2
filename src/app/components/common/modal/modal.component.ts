import { Component, OnInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() windowClass: string = '';
  @ViewChild('content') content: ElementRef;

  constructor(
    private _modal: NgbModal
  ) { }

  ngOnInit() {
  }

  open(){
    return this._modal.open(this.content, { windowClass: this.windowClass });
  }

}
