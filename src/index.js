import ToDo from "./todo.js";
import Project from "./project.js";
import DisplayController from "./display.js";

class AppController
{
    #projects = [];

    init()
    {
        const defaultProject = new Project("Default");
        this.#projects.push(defaultProject);
        this.#initCreateProjectForm();
        this.#initCreateToDoForm();
        this.#initUpdateToDoForm();
        DisplayController.clearProjectsDisplay();
        DisplayController.displayProjects(this.#projects);
    }

    #initUpdateToDoForm()
    {
        const updateToDoDialog = document.querySelector("#update-todo-dialog");
        updateToDoDialog.addEventListener("toggle", () => {
            if (!updateToDoDialog.open)
            {
                return;
            }

            const id = document.querySelector("#update-todo-id").value;

            const targetTodo = this.#getTodoByID(id);

            document.querySelector("#update-todo-title").value = targetTodo.title;
            document.querySelector("#update-todo-description").value = targetTodo.description;
            document.querySelector("#update-todo-due-date").value = targetTodo.dueDate;
            document.querySelector("#update-todo-priority").value = targetTodo.priority;
        });
        

        const updateToDoForm = document.querySelector("#update-todo-form");
        updateToDoForm.addEventListener("reset", () => updateToDoDialog.close());
        updateToDoForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!updateToDoForm.checkValidity())
            {
                updateToDoForm.reportValidity();
                return;
            }

            updateToDoDialog.close();

            const id = document.querySelector("#update-todo-id").value;
            const title = document.querySelector("#update-todo-title").value;
            const description = document.querySelector("#update-todo-description").value;
            const dueDate = document.querySelector("#update-todo-due-date").value;
            const priority = document.querySelector("#update-todo-priority").value;

            const todo = this.#getTodoByID(id);
            todo.title = title;
            todo.description = description;
            todo.dueDate = dueDate;
            todo.priority = priority;

            DisplayController.clearProjectsDisplay();
            DisplayController.displayProjects(this.#projects);

            updateToDoForm.reset();
        });
    }

    #getTodoByID(id)
    {
        for (const project of this.#projects)
        {
            for (const todo of project.todos)
            {
                if (id === todo.id)
                {
                    return todo;
                }
            }
        }
        return null;
    }

    #initCreateToDoForm()
    {
        const createToDoButton = document.querySelector("#create-todo-button");
        const createToDoDialog = document.querySelector("#create-todo-dialog");
        createToDoButton.addEventListener("click", () => {
            this.#clearProjectSelector();
            this.#fillProjectSelector();
            createToDoDialog.showModal()
        });
        const createToDoForm = document.querySelector("#create-todo-form");
        createToDoForm.addEventListener("reset", () => createToDoDialog.close());
        createToDoForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!createToDoForm.checkValidity())
            {
                createToDoForm.reportValidity();
                return;
            }

            createToDoDialog.close();

            const projectTitle = document.querySelector("#todo-project").value;
            const title = document.querySelector("#todo-title").value;
            const description = document.querySelector("#todo-description").value;
            const dueDate = document.querySelector("#todo-due-date").value;
            const priority = document.querySelector("#todo-priority").value;

            const todo = new ToDo(title, description, dueDate, priority);

            for (const project of this.#projects)
            {
                if (project.title === projectTitle)
                {
                    project.todos.push(todo);
                }
            }

            DisplayController.clearProjectsDisplay();
            DisplayController.displayProjects(this.#projects);

            createToDoForm.reset();
        });
    }

    #fillProjectSelector()
    {
        const projectSelector = document.querySelector("#todo-project");
        for (const project of this.#projects)
        {
            const projectOption = document.createElement("option");
            projectOption.value = project.title;
            projectOption.textContent = project.title;
            projectSelector.appendChild(projectOption);
        }
    }

    #clearProjectSelector()
    {
        const projectSelector = document.querySelector("#todo-project");
        while (projectSelector.firstChild)
        {
            projectSelector.removeChild(projectSelector.lastChild);
        }
    }

    #initCreateProjectForm()
    {
        const createProjectButton = document.querySelector("#create-project-button");
        const createProjectDialog = document.querySelector("#create-project-dialog");
        createProjectButton.addEventListener("click", () => createProjectDialog.showModal());
        const createProjectForm = document.querySelector("#create-project-form");
        createProjectForm.addEventListener("reset", () => createProjectDialog.close());
        createProjectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!createProjectForm.checkValidity())
            {
                createProjectForm.reportValidity();
                return;
            }

            createProjectDialog.close();

            const title = document.querySelector("#project-title").value;

            const project = new Project(title);
            this.#projects.push(project);

            DisplayController.clearProjectsDisplay();
            DisplayController.displayProjects(this.#projects);

            createProjectForm.reset();
        });
    }
}

const app = new AppController();
app.init();