import { DatabridgeService } from './../../services/databridge.service';
import { Component } from '@angular/core';
import Helpers from './helpers';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {

  public grid: Array<string> = [];
  public character: string | undefined;
  public blocked = false;

  private firstGeneration = true;
  private intervalSecs = 2 * 1000;
  private nCells = 100; 
  private characterDelay = 4 * 1000;
  private alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  private rows: Array<Array<number>> = [];
  private getCurrentSeconds = () => new Date().getSeconds();

  constructor(public dataBridge: DatabridgeService) {
    if (this.dataBridge.getGrid().length === 0)
      this.dataBridge.initGrid();
   }

  generateRows(): void {
    let nRow = 0;
    for (let i = 0; i < this.nCells; i++) {
      if (i % 10 === 0 || i === 0) {
        const arr = [];
        for (let j = 0; j < 10; j++) {
          arr.push(this.grid[i + j]);
        }
        this.rows[nRow] = arr;
        nRow++;
      }
    }
    this.rows.reverse();
  }

  generateWeighs(): void {
    for (let i = 0; i < 20; i++) {
      const rPosition = Helpers.getRandomNumber(0, this.grid.length - 1);
      this.grid[rPosition] = this.character;
    }
  }

  generateGrid(): void {
    for (let i = 0; i < this.nCells; i++) {
      if (this.character)
        this.grid[i] = Helpers.getRandomChar(this.alphabet, this.character);
      else
        this.grid[i] = Helpers.getRandomChar(this.alphabet);
    }

    this.character ? this.generateWeighs() : null;
    this.generateRows();
    this.generateCode();
    this.firstGeneration ? setInterval(() => this.generateGrid(), this.intervalSecs): null;
    this.firstGeneration = false;
  }

  generateCode(){
    const firstSecDigit = String(this.getCurrentSeconds()).charAt(0);
    const seconSecdDigit = String(this.getCurrentSeconds()).charAt(1) || '0';
    const row = this.rows[seconSecdDigit];
    const firstLetter = row[firstSecDigit];
    const invertedRow = this.rows[firstSecDigit];
    const secondLetter = invertedRow[seconSecdDigit];

    const code = Helpers.concatNumbers(
      Helpers.mathOp(Helpers.getOcurr(firstLetter, this.grid)), 
      Helpers.mathOp(Helpers.getOcurr(secondLetter, this.grid))
    );

    //
    // console.log(`Ocurrences of ${this.character} ${Helpers.getOcurr(this.character, this.grid)}`);
    // console.log(`SECS ${firstSecDigit}${seconSecdDigit}`);
    // console.log(`LETTERS ${firstLetter} ${secondLetter}`);
    // console.log(`OCURRENCES 
    // ${Helpers.getOcurr(firstLetter, this.grid)}${Helpers.getOcurr(secondLetter, this.grid)}`);
    // console.log("ROWS", this.rows);
    // console.log("CODE", code);
    //

    this.dataBridge.setCode(code);
    this.dataBridge.setGrid(this.grid);
  }

  triggerGenerateGrid(): void {
    if (this.validateCharacter() && !this.firstGeneration)
    {
      this.grid = [];
      this.generateGrid();
      this.blocked = true;
      setTimeout(() => this.blocked = false, this.characterDelay);
    }
  }

  validateCharacter(): boolean {
    if (!this.alphabet.includes(this.character)){
      this.character = undefined;
      return false;
    }
    this.character = this.character.toLowerCase();
    return true;
  }
}
