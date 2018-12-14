-- select * from cohorts
-- where cohort_type in (1, 2, 3);
select c.id,
c.name,
c.cohort_type,
c.external_cohort_id,
c.type,
c.start_date,
c.end_date,
count(s.id)
from cohorts c
full join students s
on c.id = s.cohort 
where cohort_type in (1, 2, 3)
group by c.id
order by c.cohort_type, count desc;