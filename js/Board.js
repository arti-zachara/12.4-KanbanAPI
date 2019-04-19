var board = {
  name: "Kanban Board",
  // Board methods
  addColumn: function(column) {
    this.element.appendChild(column.element);
    var sorterColumn = document.getElementById(column.id);
    initSortable(sorterColumn, "kanban-column");
  },
  element: document.querySelector("#board .column-container")
};
// events
document
  .querySelector("#board .create-column")
  .addEventListener("click", function() {
    var nameProvided = prompt("Enter a column name", "New list");
    if (nameProvided != null) {
      var name = nameProvided;

      var data = new FormData();
      data.append("name", name);

      fetch(baseUrl + "/column", {
        method: "POST",
        headers: myHeaders,
        body: data
      })
        .then(function(resp) {
          return resp.json();
        })
        .then(function(resp) {
          var column = new Column(resp.id, name);
          board.addColumn(column);
        });
    }
  });

function initSortable(element, group) {
  var el = element;
  var sortable = Sortable.create(el, {
    group: group,
    sort: true,
    animation: 150
  });
}
