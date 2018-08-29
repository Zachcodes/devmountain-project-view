insert into students (first, last, cohort, user_id)
values (${first_name}, ${last_name}, ${cohortId}, ${userId})

returning *;