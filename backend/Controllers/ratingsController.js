module.exports = {
    addRating: (req, res) => {
        const db = req.app.get('db')
        let {projectId} = req.params 
        let {userId} = req.session         
        let {rating} = req.query
        db.add_rating({userId, projectId, rating}).then( response => {
            res.status(200).send('Added a rating')
        }).catch(err => res.status(500).send('Could not add rating'))
    },
    updateRating: (req, res) => {
        const db = req.app.get('db')
        let {userId} = req.session 
        let {rating} = req.query
        db.update_rating({ratingId, rating, userId}).then( response => {
            res.status(200).send('Updated rating')
        }).catch(err => res.status(500).send('Could not update rating'))
    }, 
    deleteRating: (req, res) => {
        const db = req.app.get('db')
        let {ratingId} = req.params 
        let {userId} = req.session 
        db.delete_rating({ratingId, userId}).then( response => {
            res.status(200).send('Deleted rating')
        }).catch(err => res.status(500).send('Could not delete rating'))
    }
}