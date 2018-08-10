select p.*, s.first, s.last, s.id as student_id from daily_featured_projects d
join projects p 
on p.id = d.project_id
join projects_students_link pl 
on p.id = pl.project_id 
join students s 
on s.id = pl.student_id
order by d.id desc
limit 1;