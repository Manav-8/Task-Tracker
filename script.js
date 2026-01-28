document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const categorySelect = document.getElementById("categorySelect");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const errorMsg = document.getElementById("error");

    const priorityBtns = document.querySelectorAll(".priority-btn");
    const filterBtns = document.querySelectorAll("#filters button");
    const categoryFilter = document.getElementById("categoryFilterSelect");
    const themeToggle = document.getElementById("themeToggle");

    let selectedPriority = "high";
    let currentFilter = "all";
    let categoryFilterValue = "all";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    /* Theme */
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeToggle.innerText = "Light Mode";
    }

    themeToggle.onclick = () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        themeToggle.innerText = isDark ? "Light Mode" : "Dark Mode";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    /* Priority selection */
    priorityBtns.forEach(btn => {
        btn.onclick = () => {
            priorityBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedPriority = btn.dataset.priority;
        };
    });

    /* Add task */
    addBtn.onclick = () => {
        const text = taskInput.value.trim();
        if (!text) {
            errorMsg.innerText = "Enter a task";
            return;
        }

        tasks.push({
            id: Date.now(),
            text,
            dueDate: dueDateInput.value,
            priority: selectedPriority,
            category: categorySelect.value === "all" ? "other" : categorySelect.value,
            done: false
        });

        taskInput.value = "";
        dueDateInput.value = "";
        errorMsg.innerText = "";

        save();
        render();
    };

    /* Filters */
    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            render();
        };
    });

    categoryFilter.onchange = () => {
        categoryFilterValue = categoryFilter.value;
        render();
    };

    function render() {
        taskList.innerHTML = "";

        tasks.forEach(task => {

            if (currentFilter === "done" && !task.done) return;
            if (currentFilter === "pending" && task.done) return;
            if (["high","medium","low"].includes(currentFilter) && task.priority !== currentFilter) return;
            if (categoryFilterValue !== "all" && task.category !== categoryFilterValue) return;

            const li = document.createElement("li");
            li.className = `task ${task.priority}`;

            if (task.done) li.classList.add("done");

            const badge = document.createElement("span");
            badge.className = "category-badge";
            badge.innerText = task.category;

            const textSpan = document.createElement("span");
            textSpan.innerText = task.text;
            textSpan.className = "task-text";

            li.appendChild(badge);
            li.appendChild(textSpan);

            if (task.dueDate) {
                const due = document.createElement("div");
                due.className = "due-date";
                due.innerText = "Due: " + task.dueDate;
                li.appendChild(due);
            }

            const doneBtn = document.createElement("button");
            doneBtn.innerText = task.done ? "Undo" : "Done";
            doneBtn.onclick = () => {
                task.done = !task.done;
                save();
                render();
            };

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.className = "edit-btn";
            editBtn.onclick = () => {
                const updated = prompt("Edit task", task.text);
                if (updated) {
                    task.text = updated;
                    save();
                    render();
                }
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => {
                tasks = tasks.filter(t => t.id !== task.id);
                save();
                render();
            };

            li.appendChild(doneBtn);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    function save() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    render();
});
