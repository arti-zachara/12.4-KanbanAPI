// API variables
var baseUrl = "https://kodilla.com/pl/bootcamp-api";
var myHeaders = {
  "X-Client-Id": "4007",
  "X-Auth-Token": "a00c7979c4ace94a0a79a4dbca7e862b",
  "Content-Type": "application/json"
};

// getting information on board columns
fetch(baseUrl + "/board", { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });

// columns' setup
function setupColumns(columns) {
  columns.forEach(function(column) {
    var col = new Column(column.id, column.name);
    board.addColumn(col);
    setupCards(col, column.cards);
  });
}

// cards' setup
function setupCards(col, cards) {
  cards.forEach(function(card) {
    var cardObj = new Card(card.id, card.name);
    col.addCard(cardObj);
  });
}

// generating mustache templates
function generateTemplate(name, data, basicElement) {
  var template = document.getElementById(name).innerHTML;
  var element = document.createElement(basicElement || "div");

  Mustache.parse(template);
  element.innerHTML = Mustache.render(template, data);

  return element;
}
