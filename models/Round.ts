export interface IRound {
  scores: Object;
  letters: string[];
  validator: string;
  category: string;
  countdown: number;
}

export class Round implements IRound {
  
  scores: Object;
  letters: string[];
  validator: string;
  category: string;
  countdown: number;
  
  constructor() {
  }
  
  // Update the countdown
  updateCountdown(operand: string, callback?: Function) {
    var o = parseInt(operand, 10);
    var newCount = 0;
    
    if (this.countdown > 0) {
      newCount = this.countdown + o;
      this.countdown = newCount;
    }
    
    if (callback) {
      callback(newCount);
    }
  }
  
  // Push to Firebase
  push() {
    // Todo: pusht to Firebase 
  }
}