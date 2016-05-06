/**
 * Config
 * 
 * This is the application-wide Configuration class. For simplicity, always use
 * static methods to return any config value;
 * 
 */

export class Config  {

  constructor() { }
  
  // Server port
  static PORT():number {
    return parseInt(process.env.ACRO_PORT, 10) || 4000;
  }
  
  // Build a Firebase URL based on the configured FB_NAME environment variable
  static FB_URL(): string {
    return (process.env.FB_NAME) ? `https://${process.env.FB_NAME}.firebaseio.com` : '';
  }
  
  // Your secret Firebase token
  static FB_TOKEN(): string {
    return process.env.FB_TOKEN || '';
  }
  
  // The worker queue uses this path to pick up Tasks. 
  // e.g. https://appname.firebaseio.com/path/to/queue/tasks
  static FB_TASKPATH(): string {
    return `${this.FB_QUEUEPATH}/tasks`;
  }
  
  // Where to add a new Task.
  // e.g. https://appname.firebaseio.com/path/to/queue
  static FB_QUEUEPATH(): string {
    return '/queue';
  }
}