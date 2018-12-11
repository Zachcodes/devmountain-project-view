select s.first, s.last, s.id from projects_students_link ptl 
inner join students s 
on s.id = ptl.student_id
where project_id = ${id}