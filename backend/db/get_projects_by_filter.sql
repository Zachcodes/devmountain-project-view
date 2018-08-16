select * from projects p
join projects_tags_link ptl
on p.id = ptl.project_id
join project_tags pt 
on pt.id = ptl.tag_id
where pt.tag_name like ${filter}
and p.cohort_id = ${cohortId};