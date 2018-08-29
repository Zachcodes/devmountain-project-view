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
            projectTags,
            newTags
        } = req.body
        projectType = +projectType
        //Make sure to do check for if project name already exists
        //Add logic that will use the projectTags and insert into the db instead of checking to see if they exist

        db.projects.create_project({url, projectName, projectType, cohortId, description, walkthroughLink}).then(project => {
            let {id: projectId} = project[0]

            let promises = studentIds.map(studentId => db.projects.create_project_student_link({projectId, studentId}))

            Promise.all(promises).then( values => {
                
                newTags = newTags.map(tag => tag.toLowerCase())
                db.project_tags.find({tag_name: newTags}).then(tags => {
                    let tagIds = tags.map(tag => {
                        let indexProjectTags = newTags.indexOf(tag.tag_name)
                        if(indexProjectTags != -1) {
                            newTags.splice(indexProjectTags, 1)
                        }
                        return tag.id
                    })
                    let newProjectTags = newTags.map(tag => { return {tag_name: tag}})
                    
                    let existingTags =  projectTags.map(tagObj => tagObj.id)

                    if(newProjectTags.length) {
                        db.project_tags.insert(newProjectTags).then(newTags => {
                            let newTagIds = newTags.map(tag => tag.id)
                            tagIds = tagIds.concat(newTagIds)
                            tagIds = tagIds.concat(existingTags)
                            createProjectTagLink(tagIds)
                        })
                    }
                    else {
                        tagIds = tagIds.concat(existingTags)
                        createProjectTagLink(tagIds)
                    }
        
                    function createProjectTagLink(tagIds) {
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