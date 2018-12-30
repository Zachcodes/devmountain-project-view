module.exports = {
    setAvailableMembers(members, cohortStudents) {
        let memberIds = {}
        let availableMembers = []
        members.forEach(m => {
            if(!memberIds[m.student_id]) memberIds[m.student_id] = true
        })
        cohortStudents.forEach(s => {
            if(!memberIds[s.student_id]) availableMembers.push(s)
        })
        return availableMembers;
    }
}