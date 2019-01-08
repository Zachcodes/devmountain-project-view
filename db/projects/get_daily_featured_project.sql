select p.id as project_id,
p.url,
p.project_name,
p.project_type,
p.cohort_id,
p.active,
p.description,
p.walkthrough_link,
p.last_featured,
c.name as cohort_name,
ct.type
from daily_featured_projects d
join projects p 
on p.id = d.project_id
join cohorts c 
on c.id = p.cohort_id 
join cohort_type ct 
on ct.id = c.cohort_type
order by d.id desc
limit 1;