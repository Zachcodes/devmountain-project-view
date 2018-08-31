module.exports = {
    getStudent: (req, res) => {
        let db = req.app.get('db');
        let {id} = req.params;
        db.students.get_student_by_id({id}).then(studentDetails => {
            res.status(200).send(studentDetails)
        })
    },
    updatePicture: (req, res) => {
        let db = req.app.get('db');
        let {id} = req.session.passport.user;
        let {pictureUrl} = req.body;
        let newUrl = `${process.env.AWS_PICTURE_UPLOAD_BASE}${pictureUrl}`
        db.students.update_student_picture({id, newUrl}).then( studentDetails => {
            res.status(200).send(studentDetails[0])
        })
    },
    updateAbout: (req, res) => {
        let db = req.app.get('db');
        let {id} = req.session.passport.user;
        let {about} = req.body;
        db.students.update_student_about({id, about}).then( studentDetails => {
            res.status(200).send(studentDetails[0])
        })
    }
}