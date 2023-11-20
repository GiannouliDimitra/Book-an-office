const express = require ("express");
const mongoose = require ("mongoose");
const Reservation = require ("../models/reservationModel");

//get
const  findReservations = async (req, res) => {
    try {
        const allReservations = await Reservation.find();
        res.status(200).send(allReservations);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};

//post
const addReservation = async (req,res) => {
    try {
        let { dates, officePlace, userId, ownerId, officeId } =req.body;
        let createdReservation = await Reservation.create({ dates, officePlace, userId, ownerId, officeId });
        res.status(200).send({ msg: "The reservation is added", createdReservation });
    } catch (error) {
        console.log(error); 
        res.status(500).send({ msg: "Internal server error. We failed to create the new employee." });
    }
};

//put
const  updateReservation = async (req, res) => {
    try {
        let clientValue = req.body;
        let id = req.params.id;
        await Reservation.updateOne ({ _id: id }, clientValue);
        res.status(200).send ({msg: "The reservation is updated successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Sorry, we failed to update the reservation" });
    }
};

//delete
const deleteReservation = async (req,res) => {
    try {
        await Reservation.deleteOne({_id: req.params.id });
        res.status(200).send ({msg: "The office is deleted successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Failed to delete the office." }); 
    }
};

module.exports = { findReservations, addReservation, updateReservation, deleteReservation }
 
 
 

 
 
 
 