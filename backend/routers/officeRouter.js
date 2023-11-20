const express = require ("express");
const router = express.Router();
const verifyToken = require ("../middleware/auth")
const { 
    findOffices, 
    addOffice, 
    updateOffice, 
    deleteOffice, 
} = require ("../controllers/officeController");

//get
router.get("/offices", findOffices);

//post
router.post("/create", verifyToken, addOffice);

//put
router.put ("/:id", updateOffice);

//delete
router.delete("/:id", deleteOffice);

module.exports = router;