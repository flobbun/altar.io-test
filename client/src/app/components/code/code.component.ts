import { Component } from '@angular/core';
import { DatabridgeService } from './../../services/databridge.service';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent{

  constructor(public dataBridge: DatabridgeService) {}


}
