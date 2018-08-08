module.exports = {
    splitPersonalAndGroup: function(projectsArr) {
        let personalProjects = formatCamelCase(projectsArr.filter( project => project.project_type === 1))

        let groupProjects = projectsArr.filter( project => project.project_type === 2)
        let groups = {}
        for(let i = 0; i < groupProjects.length; i++) {
            if(!groups[groupProjects[i].project_name]) {
                let newGroupObject = {}
                newGroupObject['projectName'] = groupProjects[i].project_name
                newGroupObject['projectId'] = groupProjects[i].project_id
                if(groupProjects[i].rating) newGroupObject['rating'] = groupProjects[i].rating
                if(groupProjects[i].project_rating_id) newGroupObject['projectRatingId'] = groupProjects[i].project_rating_id
                newGroupObject['groupMembers'] = []
                groups[groupProjects[i].project_name] = newGroupObject
                let studentName = { 
                    studentName: `${groupProjects[i].student_first} ${groupProjects[i].student_last}`,
                    studentId: groupProjects[i].student_id
                }
                groups[groupProjects[i].project_name].groupMembers.push(studentName) 
            } 
            else {
                let studentName = { 
                    studentName: `${groupProjects[i].student_first} ${groupProjects[i].student_last}`,
                    studentId: groupProjects[i].student_id
                }
                groups[groupProjects[i].project_name].groupMembers.push(studentName) 
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
    }
}