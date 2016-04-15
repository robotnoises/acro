export class Config  {

  constructor() {
  }
  
  static DATABASE_SCHEMA():string {
    return process.env.ACRO_DATABASE_SCHEMA || 'acro';
  }
  
  static DATABASE_URL():string {
    return process.env.ACRO_DATABASE_URL || 'postgres://localhost:5432/acrodb';
  }
  
  static PORT():number {
    return parseInt(process.env.ACRO_PORT, 10) || 4000;
  }
  
  static SSL(): boolean {
    return (process.env.POSTGRES_SSL) ? process.env.POSTGRES_SSL === 'true' : false;
  }
}