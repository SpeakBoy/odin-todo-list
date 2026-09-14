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
                toDoDisplay.textContent = `${todo.title} - ${todo.dueDate}`;
                switch (todo.priority)
                {
                    case "high":
                        toDoDisplay.style.color = "red";
                        break;
                    case "medium":
                        toDoDisplay.style.color = "orange";
                        break;
                    case "low":
                        toDoDisplay.style.color = "green";
                        break;
                }


                projectToDos.appendChild(toDoDisplay);
            }
            
            projectContainer.appendChild(projectTitleHeading);
            projectContainer.appendChild(projectToDos);

            projectsContainer.appendChild(projectContainer);
        }
    }

}

export default DisplayController;