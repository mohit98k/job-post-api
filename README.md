How does scaling work?
Why Redis here?
How do you design pagination, caching, queues?
How do you handle failures?
What happens when Redis goes down?
How do you prevent cache stampede?
How does your rate limiter behave in distributed systems?
Offset vs cursor — when does offset break?
What index did you use and why? B-tree? Hash?
How does your system scale horizontally?






Add scenarios like:

Redis failure fallback → DB read
DB slow query → timeout handling
retry logic