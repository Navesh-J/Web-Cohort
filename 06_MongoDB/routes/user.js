const { Router } = require("express");
const userMiddleware = require("../middleware/User");
const { User,Course } = require("../db");
const router = Router();

router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password,
    });
    res.json({
        msg: "User Created Successfully",
    });
});

router.get("/courses", async (req, res) => {
    const allCourse = await Course.find({});
    res.json({
        courses: allCourse,
    });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;
    User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses:courseId
        }
    })
    res.json({
        message:"Purchase Successful"
    })
});

router.get("/purchasedCourses", userMiddleware,async (req, res) => {
    const user = await User.findOne({
        username:req.headers.username,
    })
    const courses = await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.json({
        courses:courses
    })
});

module.exports = router;
