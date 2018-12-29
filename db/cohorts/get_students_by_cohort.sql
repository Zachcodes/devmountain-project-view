select 
s.id as student_id,
s.image as student_image,
s.first as student_first,
s.last as student_last,
s.cohort,
s.about,
s.user_id,
s.linkedin,
s.github,
s.portfolio,
s.email
from students s
where cohort = ${cohort}