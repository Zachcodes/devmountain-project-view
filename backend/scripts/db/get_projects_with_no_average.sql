select p.id
from average_project_ratings ar 
right join projects p
on p.id = ar.project_id
full join project_ratings pr 
on pr.project_id = p.id
where ar.id is null
and pr.id is not null;