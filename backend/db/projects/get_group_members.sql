select s.* from projects p 
inner join projects_students_link pl 
on p.id = pl.project_id
inner join students s 
on s.id = pl.student_id
where p.id = ${project_id}