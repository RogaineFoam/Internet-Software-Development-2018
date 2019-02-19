// FUNCTIONAL \\
class ClientInformation{

  constructor(id, name, address, phone, email)
  {
   this.id=id;
   this.name=name;
   this.address=address;
   this.phone=phone;
   this.email=email;
  }

 // Retrieve current client ID
  getID()
  {
    // get information
    return this.id;
  }

 // set the client ID in browser
  setId(id)
  {
    // write to the html document, in progress
    this.id=id;
  }

 // get the current name
  getName()
  {
    // get information
    return this.name; // pseudocode for now until db implemented
  }

 // setName by parameter provided.
  setName(name)
  {
    // write to the html document, in progress
    this.name=name;
  }

 // return the current address variable
  getAddress()
  {
    // get the information from database
    return this.address;
  }

 // set the current address variable
  setAddress(address)
  {
<<<<<<< HEAD
    // write to the html document, in progress
=======
>>>>>>> 0a46119b8f36356134d1a69d4af82c75a4569b40
    this.address=address;
  }

 // return current phone number
  getPhone()
  {
    // get the information from database
    return this.phone;
  }

 // set phone value for client
  setPhone(phone)
  {
    // write to the html document, in progress
    this.phone=phone;
  }

 // return current email address
  getEmail()
  {
    // get the information from database
    return this.email;
  }

 // set new email value for client
  setEmail(email)
  {
    // write to the html document, in progress
    this.email=email;
  }

}

// FUNCTIONAL \\
class Quote {

  constructor(id, gallonsRequested, deliveryDate, requestDate, deliveryLocation, deliveryContactName, deliveryContactPhone, deliveryContactEmail, suggestedPrice, totalAmountDue){
    this.id=id;
    this.gallonsRequested=gallonsRequested;
    this.deliveryDate=deliveryDate;
    this.requestDate=requestDate;
    this.deliveryLocation=deliveryLocation;
    this.deliveryContactName=deliveryContactName;
    this.deliveryContactPhone=deliveryContactPhone;
    this.deliveryContactEmail=deliveryContactEmail;
    this.suggestedPrice=suggestedPrice;
    this.totalAmountDue=totalAmountDue;
  }

 // getFrom database
  getID()
  {
    return this.id;
  }

 // not implemented, no database, set locally in object. \\
  setID(id)
  {
    this.id = id;
    // store to database here
  }
 // return gallonsRequested
  getGallonsRequested()
  {
    return this.gallonsRequested;
  }

 // not implemented, no database, set locally in object. \\
  setGallonsRequested(gallonsRequested)
  {
    this.gallonsRequested=gallonsRequested;
    // store to database here
  }

  getDeliveryDate()
  {
    return this.deliveryDate;
  }

 // not implemented, no database, set locally in object. \\
  setDeliveryDate(deliveryDate)
  {
    this.deliveryDate=deliveryDate;
    // store to database here
  }

  getRequestDate()
  {
    return this.requestDate;
  }

 // not implemented, no database, set locally in object.
  setRequestDate(requestDate)
  {
    this.requestDate=requestDate;
    // store to database here
  }

  getDeliveryLocation()
  {
    return this.deliveryLocation;
  }

 // not implemented, no database, set locally in object.
  setDeliveryLocation(deliveryLocation)
  {
    this.deliveryLocation=deliveryLocation;
    // store to database here
  }

  getDeliveryContactName()
  {
    return this.deliveryContactName;
  }

 // not implemented, no database, set locally in object.
  setDeliveryContactName(deliveryContactName)
  {
    this.deliveryContactName=deliveryContactName;
    // store to database here
  }

  getDeliveryContactPhone()
  {
   return this.deliveryContactPhone;
  }

 // not implemented, no database, set locally in object.
  setDeliveryContactPhone(deliveryContactPhone)
  {
    this.deliveryContactPhone=deliveryContactPhone;
    // store to database here
  }

  getDeliveryContactEmail()
  {
    return this.deliveryContactEmail;
  }

 // not implemented, no database, set locally in object.
  setDeliveryContactEmail(deliveryContactEmail)
  {
    this.deliveryContactEmail=deliveryContactEmail;
    // store to database here
  }

  getSuggestedPrice()
  {
    return this.suggestedPrice;
  }

 // not implemented, no database, set locally in object.
  setSuggestedPrice(suggestedPrice)
  {
    this.suggestedPrice=suggestedPrice;
    // store to database
  }

  getTotalAmountDue()
  {
    return this.totalAmountDue;
  }

 // not implemented, no database, set locally in object.
  setTotalAmountDue(totalAmountDue)
  {
    this.totalAmountDue=totalAmountDue;
    // store to database
  }
}

// FUNCTIONAL \\
class quoteHistory{

  constructor()
  {
    // create an empty array
    this.quoteList=[];
  }

  addQuote(quoteObj)
  {
   // if the value passed is a wuote object then push it.
    if(quoteObj instanceof Quote)
    {
      // add to the array
      this.quoteList.push(quoteObj);
    }
  }

  showHistory()
  {
    // for now print to console, later print to html document.
    console.log(this.quoteList);
  }

}


// Notes \\
 // Need to write main driver to pull information from the requestQuote web form
 // and write this data to construct a new Quote object which is then placed in
 // an array of Quotes implemented in the above class.


 // Testing the ClientInformation Class:
 // Note:
 //   - input passed via constructor.
 //   - can create member variables to the class on he fly.
 //
 // TESTED SUCCESSFULLY

/*
var name="Hello";
var id=69;
var address="1234 test lane";
var phone="980-029-7627";
var email="sap163@txstate.edu";
let obj = new ClientInformation(id,name,address,phone,email);
console.log(obj);

// new data created
name="Not Hello";
id=265;
address="4321 test lane";
phone="000-000-0000";
email="this.sam.pugh@gmail.com";

// printing results to console
console.log(obj.name);
console.log(obj.id);
console.log(obj.address);
console.log(obj.phone);
console.log(obj.email);

console.log("---------------------------------------");

// setting new data within the class
obj.setName(name);
obj.setId(id);
obj.setAddress(address);
obj.setPhone(phone);
obj.setEmail(email);

// printing results to console
console.log(obj.name);
console.log(obj.id);
console.log(obj.address);
console.log(obj.phone);
console.log(obj.email);


// Testing for Quote Class:
//   Note:
//     - Input does not need to be passed to constructor,
//       can be built afterwards.
//
//   TESTED SUCCESSFULLY


let quote1=new Quote();
let quote2=new Quote();
quote1.id=15;
quote1.gallonsRequested=10;
quote1.deliveryDate="10/12/2018";
quote1.requestDate="10/10/2018";
quote1.deliveryLocation="Silicon Valley";
quote1.deliveryContactName="Bleeehh";
quote1.deliveryContactPhone="902-380-2928";
quote1.deliveryContactEmail="email@email.com"
quote1.suggestedPrice=500.00;
quote1.totalAmountDue=500.34;

// test get methods
console.log(quote1.getID());
console.log(quote1.getGallonsRequested());
console.log(quote1.getDeliveryDate());
console.log(quote1.getRequestDate());
console.log(quote1.getDeliveryLocation());
console.log(quote1.getDeliveryContactName());
console.log(quote1.getDeliveryContactPhone());
console.log(quote1.getDeliveryContactEmail());
console.log(quote1.getSuggestedPrice());
console.log(quote1.getTotalAmountDue());

// new line between test cases
console.log("---------------------------------------");

// test set methods
quote2.setID(69);
quote2.setGallonsRequested(100);
quote2.setDeliveryDate("test-success");
quote2.setRequestDate("test-success");
quote2.setDeliveryLocation("test-success");
quote2.setDeliveryContactName("test-success");
quote2.setDeliveryContactPhone("test-success");
quote2.setDeliveryContactEmail("test-success");
quote2.setSuggestedPrice(0.58);
quote2.setTotalAmountDue(0.47);

// test get methods
console.log(quote2.getID());
console.log(quote2.getGallonsRequested());
console.log(quote2.getDeliveryDate());
console.log(quote2.getRequestDate());
console.log(quote2.getDeliveryLocation());
console.log(quote2.getDeliveryContactName());
console.log(quote2.getDeliveryContactPhone());
console.log(quote2.getDeliveryContactEmail());
console.log(quote2.getSuggestedPrice());
console.log(quote2.getTotalAmountDue());

// create a quote history object
let history = new quoteHistory();

// add currently created quotes to the DS
history.addQuote(quote1);
history.addQuote(quote2);

// Show the contents of the array
history.showHistory();
*/
