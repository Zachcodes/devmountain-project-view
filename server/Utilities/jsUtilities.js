module.exports = {
    splitPersonalAndGroup: function(projectsArr) {
        let formatted = projectsArr.map(formatCamelCase)
        let personalProjects = formatted.filter( project => project.projectType === 1)
        let tempPersonal = {}
        personalProjects.forEach(project => {
            if(!tempPersonal[project.projectId]) {
                tempPersonal[project.projectId] = project
                tempPersonal[project.projectId].tags = [] 
                let tagObj = {}
                tagObj.tagId = project.tagName 
                tagObj.tagName = project.tagName
                tempPersonal[project.projectId].tags.push(tagObj)
            }
            else {
                let tagObj = {}
                tagObj.tagId = project.tagName 
                tagObj.tagName = project.tagName
                tempPersonal[project.projectId].tags.push(tagObj)
            }
        })
        personalProjects = []
        for(key in tempPersonal) {
            personalProjects.push(tempPersonal[key])
        }
        let groupProjects = formatted.filter( project => project.projectType === 2)
        let groups = {}
        for(let i = 0; i < groupProjects.length; i++) {
            if(!groups[groupProjects[i].projectName]) {
                let newGroupObject = {}
                newGroupObject['projectName'] = groupProjects[i].projectName
                newGroupObject['projectId'] = groupProjects[i].projectId
                newGroupObject['url'] = groupProjects[i].url
                newGroupObject['description'] = groupProjects[i].description
                if(groupProjects[i].rating) newGroupObject['rating'] = groupProjects[i].rating
                if(groupProjects[i].projectRatingId) newGroupObject['projectRatingId'] = groupProjects[i].projectRatingId
                if(groupProjects[i].tagName) {
                    newGroupObject['tags'] = []
                    let tagObj = {
                        tagName: groupProjects[i].tagName,
                        tagId: groupProjects[i].tagId 
                    }
                    newGroupObject['tags'].push(tagObj)
                } 
                newGroupObject['groupMembers'] = []
                newGroupObject['mainImageUrl'] = groupProjects[i].mainImageUrl
                


                // newGroupObject['projectImages'] = [groupProjects[i].mainImageUrl]
                newGroupObject['projectImages'] = {}
                newGroupObject['projectImages'][groupProjects[i].project_image_id] = groupProjects[i].mainImageUrl






                groups[groupProjects[i].projectName] = newGroupObject
                let studentName = { 
                    studentName: `${groupProjects[i].studentFirst} ${groupProjects[i].studentLast}`,
                    studentId: groupProjects[i].studentId
                }
                groups[groupProjects[i].projectName].groupMembers.push(studentName) 
            } 
            else {
                let studentExists = groups[groupProjects[i].projectName].groupMembers.filter(student => student.studentId === groupProjects[i].studentId)
                if(!studentExists.length) {
                    let studentName = { 
                        studentName: `${groupProjects[i].studentFirst} ${groupProjects[i].studentLast}`,
                        studentId: groupProjects[i].studentId
                    }
                    groups[groupProjects[i].projectName].groupMembers.push(studentName) 
                }

                if(groups[groupProjects[i].projectName].tags) {
                    let tagExists = groups[groupProjects[i].projectName].tags.filter(tag => tag.tagId === groupProjects[i].tagId)
                    if(!tagExists.length) {
                        let tagObj = {
                            tagName: groupProjects[i].tagName,
                            tagId: groupProjects[i].tagId 
                        }
                        groups[groupProjects[i].projectName].tags.push(tagObj)
                    }
                }

                if(groups[groupProjects[i].projectName].projectImages) {
                    // console.log(1111111, groups[groupProjects[i].projectName].projectImages)
                    if(!groups[groupProjects[i].projectName].projectImages[groupProjects[i].project_image_id]) {
                        groups[groupProjects[i].projectName].projectImages[groupProjects[i].project_image_id] = groupProjects[i].mainImageUrl
                    }
                }
            } 
        }
        let groupArr = []
        for(let key in groups) {
            let groupImages = []
            for(let pId in groups[key].projectImages) {
                groupImages.push(groups[key].projectImages[pId])
            }
            groups[key].projectImages = groupImages
            groupArr.push(groups[key])
        }
        let returnObj = {
            groupArr,
            personalProjects
        }
        return returnObj;
        function formatCamelCase(project) {
            let formattedObj = {}
            formattedObj['projectId'] = project.project_id
            formattedObj['url'] = project.url
            formattedObj['projectName'] = project.project_name
            formattedObj['projectType'] = project.project_type
            formattedObj['studentFirst'] = project.student_first
            formattedObj['studentLast'] = project.student_last
            formattedObj['description'] = project.description
            formattedObj['studentId'] = project.student_id
            formattedObj['mainImageUrl'] = project.image_url
            formattedObj['project_image_id'] = project.project_image_id
            if(project.rating) {
                formattedObj['rating'] = project.rating
                formattedObj['staffName'] = project.staff_name
                formattedObj['projectRatingId'] = project.project_rating_id 
             }
             if(project.tag_name) {
                formattedObj['tagName'] = project.tag_name
                formattedObj['tagId'] = project.tag_id 
             }
            return formattedObj;
        }
    },
    addImagesToProject(p, projectsObj) {
        if(!projectsObj[p.project_id]) {
            projectsObj[p.project_id] = {
                ...p,
                images: [{
                            project_image_id: p.project_image_id,
                            image_url: p.image_url,
                            image_type: p.image_type_id,
                            pi_project_id: p.pi_project_id
                        }]
            }
            delete projectsObj[p.project_id].image_url
            delete projectsObj[p.project_id].project_image_id
            delete projectsObj[p.project_id].pi_project_id
            delete projectsObj[p.project_id].image_type_id
        }
        else projectsObj[p.project_id].images.push({
                                                    project_image_id: p.project_image_id,
                                                    image_url: p.image_url,
                                                    image_type: p.image_type_id,
                                                    pi_project_id: p.pi_project_id
                                                  })
    }
}