import { Project } from "../models/Project.js";
import { STORE } from "../store.js";

// The services job is to control data access
class ProjectService {
  setActiveProject(projectId) {
    let project = STORE.state.projects.find(p => p.id == projectId);

    if (!project) {
      throw new Error("Invalid Id");
    }

    // TODO check project members

    STORE.state.activeProject = project;
  }
  async createProject(projectData) {
    let response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectData)
    });

    let data = await response.json();

    let project = new Project(data);
    STORE.state.projects.push(project);
    STORE.commit("projects", STORE.state.projects); // [...STORE.state.projects, project]
  }

  async getProjects() {
    let response = await fetch("/api/projects");
    let data = await response.json();

    let projects = data.map(p => new Project(p));
    STORE.commit("projects", projects);
  }
}

export const projectService = new ProjectService();

// client controller -> client service -> server controller -> server service -> db
