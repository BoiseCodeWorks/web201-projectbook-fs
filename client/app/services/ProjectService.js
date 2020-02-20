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
  createProject(projectData) {
    if (STORE.state.projects.length >= 3) {
      throw new Error("You've exceeded your limit! Send us Money!!!");
    }

    let project = new Project(projectData);
    STORE.state.projects.push(project);
  }
}

export const projectService = new ProjectService();
