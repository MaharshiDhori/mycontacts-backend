const asyncHandler = require("express-async-handler");
const { find } = require("../models/contactModel");
const Contact = require("../models/contactModel")
// @desc Get all contacts
// @route GET api/contacts
// @access private

const getContacts  = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
});

// @desc Create all contacts
// @route POST api/contacts
// @access private

const createContact  = asyncHandler(async (req, res) => {
    console.log("This is the request body: ",req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mendatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    });

    res.status(201).json(contact)
});

// @desc Get contact
// @route GET api/contacts/:id
// @access private

const getContact  = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    res.status(200).json(contact)
});

// @desc Update contact
// @route PUT api/contacts/:id
// @access private

const updateContact  = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have authorized to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );

    res.status(200).json(updatedContact)
});

// @desc delete contact
// @route DELETE api/contacts/:id
// @access public

const deleteContact  = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have authorized to delete other user contacts");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact)
});


module.exports = {
    getContacts, 
    createContact,
    getContact,
    updateContact,
    deleteContact
};