select 
c.id,
c.name,
ct.type
from cohorts c
join cohort_type ct 
on ct.id = c.cohort_type;