#JavaScript Event Loop, Concurrency Patterns, Advanced Async

1. Intro
    - Author: Andrew Meiling
    - Twitter: @meilingandrew
    - Github: AndrewSC208

2. High Level Concurrecncy 
    A. Overview of Concurrency and Parallelism 

    A. What is the JavaScript Event Loop?
        ..* Numbers example of the scheduler
    B. How does it work?
        ..* Find visual online example.

3.  Three main ways to write async code:
    A. Callbacks
        ..* Example
    B. Promises
        ..* Example
    C. Async/Await
        ..* Example


Slides:
    - Asynchronous: Input/output processing that permits other processing to continue before the transmission has finished.
        i.e: One person gets on a roller coster, and when the ride is complete that person gets off, and the next person inline gets on.

    - Parallel: Input/output processing that can be carried out simultaneously.
        i.e: Ten people get on the ride, when complete they get off, and ten more get on.
    
    - Concurecny: Two higher level action happening at the same period of time.

(Each number takes 1 second to complete)
Higher level task 1:
    1 <- Micro task that is a step of a higher level task
    2
    3
    4

Higher level task 2:
    1
    2
    3

Simpelest way to schedule these tasks is to complete one Higher level Task, and then move onto the next.
1
2
3
4 - done
1
2
3 - done (Users screen will not update for 7 seconds);

A concurrent system would schedule these tasks as such:
1
1
2
2
3 - done
3
4 - done

The system still takes 7 seconds to perform, however the perception of performance is dramatically different. From a high level perspective they "appear to be happening at the same time." Thus being a concurrent system!

Thought:
Scheduling operations is easy, the challenge begines when cordinating the responses to the scheduled operations. Instead of having to deal with threads we have to deal with cordinating concurrency.

Ways to cordinate concurrency:
1. Callbacks
2. Promises
3. Async/Await


