"use strict";

function* load() {
  let response = yield fetch("data.json");
  let json = yield response.json();

  let root = document.createElement("ul");
  document.body.appendChild(root);
  for (let groupName in json) {
    let groupValue = json[groupName];
    let li = document.createElement("li");
    root.appendChild(li);
    li.textContent = groupName;
    let group = document.createElement("ul");
    li.appendChild(group);
    for (let itemName in groupValue) {
      let itemValue = groupValue[itemName];
      let li = document.createElement("li")
      group.appendChild(li);
      li.textContent = `${itemName}: ${itemValue}`;
    }
  }
}

co(load).catch(e => console.error(e));
