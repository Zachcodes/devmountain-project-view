select pr.rating, p.id, p.url, p.project_name, p.project_type, u.name from project_ratings pr 
join projects p 
on p.id = pr.project_id 
join users u 
on u.id = pr.user_id
where pr.user_id = ${userId}
and pr.rating is not null;