select p.* from daily_featured_projects d
join projects p 
on p.id = d.project_id
order by d.id desc
limit 1;