select * from projects p
inner join projects_students_link pl
on pl.project_id = p.id
inner join students s
on s.id = pl.student_id
where cohort_id = ${id}
and p.project_type = 1;