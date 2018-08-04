module.exports = {
    addRating: (req, res) => {
        const db = req.app.get('db')
        let {projectId} = req.params 
        let {userId} = req.session         
        let {rating} = req.query
        db.add_rating({userId, projectId, rating}).then( response => {
            //TODO: Concatenate groups together before serving to fronte neds on all the functions in this file
            db.get_staff_ratings({userId}).then(ratedProjects => {
                let response = {
                    userRatedProjects: ratedProjects,
                    unratedProjects: []
                }
                db.get_unrated_projects({userId}).then(unratedProjects => {
                    response.unratedProjects = unratedProjects;
                    res.status(200).send(response)
                })
            })
        }).catch(err => res.status(500).send('Could not add rating'))
    },
    updateRating: (req, res) => {
        console.log(111111)
        const db = req.app.get('db')
        let {userId} = req.session 
        let {rating} = req.query
        let {ratingId} = req.params
        db.update_rating({ratingId, rating, userId}).then( response => {
            res.status(200).send(response)
        }).catch(err => res.status(500).send('Could not update rating'))
    }, 
    deleteRating: (req, res) => {
        const db = req.app.get('db')
        let {ratingId} = req.params 
        let {userId} = req.session 
        db.delete_rating({ratingId, userId}).then( response => {
            db.get_staff_ratings({userId}).then(ratedProjects => {
                let response = {
                    userRatedProjects: ratedProjects,
                    unratedProjects: []
                }
                db.get_unrated_projects({userId}).then(unratedProjects => {
                    response.unratedProjects = unratedProjects;
                    res.status(200).send(response)
                })
            })
        }).catch(err => res.status(500).send('Could not delete rating'))
    }
}