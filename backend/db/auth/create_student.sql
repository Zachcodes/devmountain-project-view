insert into students (first, last, cohort, user_id, image)
values (${first_name}, ${last_name}, ${cohortId}, ${userId}, ${defaultPictureUrl})

returning *;