export class Config  {

  constructor() { }
  
  static PORT():number {
    return parseInt(process.env.ACRO_PORT, 10) || 4000;
  }
  
  static FB_URL(): string {
    return (process.env.FB_NAME) ? `https://${process.env.FB_NAME}.firebaseio.com` : '';
  }
  
  static FB_TOKEN(): string {
    return process.env.FB_TOKEN || '';
  }
  
  static FB_QUEUEPATH(): string {
    return '/queue';
  }
  
  static FB_TASKPATH(): string {
    return `${this.FB_QUEUEPATH}/tasks`;
  }
}