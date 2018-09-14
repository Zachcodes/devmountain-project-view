select p.*, p.id as project_id,
s.first as student_first,
s.last as student_last,
s.id as student_id,
pi.* from projects p
join projects_tags_link ptl
on p.id = ptl.project_id
join project_tags pt 
on pt.id = ptl.tag_id
inner join projects_students_link pl 
on pl.project_id = p.id
inner join students s 
on s.id = pl.student_id
inner join projects_images pi 
on pi.project_id = p.id
where pt.tag_name like ${filter}
and p.project_type = ${projectType}
and p.cohort_id = ${cohortId};