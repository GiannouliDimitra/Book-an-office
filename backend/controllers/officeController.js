const express = require ("express");
const mongoose = require ("mongoose");
const Office = require ("../models/officeModel");

//get
const  findOffices = async (req, res) => {
    try {
        const allOffices = await Office.find().populate("owner");
        res.status(200).send(allOffices);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};


//post
const addOffice = async (req,res) => {
    try {
       let owner = req.user.id;
        let { 
            location, 
            place, 
            photo, 
            price,  
            availableDates} = req.body;
        let newOffice = {
            location, 
            place, 
            photo, 
            price,
            availableDates,
            owner,
        }
        let createdOffice = await Office.create(newOffice);
        res.status(200).send({ msg: "The office is added", createdOffice });
    } catch (error) {
        console.log(error); 
        res.status(500).send({ msg: "Internal server error. We failed to create the new employee." });
    }
};

//put
const  updateOffice = async (req, res) => {
    try {
        let clientValue = req.body;
        let id = req.params.id;
        await Office.updateOne ({ _id: id }, clientValue);
        res.status(200).send ({msg: "The office is updated successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Sorry, we failed to update the office" });
    }
};

//delete
const deleteOffice = async (req,res) => {
    try {
        await Office.deleteOne({_id: req.params.id });
        res.status(200).send ({msg: "The office is deleted successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Failed to delete the office." }); 
    }
};

module.exports = { findOffices, addOffice, updateOffice, deleteOffice }
 
 
 
