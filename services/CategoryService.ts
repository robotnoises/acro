/**
 * CategoryService.ts
 * 
 * Randomly choose a Category
 */

/**
 * CategoryService
 * 
 * A service that provides a random category.
 */

export class CategoryService {
  
  private static getRandom(max: number, not?: number[]) {
    return Math.floor(Math.random() * max);
  }
  
  /**
   * chose(): string
   * 
   * @param {number[]} not (optional) - An array of blacklisted indexes
   */
  
  static choose(not?: number[]): string {
    var numCategories = Object.keys(_categories).length;
    return _categories[this.getRandom(numCategories, not)];
  }
}

/**
 * _categories
 * 
 * An object literal containing all possible Categories
 */

var _categories = {
  0: "If you were President?",
  1: "What are you wearing?",
  2: "Your Favorite food?",
  3: "Your dream job?",
  4: "What's that smell?",
  5: "What was that noise?",
  6: "Your greatest fear?",
  7: "Drones",
  8: "Children's Books",
  9: "Sports",
  10: "Movies",
  11: "Television",
  12: "Music",
  13: "Pro Wrestling",
  14: "Motorsports",
  15: "Football",
  16: "Baseball",
  17: "Hockey",
  18: "Golf",
  19: "Basketball",
  20: "Guns",
  21: "Super Heroes",
  22: "Spandex",
  23: "The Olympics",
  24: "Internet Memes",
  25: "Robots",
  26: "Poetry",
  27: "Harry Potter",
  28: "Soccer",
  29: "Video Games",
  30: "Cute Baby Animals",
  31: "Aliens",
  32: "Electric Cars",
  33: "Selfies",
  34: "Sweatpants",
  35: "Prescription Drugs",
  36: "Game of Thrones",
  37: "Religion",
  38: "Scientology",
  39: "Toys",
  40: "Doing Laundry",
  41: "Working Out",
  42: "Dating",
  43: "Getting Married",
  44: "Voting",
  45: "Camping",
  46: "Naps",
  47: "Arguing on the Internet",
  48: "Shopping",
  49: "Job Interviews",
  50: "In the Bathroom",
  51: "The Mall",
  52: "The Internet",
  53: "The Beach",
  54: "On a Boat",
  55: "On an Island",
  56: "In a Dungeon",
  57: "Silicon Valley",
  58: "New York City",
  59: "Mars",
  60: "The Moon",
  61: "At the Dentist",
  62: "Broadway",
  63: "At the Circus",
  64: "Birthday Party",
  65: "In the Jungle",
  66: "Church",
  67: "School",
  68: "Public Library",
  69: "Vacation",
  70: "Hollywood",
  71: "Wall Street",
  72: "At a Concert",
  73: "Donald Trump",
  74: "Kanye West",
  75: "Kim Kardashian",
  76: "Vladamir Putin",
  77: "Beyonce",
  78: "Tim Tebow",
  79: "Lebron James",
  80: "Jeb Bush",
  81: "George W. Bush",
  82: "Barak Obama",
  83: "Kim Jong Un",
  84: "Taylor Swift",
  85: "Charlie Sheen",
  86: "Caitlyn Jenner",
  87: "Ronda Rousey",
  88: "Edward Snowden",
  89: "Pope Francis",
  90: "The Rock",
  91: "Queen Elizabeth",
  92: "Politicians",
  93: "Lawyers",
  94: "The Elderly",
  95: "Millennials",
  96: "Zombies",
  97: "Moms",
  98: "Dads",
  99: "Baristas",
  100: "Used Car Salesmen",
  101: "Pro Athletes",
  102: "Rappers",
  103: "Babies",
  104: "Pizza Toppings",
  105: "Alcohol",
  106: "Dessert",
  107: "Vegans",
  108: "Gluten-Free",
  109: "Snacks",
  110: "Grocery Shopping",
  111: "Cooking",
  112: "Fast Food",
  113: "Avocados",
  114: "Diets",
  115: "Mayonaise",
  116: "Salad",
  117: "Sandwiches",
  118: "Eating",
  119: "Apple",
  120: "Microsoft",
  121: "Snapchat",
  122: "Wal mart",
  123: "Uber",
  124: "Amazon",
  125: "The Government",
  126: "McDonald's",
  127: "Fox News",
  128: "Twitter",
  129: "Disney",
  130: "Youtube",
  131: "Facebook"
};
