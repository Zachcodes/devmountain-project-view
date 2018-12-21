select p.id as project_id,
p.url as project_link,
p.project_name,
p.project_type,
p.cohort_id,
p.active,
p.description,
p.walkthrough_link,
p.last_featured,
pi.id as project_image_id,
pi.project_id as pi_project_id,
pi.image_url,
pi.image_type_id
from projects p 
join projects_students_link pl 
on pl.project_id = p.id
join projects_images pi 
on pi.project_id = p.id
where pl.student_id = ${id};