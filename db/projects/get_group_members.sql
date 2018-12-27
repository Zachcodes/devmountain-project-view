select s.id as student_id,
s.first as student_first,
s.last as student_last,
s.cohort,
s.image as student_image,
s.about,
s.user_id,
s.linkedin,
s.github,
s.portfolio,
s.email
from projects p 
inner join projects_students_link pl 
on p.id = pl.project_id
inner join students s 
on s.id = pl.student_id
where p.id = ${project_id}