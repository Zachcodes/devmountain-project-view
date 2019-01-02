select s.id,
s.email,
p.project_name,
p.url
from students s
join projects_students_link pl
on pl.student_id = s.id
join projects p
on p.id = pl.project_id
where p.id = ${projectId};