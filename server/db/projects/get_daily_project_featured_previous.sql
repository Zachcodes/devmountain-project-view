select p.id from average_project_ratings ar
join projects p 
on p.id = ar.project_id
where ar.average_rating >= 4
and p.url is not null
order by random()
limit 1;