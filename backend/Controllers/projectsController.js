module.exports = {
    addProject: (req, res) => {
        const db = req.app.get('db')
        let {
            url, 
            projectName, 
            projectType, 
            cohortId, 
            description, 
            walkthroughLink, 
            studentIds, 
            projectTags
        } = req.body
        projectType = +projectType
        db.create_project({url, projectName, projectType, cohortId, description, walkthroughLink}).then(project => {
            let {id: projectId} = project[0]

            let promises = studentIds.map(studentId => db.create_project_student_link({projectId, studentId}))

            Promise.all(promises).then( values => {
                console.log(111111)
                db.project_tags.find({tag_name: projectTags}).then(tags => {
                    let tagIds = tags.map(tag => {
                        let indexProjectTags = projectTags.indexOf(tag.tag_name)
                        if(indexProjectTags != -1) {
                            projectTags.splice(indexProjectTags, 1)
                        }
                        return tag.id
                    })
                    let newProjectTags = projectTags.map(tag => { return {tag_name: tag}})
                    //See if there are any tags that are not in the db already. if so add them
                    if(newProjectTags.length) {
                        db.project_tags.insert(newProjectTags).then(newTags => {
                            let newTagIds = newTags.map(tag => tag.id)
                            tagIds = tagIds.concat(newTagIds)
                            logIds(tagIds)
                        })
                    }
                    else {
                        logIds(tagIds)
                    }
        
                    function logIds(tagIds) {
                        let tagProjectLinks = tagIds.map(tagId => {
                            return {
                                project_id: projectId,
                                tag_id: tagId
                            }
                        })
                        db.projects_tags_link.insert(tagProjectLinks).then( tagProjectLinks => {
                            res.status(200).send(tagProjectLinks)
                        })
                    }
                })
            })


        })
    }
}