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
                groups[groupProjects[i].projectName] = newGroupObject
                let studentName = { 
                    studentName: `${groupProjects[i].studentFirst} ${groupProjects[i].studentLast}`,
                    studentId: groupProjects[i].studentId
                }
                groups[groupProjects[i].projectName].groupMembers.push(studentName) 
            } 
            else {
                let studentName = { 
                    studentName: `${groupProjects[i].studentFirst} ${groupProjects[i].studentLast}`,
                    studentId: groupProjects[i].studentId
                }
                groups[groupProjects[i].projectName].groupMembers.push(studentName) 
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
            } 
        }
        let groupArr = []
        for(let key in groups) {
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
            formattedObj['studentId'] = project.student_id
            formattedObj['mainImageUrl'] = project.image_url
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
    }
}