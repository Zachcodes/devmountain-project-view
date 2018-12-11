select * from projects p 
join projects_students_link pl 
on pl.project_id = p.id
where pl.student_id = ${id};