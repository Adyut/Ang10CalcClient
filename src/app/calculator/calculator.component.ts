import { Component, OnInit } from '@angular/core';
import { DataService } from './restClient';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  currentNumber = '0';
  firstOperand : number = 0;
  operator : string = '';
  waitForSecondNumber = false;
  negativeOperand = false;
  memoryValue = 0;
  memInUse = false;
  memInUseClass = 'memory-sign-off'; 

  constructor(private dataService: DataService) { }

  public getNumber(v: string){
    // console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = (this.negativeOperand ? '-' : '') + v;
      this.waitForSecondNumber = false;
      if(this.operator == ''){
        this.firstOperand = 0;
      }
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  // private doCalculation(op : string, secondOp: number){
  //   switch (op){
  //     case '+':
  //     return this.firstOperand += secondOp; 
  //     case '-': 
  //     return this.firstOperand -= secondOp; 
  //     case '*': 
  //     return this.firstOperand *= secondOp; 
  //     case '/': 
  //     if(secondOp == 0){
  //       return 0;
  //     }
  //     return this.firstOperand /= secondOp; 
  //     case '=':
  //     return secondOp;
  //     case '!':
  //     return secondOp * -1;
  //     default:
  //     return 0;
  //   }
  // }

  private doCalculation(op : string, secondOp: number){
    console.log("Request sending for '"+op+"' with args num1 : "+this.firstOperand+" and num2 : "+secondOp+".");
    this.dataService.sendPostRequest(op, this.firstOperand, secondOp).subscribe(arg => {
      this.currentNumber = String(arg);
      this.firstOperand = Number(this.currentNumber);
      console.log("Response is "+this.currentNumber+".");
    })
  }
    
  public getOperation(op: string){
    // console.log("in getOperation " + op + " " + this.firstOperand + " " + this.operator );

    if((op === '-') && 
      ((this.currentNumber === '' && this.operator === '') ||
         (this.firstOperand !== 0 && this.operator !== ''))){
        this.currentNumber = op;
        this.negativeOperand = true;
    }else{
      if(this.firstOperand === 0){
        this.firstOperand = Number(this.currentNumber);
  
      }else if(this.operator){
        this.doCalculation(this.operator , Number(this.currentNumber))
      }
      this.operator = op;
      this.waitForSecondNumber = true;
    }

    // console.log(this.firstOperand);
  }
  
  public doOperation(op: string){
    // console.log(op);

    if(op === '!'){
      this.operator = op;
    }
    if(this.operator){
      // console.log(this.operator + " " + this.currentNumber);
      this.doCalculation(this.operator , Number(this.currentNumber))
      this.waitForSecondNumber = true;
    }else if(this.firstOperand === 0){
      this.firstOperand = Number(this.currentNumber);
      this.waitForSecondNumber = false;
    }
    this.operator = '';
    this.negativeOperand = false;

    // console.log(this.firstOperand);
  }

  public opOnMemory(){
    if(this.memInUse){
      this.currentNumber = String(this.memoryValue);
      this.firstOperand = this.memoryValue;
      this.waitForSecondNumber = true;
      this.memInUse = false;
    }else{
      this.memoryValue = Number(this.currentNumber);
      this.memInUse = true;
    }
    this.memInUseClass = this.memInUse ? 'memory-sign-on' : 'memory-sign-off';
  }

  public clearMemory(){
    this.memInUse = false;
    this.memInUseClass = this.memInUse ? 'memory-sign-on' : 'memory-sign-off';
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = 0;
    this.operator = '';
    this.waitForSecondNumber = false;
  }

  ngOnInit(): void {
  }

}
