import express from "express";
import projectService from "../services/ProjectService";

// NOTE each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
export default class ProjectsController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create);
  }

  async getAll(req, res, next) {
    try {
      let data = await projectService.get(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let project = await projectService.getById(req.params.id);
      res.send(project);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let project = await projectService.create(req.body);
      res.send(project);
    } catch (e) {
      next(e);
    }
  }
}
