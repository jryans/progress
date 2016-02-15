"use strict";

function* load() {
  let response = yield fetch("data.json");
  let json = yield response.json();

  let root = document.body;
  root.id = "root";
  for (let groupName in json) {
    let groupValue = json[groupName];
    let group = document.createElement("h3");
    root.appendChild(group);
    group.textContent = groupName;
    for (let taskName in groupValue) {
      let taskValue = groupValue[taskName];
      let task = document.createElement("div")
      root.appendChild(task);
      task.classList.add("task");
      let taskLabel = document.createElement("span");
      task.appendChild(taskLabel);
      taskLabel.classList.add("label");
      taskLabel.textContent = taskName;
      let progress = document.createElement("div");
      task.appendChild(progress);
      progress.classList.add("progress");
      progress.textContent = taskValue;
    }
  }

  summarize(document.querySelectorAll(".progress"));

  for (let progress of document.querySelectorAll(".progress")) {
    addProgressBar(progress);
  }
}

function summarize(tasks) {
  let taskCount = tasks.length;
  let progressSum = [...tasks].reduce((sum, progress) => {
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
  progress.textContent = progressSum / taskCount;
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
