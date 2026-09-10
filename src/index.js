import ToDo from "./todo.js";
import Project from "./project.js";
import DisplayController from "./display.js";

class AppController
{
    #projects = [];

    init()
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