select p.*, pi.* from daily_featured_projects d
join projects p 
on p.id = d.project_id
join projects_images pi 
on pi.project_id = p.id
where pi.image_type_id = 1
order by d.id desc
limit 1;