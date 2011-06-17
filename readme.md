<H1>FDC-NODEJS-HEROKU</H1>
I think I need to start getting better names for my projects.
<HR />
<P>Anyway.</P>

<P>
This is a sample project similar to NodeJS-RESTFDC (see, I'm not only boring - I'm inconsistent) but has been completely refactored
to use with Heroku as the deployment platform.  It is also better suited for juggling between a local instance, where you will need 
to have SSL setup with Node.js, and Heroku by detecting if the server port is being set for you (which would be the case for Heroku).
</P>

<P>
There are two main modules: rest and oauth.  The OAuth is designed specific to how Force.com sets up the Remote Access, but we're 
very similar to other OAuth2 implementations out there.  If you are still trying get OAuth1 up and running - sorry about that.  The REST
module is also geared specific to the Force.com REST API and even includes support for custom Apex REST endpoints.</P>

<P>
This project is not currently supporting using the refresh token correctly which may or may not be a critical failure.  That support will
come shortly.  That's probably job 1 closely followed by at least some testing and better example code for using with the popular 
template modules out there like express.</P>

<P>
Catching me on twitter @joshbirk is probably the most efficient mode of communication, but please fork, comment and send issues without
mercy.</P>