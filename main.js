// declare variables
let add = document.querySelector("#add");
let input = document.querySelector("#input");
let outputList = document.querySelector("#list");
let removeAll = document.querySelector(".clear");
var arrayOfTasks;

// window.localStorage.clear();
if (window.localStorage.getItem("array")) {
  arrayOfTasks = JSON.parse(window.localStorage.array);
  readFn();
} else {
  arrayOfTasks = [];
}

add.onclick = function () {
  if (input.value !== "") {
    createFn(input.value);
    readFn();
    // remove value from input
    input.value = "";
    // location.reload();
  }
};

// createFunction

function createFn(textValue) {
  // setp 1 = create Task
  const task = {
    title: textValue,
    complate: false,
  };
  // setp 2 = add task to arrayOfTasks
  arrayOfTasks.push(task);
  // step 3 = add arrayOfTasks to localStorage
  window.localStorage.setItem("array", JSON.stringify(arrayOfTasks));
}

// readFunction

function readFn() {
  // var arrayOfTasks = JSON.parse(window.localStorage.getItem("array"));
  outputList.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("delete"));
    span.className = "del";
    li.appendChild(document.createTextNode(task.title));
    li.appendChild(span);
    outputList.appendChild(li);
  });
}

outputList.addEventListener("click", function (e) {
  let parent = e.target.parentElement;
  if (e.target.classList.contains("del")) {
    parent.remove();
  }
  let arr = JSON.parse(window.localStorage.getItem("array"));
  arr.splice(arrayOfTasks.indexOf(parent), 1);
  window.localStorage.setItem("array", JSON.stringify(arr));
});

removeAll.addEventListener("click", function (e) {
  outputList.innerHTML = "";
  window.localStorage.clear();
});
