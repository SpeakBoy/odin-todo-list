class DisplayController 
{
    static clearProjectsDisplay()
    {
        const projectsContainer = document.querySelector("#projects");
        
        while (projectsContainer.firstChild)
        {
            projectsContainer.removeChild(projectsContainer.lastChild);
        }
    }

    static displayProjects(projects)
    {
        const projectsContainer = document.querySelector("#projects");

        for (const project of projects)
        {
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project");

            const projectTitleHeading = document.createElement("h3");
            projectTitleHeading.textContent = project.title;

            const projectToDos = document.createElement("div");
            for (const todo of project.todos)
            {
                const toDoDisplay = document.createElement("div");
                const toDoSummary = document.createElement("p");
                toDoSummary.textContent = `${todo.title} - ${todo.dueDate}`;
                switch (todo.priority)
                {
                    case "high":
                        toDoSummary.style.color = "red";
                        break;
                    case "medium":
                        toDoSummary.style.color = "orange";
                        break;
                    case "low":
                        toDoSummary.style.color = "green";
                        break;
                }

                const updateToDoDialog = document.querySelector("#update-todo-dialog");
                const updateToDoButton = document.createElement("button");
                updateToDoButton.textContent = "Update";
                updateToDoButton.addEventListener("click", () => {
                    document.querySelector("#update-todo-id").value = todo.id;
                    updateToDoDialog.showModal();
                });

                toDoDisplay.appendChild(toDoSummary);
                toDoDisplay.appendChild(updateToDoButton);

                projectToDos.appendChild(toDoDisplay);
            }
            
            projectContainer.appendChild(projectTitleHeading);
            projectContainer.appendChild(projectToDos);

            projectsContainer.appendChild(projectContainer);
        }
    }
}

export default DisplayController;