Angular.js app with node.js and MongoDB on OpenShift
====================

This git repository helps you get up and running quickly w/ a Angular.js application with node.js and MongoSB  on OpenShift. 
The backend database is MongoDB and the database name is the same as your application name (using $ENV['OPENSHIFTAPP_NAME']). 
You can call your application by whatever name you want (the name of the database will always match the application).


Running on OpenShift
----------------------------

Create an account at http://openshift.redhat.com/

Create a nodejs application (you can call your application whatever you want)

    rhc app create -a ng -t nodejs-0.10

Add MongoDB support to your application

    rhc cartridge add -a ng -c mongodb-2.2

Add this upstream Angular app repo

    cd ng
    git remote add upstream -m master git://github.com/araczkowski/angular-example.git
    git pull -s recursive -X theirs upstream master

Install dependencies

    npm install
    bower install
    
Build version

    grunt

Then push the repo upstream

    mv .openshift .git dist
    cd dist
    git push

That's it, you can now checkout your application at:

    http://ng-$yournamespace.rhcloud.com

