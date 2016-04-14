export class Config  {

  constructor() {
  }
  
  static DATABASE_SCHEMA():string {
    return process.env.ACRO_DATABASE_SCHEMA || 'db_acro';
  }
  
  static DATABASE_URL():string {
    return process.env.ACRO_DATABASE_URL || 'postgres://localhost:5432';
  }
  
  static PORT():number {
    return parseInt(process.env.ACRO_PORT, 10) || 4000;
  }
}