
// Meet the team page mainly.
module.exports.get_executiveMembers = (req,res)=>{

    res.render("executiveMembers");


}


// Sunday School  --> More info +   Meet the team + Students
module.exports.get_SundaySchoolPage = (req,res)=>{
    res.render("sundaySchool");
}




module.exports.get_maneTsokpaPage = (req,res)=>{
    res.render("maneTsokpa");
}