const {setDeletedGroupMembers, setAddedGroupMembers} = require('../Utilities/jsUtilities');
module.exports = {
    // addProject: (req, res) => {
    //     const db = req.app.get('db')
    //     let {
    //         url, 
    //         projectName, 
    //         projectType, 
    //         cohortId, 
    //         description, 
    //         walkthroughLink, 
    //         studentIds, 
    //         projectTags,
    //         newTags,
    //         mainImageUrl
    //     } = req.body

    //     if(!mainImageUrl) mainImageUrl = process.env.MAIN_PROJECT_IMAGE
    //     else mainImageUrl = `${process.env.AWS_PICTURE_UPLOAD_BASE}${mainImageUrl}`
    //     projectType = +projectType
    //     //Make sure to do check for if project name already exists
    //     //Add logic that will use the projectTags and insert into the db instead of checking to see if they exist
    //     db.projects.create_project({url, projectName, projectType, cohortId, description, walkthroughLink}).then(project => {
    //         let {id: projectId} = project[0]
    //         let promises = studentIds.map(studentId => db.projects.create_project_student_link({projectId, studentId}))
    //         let imageCreationPromise = db.projects.create_main_project_image({projectId, mainImageUrl})
    //         promises.push(imageCreationPromise)

    //         Promise.all(promises).then( values => {
    //             newTags = newTags.map(tag => tag.toLowerCase())
    //             if(newTags.length) {
    //                 handleNewTags(newTags, projectId)
    //             }
    //             else {
    //                 let existingTags =  projectTags.map(tagObj => tagObj.id)
    //                 createProjectTagLink(existingTags, projectId)
    //             }
    //         })

    //     })

    //     function handleNewTags(newTags, projectId) {

    //         db.project_tags.find({tag_name: newTags}).then(tags => {
    //             let existingTags =  projectTags.map(tagObj => tagObj.id)
    //             let tagIds = tags.map(tag => {
    //                 let indexProjectTags = newTags.indexOf(tag.tag_name)
    //                 if(indexProjectTags != -1) {
    //                     newTags.splice(indexProjectTags, 1)
    //                 }
    //                 return tag.id
    //             })
    //             let newProjectTags = newTags.map(tag => { return {tag_name: tag}})

    //             if(newProjectTags.length) {
    //                 db.project_tags.insert(newProjectTags).then(newTags => {
    //                     let newTagIds = newTags.map(tag => tag.id)
    //                     tagIds = tagIds.concat(newTagIds)
    //                     tagIds = tagIds.concat(existingTags)
    //                     createProjectTagLink(tagIds, projectId)
    //                 })
    //             }
    //             else {
    //                 tagIds = tagIds.concat(existingTags)
    //                 createProjectTagLink(tagIds, projectId)
    //             }
    //         })

    //     }

    //     function createProjectTagLink(tagIds, projectId) {
    //         let tagProjectLinks = tagIds.map(tagId => {
    //             return {
    //                 project_id: projectId,
    //                 tag_id: tagId
    //             }
    //         })
    //         db.projects_tags_link.insert(tagProjectLinks).then( tagProjectLinks => {
    //             //Finally go out and select that project and all group members if need be 
    //             if(projectType === 1) {
    //                 db.projects.get_project_by_id({projectId}).then( personalProject => {
    //                     res.status(200).send(personalProject)
    //                 })
    //             } else {
    //                 db.projects.get_project_by_id({projectId}).then( groupProject => {
    //                     db.projects.get_group_members({project_id: projectId}).then( members => {
    //                         groupProject[0].members = members;
    //                         res.status(200).send(groupProject)
    //                     })
    //                 })
    //             }
    //         })
    //     }
    // },
    addProject(req, res) {
        let db = req.app.get('db')
        let {name, description, url, images, type, walkthroughLink, groupMembers, cohortId} = req.body.project
        let projectType = type === 'personal' ? 1 : 2
        db.projects.create_project({
            url,
            projectName: name,
            projectType,
            cohortId,
            description,
            walkthroughLink
        }).then(dbRes => {
            let projectId, project;
            if(dbRes.length) {
                projectId = dbRes[0].id
                project = dbRes[0]
            }
            let formattedImages = images.map(i => {
                return {
                    image_url: i,
                    image_type_id: 1,
                    project_id: projectId
                }
            })
            let formattedGroupMembers = groupMembers.map(m => {
                return {
                    student_id: m.student_id,
                    project_id: projectId
                }
            })
            let promiseArr = []
            if(formattedImages.length) promiseArr.push(db.projects_images.insert(formattedImages))
            if(formattedGroupMembers.length) promiseArr.push(db.projects_students_link.insert(formattedGroupMembers))
            Promise.all(promiseArr).then( values => {
                //TODO: come back and get rid of this later when there is actual rating implemented
                db.average_project_ratings.insert({average_rating: 4, project_id: projectId})
                let returnProject = {
                    project_id: project.id,
                    project_link: project.url,
                    project_name: project.project_name,
                    project_type: project.project_type,
                    cohort_id: project.cohort_id,
                    active: project.active,
                    description: project.description,
                    walkthrough_link: project.walkthrough_link,
                    last_featured: project.last_featured,
                    images: [],
                    members: []
                }
                if(values[0]) returnProject.images = values[0]
                if(values[1]) returnProject.members = values[1]
                res.status(200).send(returnProject)
            })
        })
    },
    async updateProject(req, res) {
        let promises = []
        const db = req.app.get('db')
        let project_id = req.params.project_id
        let {addedImages, description, images, project_link, project_name, members, originalMembers} = req.body 
        let deletedStudentIds = setDeletedGroupMembers(members, originalMembers)
        let addedStudentIds = setAddedGroupMembers(members, originalMembers, project_id)
        // BUG: I think there is a slight bug here when you try to add a group member, then delete them and add again but this is minor and can be fixed later
        if(addedStudentIds.length) await db.projects_students_link.insert(addedStudentIds)
        if(deletedStudentIds.length) await db.projects.delete_group_member({ids: deletedStudentIds.join()})

        addedImages = addedImages.map( i => {
            return {
                image_url: i.image_url,
                image_type_id: 1,
                project_id: project_id
            }
        })
        promises.push(db.projects.update_project_info({description, project_id, project_link, project_name}))
        promises.push(db.projects_images.insert(addedImages))
        images.forEach(i => {
            promises.push(db.projects_images.save({id: i.project_image_id, image_url: i.image_url}))
        })
        Promise.all(promises).then( async (values) => {
            let updatedProject = values[0][0]
            let newImages = values[1]
            let updatedImages = values.slice(2, values.length)
            let members = await db.projects.get_group_members({project_id})
            let returnProject = {
                project_id: updatedProject.id,
                project_link: updatedProject.url,
                project_name: updatedProject.project_name,
                project_type: updatedProject.project_type,
                cohort_id: updatedProject.cohort_id,
                active: updatedProject.active,
                description: updatedProject.description,
                walkthrough_link: updatedProject.walkthrough_link,
                last_featured: updatedProject.last_featured,
                images: [],
                members
            }
            newImages.forEach( i => {
                returnProject.images.push({
                    project_image_id: i.id,
                    image_url: i.image_url,
                    image_type: i.image_type_id,
                    pi_project_id: project_id
                }) 
            })
            updatedImages.forEach(i => {
                returnProject.images.push({
                    project_image_id: i.id,
                    image_url: i.image_url,
                    image_type: i.image_type_id,
                    pi_project_id: project_id
                })
            })
            res.status(200).send(returnProject)
        })
    }
}