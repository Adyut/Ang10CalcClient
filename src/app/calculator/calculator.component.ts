import { Component, OnInit } from '@angular/core';

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

  public getNumber(v: string){
    console.log(v);
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
  private doCalculation(op : string, secondOp: number){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      if(secondOp == 0){
        return 0;
      }
      return this.firstOperand /= secondOp; 
      case '=':
      return secondOp;
      case '!':
      return secondOp * -1;
      default:
      return 0;
    }
  }
  
  public getOperation(op: string){
    console.log("in getOperation " + op + " " + this.firstOperand + " " + this.operator );

    if((op === '-') && 
      ((this.currentNumber === '' && this.operator === '') ||
         (this.firstOperand !== 0 && this.operator !== ''))){
        this.currentNumber = op;
        this.negativeOperand = true;
    }else{
      if(this.firstOperand === 0){
        this.firstOperand = Number(this.currentNumber);
  
      }else if(this.operator){
        const result = this.doCalculation(this.operator , Number(this.currentNumber))
        this.currentNumber = String(result);
        this.firstOperand = result;
      }
      this.operator = op;
      this.waitForSecondNumber = true;
    }

    console.log(this.firstOperand);
  }
  
  public doOperation(op: string){
    console.log(op);

    if(op === '!'){
      this.operator = op;
    }
    if(this.operator){
      console.log(this.operator + " " + this.currentNumber);
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
      this.waitForSecondNumber = true;
    }else if(this.firstOperand === 0){
      this.firstOperand = Number(this.currentNumber);
      this.waitForSecondNumber = false;
    }
    this.operator = '';
    this.negativeOperand = false;

    console.log(this.firstOperand);
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
  constructor() { }

  ngOnInit(): void {
  }

}
