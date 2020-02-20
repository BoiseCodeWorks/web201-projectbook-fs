import mongoose from "mongoose";
import Project from "../models/Project";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Project", Project);

class ProjectService {
  async create(projectData) {
    return await _repository.create(projectData);
  }
  async get() {
    return await _repository.find({ deleted: false });
  }
  async getById(id) {
    let project = await _repository.findById(id);
    if (!project) {
      throw new BadRequest("Invalid Id");
    }
    return project;
  }

  async update(id, updateData) {
    // do some buisiness logic
    return await _repository.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await _repository.findByIdAndRemove(id);
  }
}

const projectService = new ProjectService();
export default projectService;
