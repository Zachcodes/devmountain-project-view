select p.*, p.id as project_id, s.first as student_first, s.last as student_last, s.id as student_id from projects p
inner join projects_students_link pl
on pl.project_id = p.id
inner join students s
on s.id = pl.student_id
where cohort_id = ${id};