select p.id as project_id,
p.url,
p.project_name,
p.project_type,
p.active, 
p.description,
p.walkthrough_link,
p.last_featured,
s.first as student_first, 
s.last as student_last, 
s.id as student_id,
s.image as student_image,
pi.id as project_image_id,
pi.image_url,
pi.image_type_id 
from projects p
inner join projects_students_link pl
on pl.project_id = p.id
inner join students s
on s.id = pl.student_id
full join projects_images pi 
on pi.project_id = p.id
where cohort_id = ${id}
and p.active = true;


-- select p.*, p.id as project_id,
-- s.first as student_first, 
-- s.last as student_last, 
-- s.id as student_id,
-- pi.* from projects p
-- inner join projects_students_link pl
-- on pl.project_id = p.id
-- inner join students s
-- on s.id = pl.student_id
-- full join projects_images pi 
-- on pi.project_id = p.id
-- where cohort_id = ${id}
-- and pi.image_type_id = 1;