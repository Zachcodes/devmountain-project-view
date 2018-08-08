select s.first as studentFirst, 
s.last as studentLast, 
p.project_name as projectName, 
p.id as projectId, 
s.id as studentId, 
p.project_type as projectType from projects p 
join projects_students_link pl 
on pl.project_id = p.id
join students s 
on s.id = pl.student_id
where p.id not in (
    select project_id from project_ratings pr where user_id = ${userId}
    );
