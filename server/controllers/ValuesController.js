import express from "express";
import valueService from "../services/ValueService";

// NOTE each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
export default class ValuesController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.createValue);
  }

  async getAll(req, res, next) {
    try {
      let data = await valueService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    return res.send({ name: "value" + req.params.id });
  }

  async createValue(req, res, next) {
    try {
      let value = await valueService.createValue(req.body);
      res.send(value);
    } catch (e) {
      next(e);
    }
  }
}
