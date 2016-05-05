export class Config  {

  constructor() { }
  
  static PORT():number {
    return parseInt(process.env.ACRO_PORT, 10) || 4000;
  }
}