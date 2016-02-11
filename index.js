"use strict";

function* load() {
  let response = yield fetch("data.json");
  let json = yield response.json();

  let root = document.createElement("ul");
  document.body.appendChild(root);
  root.id = "root";
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
      li.textContent = itemName;
      let progress = document.createElement("div");
      li.appendChild(progress);
      progress.classList.add("progress");
      progress.textContent = itemValue;
    }
  }

  summarize(document.querySelectorAll(".progress"));

  for (let progress of document.querySelectorAll(".progress")) {
    addProgressBar(progress);
  }
}

function summarize(items) {
  let itemCount = items.length;
  let progressSum = [...items].reduce((sum, progress) => {
    return sum + Number(progress.textContent);
  }, 0);

  let root = document.getElementById("root");
  let summary = document.createElement("li");
  root.appendChild(summary);
  summary.id = "summary";
  summary.textContent = "Total";
  let progress = document.createElement("div");
  summary.appendChild(progress);
  progress.classList.add("progress");
  progress.textContent = progressSum / itemCount;
}

function addProgressBar(progress) {
  let percent = progress.textContent;
  progress.textContent = "";

  let center = document.createElement("div");
  progress.appendChild(center);
  center.classList.add("progress-center");

  let centerFill = document.createElement("div");
  progress.appendChild(centerFill);
  centerFill.classList.add("progress-center-fill");

  let fill = document.createElement("div");
  progress.appendChild(fill);
  fill.classList.add("progress-fill");

  let value = document.createElement("div");
  fill.appendChild(value);
  value.classList.add("progress-value");

  fill.style.width = value.textContent = `${percent}%`;

  if (percent > 43) {
    var centerWidth = Math.min(percent - 43, 13.34);
    centerFill.style.width = `${centerWidth}%`;
  }
}

co(load).catch(e => console.error(e));
