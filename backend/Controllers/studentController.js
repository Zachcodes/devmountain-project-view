module.exports = {
    getStudent: (req, res) => {
        let db = req.app.get('db');
        let {id} = req.params;
        db.get_student_by_id({id}).then(studentDetails => {
            res.status(200).send(studentDetails)
        })
    }
}