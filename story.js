let RAW_SCRIPT = `
{stop-music} stop
{background} act_one
[LOG] <t> #green August 2018  ___ \\ First Day of Classes ___ \\ Gardner Hall
[] #blue <s> *phew*

{music} act_one

[] #blue Alright, _ this should be the right \\ classroom
[] #blue And <s> ... __ \\ Yes! _ Lots of seats are left!
[] #blue Looks like coming to class early \\ has one perk at least
[] #blue Alright, _ let me go and save some seats for Shreya and Robert
[] #blue I can already tell I'm gonna dread \\ this class...
[] #blue Well I heard it's better than linear \\ algebra... 
[] #blue So I'm sure it'll be <s> fineeeeeee ____ ?
[] #blue I'll go ahead and text them and \\ let them know I saved them seats
[] Oh? __ \\ Looks like I got a text from... \\ ___ Sophia?
[]  ...

[Nikhil] Hi, _ my name is Nikhil.
[Nikhil] I'll admit, __ I'm not the main \\ character of this story... 
[Nikhil] But I do know the star __ <f> pretty well
[Nikhil] This story begins here, \\ __ in STOR 435
[Nikhil] <s> ... __ \\ <n> Not the most romantic start ___ I know
[Nikhil] <s> But bear with me... 
[Nikhil] It gets really good

[] ...

[Text] #green Sophia: \\ _ <f> Hey! _ <s> \\ Are you also in STOR 435? 
[Text] #green Sophia: \\ _ I think I see you sitting a couple \\ of rows in front of me!
[Nikhil] #blue Oh wow, I didn’t know Sophia’s in \\ this class 
[Nikhil] #blue <f> That’s awesome!
[Nikhil] #blue <s> Ya know....  
[Nikhil] #blue I don’t think I ever actually had a \\ class with her before...

{label} should_she_sit_with_me
[Nikhil] #blue I do have a lot of space up here, \\ _ should I ask her to come up here?
{choice} [Sit with us!] sit_with_me  [Might be weird...] dont_sit_with_me

{label} dont_sit_with_me
[Nikhil] #blue Hmm...she is friendly, __ \\ but I <s> really <n> don't know her that well
[Nikhil] #blue Might be best not to be too \\ forward or anything
[Nikhil] #blue Alrighty \\ <f> let me text her back!
[Text] #green Nikhil: \\ __ <f> Hey! \\ <n> Woah looks like it!
[Text] #green Sophia: \\ __ Haha yeah, __ that's so cool!
[Text] #green Nikhil: \\ __ Wait hold on, \\ __ looks like class is starting soon
[Text] #green Sophia: \\ __ Oooo yah, __ good luck!
[Text] #green Nikhil: \\ __ Thanks! \\ You too!
{goto} game_over


{label} sit_with_me
[Nikhil] #blue Hmm...she is friendly, \\ but I <s> really <n> don't know her that well
[Nikhil] #blue <f> I should ask her to sit up here!
[Nikhil] #blue Might be a good way to get to \\ know her better
[Nikhil] #blue Alrighty! \\ __ <f> Let me text her back!
[Text] #green Nikhil: _ <f> \\ Hey! __ <n> Woah looks like it!
[Text] #green Sophia: _ \\ Haha yeah, __ that's so cool!
[Text] #green Nikhil: _ \\ You should come sit up here with \\ me! 
[Text] #green Nikhil: _ \\ If you aren’t waiting for anyone \\ else that is...
[Nikhil] #blue Alright, ___ sent! 
[Nikhil] #blue It's a good thing there's still a lot of \\ room left in the classroom
[Nikhil] #blue Perks of coming to class early \\ ___ <s> hehe
[Nikhil] #blue Oh? __ \\ Looks like she texted me back
[Text] #green Sophia: \\ Woah! __ \\ <f> Yeah that sounds awesome!
[Text] #green Sophia: \\ Lemme pack up my stuff and \\ come up there

[] ...

[Sophia] Hiii, ___ how are you?
[Nikhil] I am doing <f> WELL! _ \\ <n> I love the Cisco backpack, \\ how was your internship there?
[Sophia] ... __ I feel like I told you this so many \\ times already
[Sophia] I interned at BNSF last summer \\ haha
[Nikhil] <s> ... <n> oh yeah
[Nikhil] You should know that my memory \\ isn't the best __ <s> oops
[Sophia] Nobody could forget you worked \\ at Garmin last summer
[Nikhil] ... __ <s> anyways <f> what other classes are \\ you taking this semester?
[Sophia] Let's see... 
[Sophia] I'm in COMP 426, COMP 455, this \\ one, the TA class, <s> and ...
[Nikhil] WOAH! _ \\ We have sooo many classes \\ together!
[Nikhil] I’m also in 426 and 455!  
[Nikhil] And we’re both TAs so we \\ kinda have that together too?
[Sophia] Woahhh, that’s awesome! _ \\ We’re basically required to be \\ friends now
[Nikhil] I guess so! \\ No complaints from me though
[Nikhil] I’m always looking for people to \\ leech off ___ <s> hehe
[Sophia] HAHAHA bruh, __ \\ you're gonna be so disappointed
[Nikhil] We’ll see about that! \\ __ Anyways, _ where are you living this \\ year?
[Sophia] I actually got an apartment at \\ Warehouse, 
[Sophia] It's like right on Rosemary street
[Nikhil] Oh word? \\ _ That's so cool!
[Nikhil] I got my first taste of apartment \\ life last summer and I <s> __ loved it
[Nikhil] I think just having my own kitchen \\ was the best part tbh
[Sophia] Dude I know, ___ I love being able to \\ cook for myself

{label} should_i_go_over
[Sophia] You know, you should come over \\ for lunch sometime! ___ We can \\ make something!
{choice} [Make plans!] go_over  [Skip out] dont_go_over

{label} dont_go_over
[Nikhil] Oh wow, _ \\ <s> that is a tempting offer...
[Nikhil] But ya know __,  this semester is gonna \\ be kinda busy for me
[Nikhil] I don't wanna do too much \\ _ ya know?
[Sophia] <s> Aw __  no worries! \\ I totally understand!
[Nikhil] Oh shoot, \\ __ it looks like class is starting soon!
{goto} game_over

{label} go_over
[Nikhil] Oh wow, _ \\ <s> that is a tempting offer...
[Nikhil] You know what? __ \\ I might actually take you up on \\ that!
[Sophia] <f> Aw heck yeah! \\ _ <n> When are you free?
[Nikhil] <f> Good question! \\ _ <n> Lemme check my calendar...
[] ...
{stop-music} stop

{goto} act_two

{label} game_over
[LOG] <t> ...
[LOG] <t> ...
[LOG] <t> Hey now, \\ _ that's not how this story is \\ supposed to end
[LOG] <t> Refresh the page, \\ __ relive history __ the right way
{goto} game_over_loop

{label} game_over_loop
[LOG] <t> ...
[LOG] <t> ...
[LOG] <t> You're __ still __ here?
[LOG] <t> Refresh the page, \\ __ relive history __ the right way
[LOG] <t> Don't make me repeat myself...
{goto} game_over_loop

{label} act_two
{background} act_two
[LOG] <t> #green January 2019 \\ UNC Game Jam \\ Sitterson Hall

{music} act_two

[Nikhil] #blue <s> I have to be honest... 
[Nikhil] #blue <f> I’m in love with the idea we \\ have for our game
[Nikhil] #blue The story Sophia came up with \\ is really good
[Nikhil] #blue But I can tell we have a long __ long __ \\ way until we actually finish
[Nikhil] #blue Worst case we just finish the \\ game later
[Nikhil] #blue I don't think we should \\ stress out toooo much over this
[Nikhil] #blue Besides, ___ there is <s> way <n> \\ too much work left
[Sophia] <s> Hey, ___ \\ uhh, ___ \\ <f> quick question
[Nikhil] Yeah? \\ Whats up?
[Sophia] When do you wanna take a break \\ and <s> ...
[Sophia] Play that game you were talking \\ about?
[Nikhil] Oh!
[Nikhil] You mean that two player prison \\ escape game?
[Sophia] <f> YEAH!
[Nikhil] I mean... \\ <s> we do have a lot of work left...
[Sophia] <s> yeahhh...
[Nikhil] <f> But! \\ <n> I'm down right now if you are?
[Sophia] <f> YEAH!!
[Sophia] Do you wanna go ahead and \\ find a room to setup in?
[Sophia] I gotta go and call my parents \\ real quick
[Nikhil] No worries! I'll go and see \\ if that one conference room is \\ open
[Sophia] Good idea! \\ _ I'll join you in a bit
[Nikhil] Sounds <s> goooood <n> to me!

[LOG] <t> #green Empty Conference Room \\ Sitterson Hall

[Nikhil] #blue Let's see... 
[Nikhil] #blue Yes! It's empty!
[Nikhil] #blue Lemme go get everything setup...
[] *knock, knock*
[Nikhil] Hey! __ \\ __ Come in!
[Sophia] Hey! \\ __ Sorry about that
[Sophia] My parents have been \\ calling like all night haha
[Nikhil] You're <s> tooooootally <s> good!
[Nikhil] So!\\ __ Ready to try this game?
[Sophia] Yeah! Let's play!

[] <s> ...
[LOG] <t> #green \\ An hour passes...

[Nikhil] #blue <s> Yeah... <n> \\ this game kinda sucks
[Nikhil] #blue And it had  such good reviews \\ too...
[Nikhil] #blue <s> Although...
[Nikhil] #blue ...it looks like Sophia is \\ having fun at least
[Nikhil] Heyo, ___ thoughts on the game so far?
[Sophia] <s> It... \\ __ <n> kinda sucks ___ haha
[Sophia] <f> But I don't mind!

{label} should_i_play
[Sophia] Do you still wanna play?
{choice} [Keep playing!] keep_playing  [Go sleep] go_sleep

{label} go_sleep
[Nikhil] #blue Hmm...idk 
[Nikhil] #blue I think I'd rather be sleeping tbh
[Nikhil] Might be best to call \\ it a night haha
[Nikhil] Especially since we \\ gotta make a lot of progress tomorrow
[Sophia] Haha yeah \\ that's cool!
[Nikhil] Alright, I'll head \\ back to Old East then
[Nikhil] Goodnight! Cya tomorrow!
[Sophia] <s> Goodnight!
{goto} game_over

{label} keep_playing
[Nikhil] #blue Hmm...idk 
[Nikhil] #blue The game <s> does ___ <s> suck...
[Nikhil] #blue ...but it's nice spending time with \\ her like this
[Nikhil] #blue <s> This moment feels... __ \\ special?
[Nikhil] #blue I don't think I want it to end \\ just yet
[Nikhil] <s> I mean... <n> I'm down to keep playing \\ if you are?
[Sophia] Haha okay okay cool! 
[Sophia] <f> LETS PULL AN ALL NIGHTER!!
[Nikhil] #blue Haha oh no... \\ __ what did I sign up for?
[] ...
{stop-music} stop

{goto} act_three

{background} act_three
{label} act_three
[LOG] <t> #green June 2019 \\ Moving Day \\ Warehouse Apartments
{music} act_three

[Nikhil] #blue <s> Alrightttt 
[Nikhil] #blue I think I'm in the right \\ parking lot for Warehouse
[Nikhil] #blue Let's just hope I don't get \\ a ticket...
[Nikhil] #green Hey! \\ Just parked! \\ Coming up now!
[Nikhil] #blue <s> Man... <n> \\ This will be... ___ \\ interesting
[Nikhil] #blue Of course, _ we're meeting up for \\ a "simple" reason
[Nikhil] #blue "Just to watch Spiderman 2 before \\ you move up"
[Nikhil] #blue <s> But... \\ I think we both know the real \\ reason...
[Nikhil] #blue I get to hear if she wants to be a \\ <s> ___ "thing" <n> or not haha
[Nikhil] #blue Don't really blame her though!
[Nikhil] #blue I think she wants to date me??
[Nikhil] #blue But I know she has to decide \\ if it's worth the struggle with \\ her parents
[Nikhil] #blue <s> ___ ...
[Nikhil] #blue <s> I do hope she says yes...
[Nikhil] #blue Anyways, ___ \\ this should be her room!
[] *knock, knock*
[Sophia] <f> Hiiiii \\ _ <n> 
[Sophia] Are you ready for SPIDERMAN?
[Nikhil] <s> Awww yesssssssss, \\ _ <n> I am <s> _ SO _ <n> ready
[Sophia] YEAH! \\ __ I'll go put it up!
[Nikhil] Niceeeee!
[Nikhil] Alright, __ so, __ uhhhhh, __ <s> while you do \\ that...
[Nikhil] #blue Well, __ no turning back now...
[Nikhil] I feel like we have something a lil \\ important to talk about first
[Sophia] Yeah... ___ no I agree
[Sophia] Okay so, __ I thought about it \\ long and hard
[Sophia] And I've decided,
[Sophia] ___ ...that I do want to date you.
[Nikhil] #blue <s> ...
[Nikhil] #blue <s> Wow
[Nikhil] #blue You know...
[Nikhil] #blue I feel like I was expecting that...
[Nikhil] #blue But also ___ not expecting that...
[Sophia] I'm sorry it took me so long...

[Sophia] <s> But... ___ do you still want to date?
{choice} [Of course!] yes_date  [I don't know...] no_date

{label} no_date
{stop-music} stop
[LOG] <t> ...
[LOG] <t> ...
[LOG] <t> Wow
[LOG] <t> I guess you hate happy endings \\ __ huh?
[LOG] <t> Refresh the page, \\ __ relive history __ the right way
{goto} game_over_loop

{label} yes_date
[Nikhil] <s> Wow...
[Nikhil] Well duh, ___ \\ you know I want to date you!
[Sophia] Haha aw, __  in the end, __ \\ I want to do what I WANT to do
[Sophia] I don't want to worry about \\ pleasing anyone else
[Nikhil] Well, __ I'm glad __ I feel so ____ <s> smiley
[Sophia] Haha yeah, __ <s> me too
[Nikhil] I think this is the start of \\ something special
[Sophia] Well duh, __ I just started playing the \\ Spiderman movie
[Nikhil] ...
[Nikhil] I hate you
[] ...
{stop-music} stop

{goto} act_four

{label} act_four
{background} act_four
[LOG] <t> #green October 2020 \\ Sophia's Birthday \\ Chapel Hill
{music} act_four

[Nikhil] #blue <s> Man...
[Nikhil] #blue After so long...
[Nikhil] #blue ...I'm finally seeing her again
[Nikhil] #blue I really hope she digs this lil game \\ __ haha
[Nikhil] #blue But hey, _ I know she's always been \\ a fan of corny stuff
[Nikhil] #blue I'm so excited, <s> ___ ahhhhhh
[Nikhil] #blue I can't believe it's been almost \\ 4 months since I saw her...
[Nikhil] #blue Oh shoot! __ \\ Is that her car?
[Nikhil] #blue Alright, __ time to go!
[] ...
[] *knock, knock*`;