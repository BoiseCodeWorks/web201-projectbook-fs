import mongoose from "mongoose";
import contact from "../models/Contact";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Contact", contact);

class ContactsService {
  async getAllByProjectId(projectId) {
    if (!projectId) {
      throw new BadRequest("Invalid Project Id");
    }
    return await _repository.find({ projectId });
  }
  async createContact(contactData) {
    return await _repository.create(contactData);
  }
  async updateContact(contact) {
    // TODO DONT FORGET BL
    return await _repository.findByIdAndUpdate(contact.id, contact, {
      new: true,
      runValidators: true
    });
  }
}

const contactsService = new ContactsService();
export default contactsService;
