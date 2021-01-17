const express = require("express");
const router = express.Router();
const members = require("../controllers/membersControllers");



// Meet the team page
router.get("/executive" , members.get_executiveMembers);



router.get("/sundaySchool" , members.get_SundaySchoolPage);

router.get("/maneTsokpa", members.get_maneTsokpaPage);




module.exports = router;