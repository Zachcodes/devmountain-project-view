select * from projects p
join project_ratings pr 
on p.id = pr.project_id
where pr.user_id = ${userId} 
and pr.rating is null;