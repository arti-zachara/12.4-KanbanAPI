//   Column class constructor
function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || "New tasks' group";

  this.element = generateTemplate("column-template", {
    name: this.name,
    id: this.id
  });
  // events
  this.element
    .querySelector(".column")
    .addEventListener("click", function(event) {
      if (
        event.target.classList.contains("btn-delete") ||
        event.target.classList.contains("fa-times")
      ) {
        self.removeColumn();
      }

      if (
        event.target.classList.contains("add-card") ||
        event.target.classList.contains("btn-add")
      ) {
        var nameProvided = prompt("Enter the name of the card", "New task");
        if (nameProvided != null) {
          var cardName = nameProvided;
          event.preventDefault();
          // use built in key-value construct
          var data = new FormData();
          data.append("name", cardName);
          data.append("bootcamp_kanban_column_id", self.id);

          fetch(baseUrl + "/card", {
            method: "POST",
            headers: myHeaders,
            body: data
          })
            .then(function(res) {
              return res.json();
            })
            .then(function(resp) {
              var card = new Card(resp.id, cardName);
              self.addCard(card);
            });
        }
      }
    });
}
// Column methods
Column.prototype = {
  addCard: function(card) {
    this.element.querySelector("ul").appendChild(card.element);
  },
  removeColumn: function() {
    var self = this;
    fetch(baseUrl + "/column/" + self.id, {
      method: "DELETE",
      headers: myHeaders
    })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      });
  }
};
