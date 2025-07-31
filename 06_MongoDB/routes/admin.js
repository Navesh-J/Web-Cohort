const { Router } = require("express");
const adminMiddleware = require("../middleware/Admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password,
    });
    res.json({
        msg: "Admin Created Successfully",
    });
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({
        username,
        password
    })
    if (admin) {
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: "Incorrect email and password"
        })
    }

})

router.post("/courses", adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink,
    });
    res.json({
        message: "Course created Successfully",
        courseId: newCourse._id,
    });
});

router.get("/courses", adminMiddleware, async (req, res) => {
    const allCourse = await Course.find({});
    res.json({
        courses: allCourse,
    });
});

module.exports = router;
