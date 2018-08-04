module.exports = {
    splitPersonalAndGroup: (projectsArr) => {
        //TODO: Change this back to solely splitting into personal and group and adding a type if there is need for one
        let personalProjects = projectsArr.filter( project => project.project_type === 1)
        let groupProjects = projectsArr.filter( project => project.project_type === 2)
        let groups = {}
        for(let i = 0; i < groupProjects.length; i++) {
            if(!groups[groupProjects[i].project_name]) {
                let newGroupObject = {}
                newGroupObject['projectName'] = groupProjects[i].project_name
                newGroupObject['projectId'] = groupProjects[i].project_id
                if(groupProjects[i].rating) newGroupObject['rating'] = groupProjects[i].rating
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

        let returnObj = {
            groups,
            personalProjects
        }
        return returnObj;
    }
}