select p.id as project_id,
p.url,
p.project_name,
p.project_type,
p.cohort_id,
p.active,
p.description,
p.walkthrough_link,
p.last_featured,
pi.id as project_image_id,
pi.image_url,
pi.image_type_id,
c.name as cohort_name,
ct.type
from daily_featured_projects d
join projects p 
on p.id = d.project_id
join projects_images pi 
on pi.project_id = p.id
join cohorts c 
on c.id = p.cohort_id 
join cohort_type ct 
on ct.id = c.cohort_type
where pi.image_type_id = 1
order by d.id desc
limit 1;