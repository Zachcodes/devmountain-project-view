const {splitPersonalAndGroup} = require('../Utilities/jsUtilities');

module.exports = {
    //TODO: If you have time, add this to the session so you don't have to rerun this function so much
    addRating: (req, res) => {
        const db = req.app.get('db')
        let {projectId} = req.params 
        let {userId} = req.session         
        let {rating} = req.query
        db.add_rating({userId, projectId, rating}).then( response => {
            db.get_staff_ratings({userId}).then(ratedProjects => {
                let splitRatedProjects = splitPersonalAndGroup(ratedProjects)
                let personalRated = splitRatedProjects.personalProjects
                let groupRated = splitRatedProjects.groupArr
    
                db.get_unrated_projects({userId}).then(unratedProjects => {
                    let splitUnratedProjects = splitPersonalAndGroup(unratedProjects)
                    let personalUnrated = splitUnratedProjects.personalProjects
                    let groupUnrated = splitUnratedProjects.groupArr
    
                    let returnGroups = {
                        rated: {
                            personal: personalRated,
                            group: groupRated
                        },
                        unrated: {
                            personal: personalUnrated,
                            group: groupUnrated
                        }
                    }
                    res.status(200).send(returnGroups)
                })
            })
        }).catch(err => res.status(500).send('Could not add rating'))
    },
    updateRating: (req, res) => {
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
                let splitRatedProjects = splitPersonalAndGroup(ratedProjects)
                let personalRated = splitRatedProjects.personalProjects
                let groupRated = splitRatedProjects.groupArr
    
                db.get_unrated_projects({userId}).then(unratedProjects => {
                    let splitUnratedProjects = splitPersonalAndGroup(unratedProjects)
                    let personalUnrated = splitUnratedProjects.personalProjects
                    let groupUnrated = splitUnratedProjects.groupArr
    
                    let returnGroups = {
                        rated: {
                            personal: personalRated,
                            group: groupRated
                        },
                        unrated: {
                            personal: personalUnrated,
                            group: groupUnrated
                        }
                    }
                    res.status(200).send(returnGroups)
                })
            })
        }).catch(err => res.status(500).send('Could not delete rating'))
    }
}