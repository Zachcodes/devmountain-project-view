-- select *, p.id as project_id from students s
select s.id as student_id,
s.first,
s.last,
s.cohort,
s.image,
s.about,
s.user_id,
s.linkedin,
s.github,
s.portfolio,
p.id as project_id,
p.url,
p.project_name,
p.project_type,
p.description,
p.walkthrough_link,
p.last_featured,
pi.id as project_image_id,
pi.image_url,
pi.image_type_id
from students s
inner join projects_students_link pl 
on s.id = pl.student_id
inner join projects p 
on p.id = pl.project_id
left join projects_images pi 
on pi.project_id = p.id
where s.id = ${id};
