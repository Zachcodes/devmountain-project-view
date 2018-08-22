select p.*, 
ptl.*, 
pt.*, 
p.id as project_id,
s.first as student_first,
s.last as student_last,
s.id as student_id from projects p
full join projects_tags_link ptl
on p.id = ptl.project_id
full join project_tags pt 
on pt.id = ptl.tag_id
inner join projects_students_link pl 
on pl.project_id = p.id
inner join students s 
on s.id = pl.student_id
where p.project_type = ${projectType}
and p.cohort_id = ${cohortId};