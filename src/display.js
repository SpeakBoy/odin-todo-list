class DisplayController 
{
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
                toDoDisplay.textContent = `${todo.title} - ${todo.dueDate}`;

                projectToDos.appendChild(toDoDisplay);
            }
            
            projectContainer.appendChild(projectTitleHeading);
            projectContainer.appendChild(projectToDos);

            projectsContainer.appendChild(projectContainer);
        }
    }

}

export { DisplayController };