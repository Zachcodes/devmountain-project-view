select pr.rating, p.id as project_id, p.url, p.project_name, p.project_type, u.name as staff_name, s.first as student_first, s.last as student_last, s.id as student_id, pr.id as project_rating_id from project_ratings pr 
join projects p 
on p.id = pr.project_id 
join users u 
on u.id = pr.user_id
join projects_students_link pl 
on p.id = pl.project_id 
join students s 
on s.id = pl.student_id
where pr.user_id = ${userId};