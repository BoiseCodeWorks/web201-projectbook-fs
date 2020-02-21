import express from "express";
import contactsService from "../services/ContactsService";

export class ContactsController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getContacts)
      .post("", this.create)
      .put("/:id", this.update);
  }

  async getContacts(req, res, next) {
    try {
      let contacts = await contactsService.getAllByProjectId(
        req.query.projectId
      );
      res.send(contacts);
    } catch (e) {
      next(e);
    }
  }
  async create(req, res, next) {
    try {
      let contact = await contactsService.createContact(req.body);
      res.send(contact);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      let contact = await contactsService.updateContact(req.body);
      res.send(contact);
    } catch (error) {
      next(error);
    }
  }
}
