select * from students s
inner join projects_students_link pl 
on s.id = pl.student_id
inner join projects p 
on p.id = pl.project_id
where s.id = ${id};