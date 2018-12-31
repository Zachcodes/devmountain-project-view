insert into projects (url, project_name, project_type, cohort_id, active, description, walkthrough_link)
values (${url}, ${projectName}, ${projectType}, ${cohortId}, true, ${description}, ${walkthroughLink})
returning *;