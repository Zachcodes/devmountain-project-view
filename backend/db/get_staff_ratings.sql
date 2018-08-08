select pr.rating, 
p.id as projectId, 
p.url, 
p.project_name as projectName, 
p.project_type as projectType, 
u.name as staffName,
s.first as studentFirst, 
s.last as studentLast, 
s.id as studentId, 
pr.id as projectRatingId from project_ratings pr 
join projects p 
on p.id = pr.project_id 
join users u 
on u.id = pr.user_id
join projects_students_link pl 
on p.id = pl.project_id 
join students s 
on s.id = pl.student_id
where pr.user_id = ${userId};