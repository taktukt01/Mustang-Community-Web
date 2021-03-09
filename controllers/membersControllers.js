
// Meet the team page mainly.
module.exports.get_boardMembers = (req,res)=>{

    res.render("BoardMembers/2020Board");

}


// Sunday School  --> More info +   Meet the team + Students
module.exports.get_SundaySchoolPage = (req,res)=>{
    res.render("sundaySchool");
}




module.exports.get_maneTsokpaPage = (req,res)=>{
    res.render("maneTsokpa");
}