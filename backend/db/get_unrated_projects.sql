select s.first, s.last, p.project_name, p.id as project_id from projects p 
join projects_students_link pl 
on pl.project_id = p.id
join students s 
on s.id = pl.student_id
where p.id not in (
    select project_id from project_ratings pr where user_id = ${userId}
    );
