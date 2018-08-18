select p.*, ptl.*, pt.*, p.id as project_id from projects p
full join projects_tags_link ptl
on p.id = ptl.project_id
full join project_tags pt 
on pt.id = ptl.tag_id
where p.project_type = ${projectType}
and p.cohort_id = ${cohortId};