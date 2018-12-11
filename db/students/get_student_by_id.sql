select *, p.id as project_id from students s
inner join projects_students_link pl 
on s.id = pl.student_id
inner join projects p 
on p.id = pl.project_id
left join projects_images pi 
on pi.project_id = p.id
where s.id = ${id};