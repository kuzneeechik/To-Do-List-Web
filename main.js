let task = document.querySelector("#todo");
const add = document.querySelector("#add");
let list = document.querySelector("#list");

add.addEventListener("click", () => {
    let text = task.value;

    if (text != "")
    {
        let element = document.createElement("div");
        element.className = "element";
        element.innerHTML = text;
        element.contentEditable = true;

        let direction = document.createElement("div");
        direction.className = "direction";

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        direction.appendChild(checkbox);

        let cross = document.createElement("button");
        cross.className = "delete";
        direction.appendChild(cross);

        element.appendChild(direction);

        if (list.childElementCount === 0)
        {
            let emptyList = document.querySelector(".emptyList");
            emptyList.remove();
        }

        list.appendChild(element);

        task.value = "";
    }
})

list.addEventListener("click", (event) => {
    if (event.target.className === "delete")
    {
        const currentTask = event.target.closest(".element");

        if (currentTask)
        {
            currentTask.remove();
        }

        if (list.childElementCount === 0)
        {
            let emptyList = document.createElement("h2");
            emptyList.textContent = "Пока здесь ничего нет...";
            emptyList.className = "emptyList";
            
            let taskList = document.querySelector(".task-list");
            taskList.appendChild(emptyList);
        }
    }
})

list.addEventListener("click", (event) => {
    if (event.target.type === "checkbox")
    {
        let currentTask = event.target.closest(".element");

        if (currentTask && !currentTask.classList.contains("checked"))
        {
            currentTask.classList.add("checked");
        }
        else if (currentTask && currentTask.classList.contains("checked"))
        {
            currentTask.classList.remove("checked");
        }
    }
})

let saveButton = document.querySelector(".save");

saveButton.addEventListener("click", () => {
    let tasks = [];

    document.querySelectorAll(".element")
            .forEach((current) => {
                let taskText = current.firstChild.textContent.trim();
                let checked = current.classList.contains("checked");

                tasks.push({
                    task: taskText,
                    done: checked
                })
            })
    
    const json = JSON.stringify(tasks);

    const blob = new Blob([json], { type: "application/json" });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "todolist.json";
    a.click();

    URL.revokeObjectURL(a.href);
})

let openButton = document.querySelector("#file-input");

openButton.addEventListener("change", (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event)
    {
        const tasks = JSON.parse(event.target.result);

        list.innerHTML = "";

        let emptyList = document.querySelector(".emptyList");

        if (emptyList) {
            emptyList.remove();
        }

        tasks.forEach((t) => {
            let element = document.createElement("div");
            element.className = "element";
            element.innerHTML = t.task;
            element.contentEditable = true;

            if (t.done) {
                element.classList.add("checked");
            }

            let direction = document.createElement("div");
            direction.className = "direction";

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");

            if (t.done) {
                checkbox.checked = true;
            }

            direction.appendChild(checkbox);

            let cross = document.createElement("button");
            cross.className = "delete";
            direction.appendChild(cross);

            element.appendChild(direction);
            list.appendChild(element);
        });

        if (tasks.length === 0) {
            let emptyList = document.createElement("h2");
            emptyList.textContent = "Пока здесь ничего нет...";
            emptyList.className = "emptyList";
            
            let taskList = document.querySelector(".task-list");
            taskList.appendChild(emptyList);
        }
    }
})