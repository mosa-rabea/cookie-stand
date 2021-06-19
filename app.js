
'use strict';
let openingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let shops = [];
let salesTable = document.getElementById('salesTable');
let dailytotals = [];

function Shops(location, minCust, maxCust, CookiesSales) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cookiesSales = CookiesSales;
  this.cookiesSalesPerHour = [];
  this.TotalPerDay = 0;
  shops.push(this);
}
Shops.prototype.randomNumberGenerator = function(){
  return Math.ceil(Math.random() * ((this.maxCust) - (this.minCust)) + this.minCust);
};
Shops.prototype.cookiesSalesgenerator = function(){

  for (let i = 0; i < openingHours.length ; i++ ){
    
    let avg = Math.ceil((this.cookiesSales * this.randomNumberGenerator()) /14) ;
    
    this.cookiesSalesPerHour.push(avg);
    this.TotalPerDay += avg;

  }
};
Shops.prototype.render = function() {
  let trElement = document.createElement('tr');
  let thElement = document.createElement('th');
  thElement.textContent = this.location;
  trElement.appendChild(thElement);
  for (let i = 0; i < openingHours.length; i++) {
    let tdElement = document.createElement('td');
    tdElement.textContent = this.cookiesSalesPerHour[i];
    trElement.appendChild(tdElement);
  }
  let tdElement = document.createElement('td');
  tdElement.textContent = this.TotalPerDay;
  trElement.appendChild(tdElement);
  salesTable.appendChild(trElement);
};
new Shops('Seattle',23,65,6.3,0);
new Shops('Tokyo',3,24,1.2,0);
new Shops('Dubai',11,38,3.7,0);
new Shops('Paris',20,38,2.3,0);
new Shops('Lima',20,38,2.3,0);


function renderHeaderRow() {
  let tableHeadingsElement = document.createElement('thead');
  let tableRowElement = document.createElement('tr');
  let tableHeadElement = document.createElement('th');
  tableHeadElement.textContent = '';
  tableRowElement.appendChild(tableHeadElement);
  for (let i = 0; i < openingHours.length; i++) {
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = openingHours[i];
    tableRowElement.appendChild(tableHeadElement);
  }
  tableHeadElement = document.createElement('th');
  tableHeadElement.textContent = 'Daily Totals';
  tableRowElement.appendChild(tableHeadElement);
  tableHeadingsElement.appendChild(tableRowElement);
  salesTable.appendChild(tableHeadingsElement);
}
function renderFooterRow() {
  let tableFooterElement = document.createElement('tfoot');
  let tableRowElement = document.createElement('tr');
  let tableHeadElement = document.createElement('th');
  tableHeadElement.textContent = 'Hourly Totals';
  tableRowElement.appendChild(tableHeadElement);
  for (let i = 0; i < openingHours.length; i++) {
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = getdailytotalsForEachHour(i);
    tableRowElement.appendChild(tableHeadElement);
  }
  tableHeadElement = document.createElement('th');
  // tableHeadElement.textContent = dailytotalsSummation();
  tableHeadElement.textContent = dailytotalsSummation();
  tableRowElement.appendChild(tableHeadElement);
  tableFooterElement.appendChild(tableRowElement);
  salesTable.appendChild(tableFooterElement);
}
function getdailytotalsForEachHour(index){
  let gT = 0;
  for (let j = 0 ; j < shops.length ; j++){
    gT += shops[j].cookiesSalesPerHour[index] ;
  }
  dailytotals.push(gT);
  return gT;
}
function dailytotalsSummation(){
  let sum = 0;
  // alert(dailytotals);
  for (let i =0; i < dailytotals.length ; i++) {
    sum += dailytotals[i];
  }
  return sum;
}

function calculateAndRenderSalesData(){
  salesTable.innerHTML = ''
  renderHeaderRow();
  for(let i in shops) {
    shops[i].cookiesSalesgenerator();
    shops[i].render();

  }
  renderFooterRow();
}

calculateAndRenderSalesData();



let newlocform = document.getElementById('addNewLocationForm');
newlocform.addEventListener('submit',addNewLocation);

function addNewLocation(event){
  event.preventDefault();
 
  let locname,maxcus,mincus,avrgsales;
  locname = event.target.lname.value
  maxcus = event.target.maxCus.value
  mincus = event.target.minCus.value
  avrgsales = event.target.avgSales.value
  
  new Shops(locname,parseInt(mincus),parseInt(maxcus),parseFloat(avrgsales));
console.log(Shops)

  
  calculateAndRenderSalesData();


};