Angular.js app with node.js and MongoDB on OpenShift
====================

This git repository helps you get up and running quickly w/ a Angular.js application with node.js and MongoSB  on OpenShift. 
The backend database is MongoDB and the database name is the same as your application name (using $ENV['OPENSHIFTAPP_NAME']). 
You can call your application by whatever name you want (the name of the database will always match the application).


Running on OpenShift
----------------------------

Create an account at http://openshift.redhat.com/

Create a nodejs-0.10 application (you can call your application whatever you want)

    rhc app create -a ng -t nodejs-0.10
    

Add MongoDB support to your application

    rhc cartridge add -a ng -c mongodb-2.2
    
    
Clear project folder - delete all files and node_modules folder

    cd ng
    rm *.* 
    rm -rf node_modules
  

Add this upstream Angular app repo

    git remote add upstream -m master git://github.com/araczkowski/angular-example.git
    git pull -s recursive -X theirs upstream master
    

Install dependencies (to improve productivity when building a web app I assume here that you have installed nodejs and yeoman -> please see at http://nodejs.org/ and http://yeoman.io/)

    npm install
    bower install
    
    
Build version

    grunt
    
    
move openshift and git folders to dist

    mv .openshift .git dist
    
    
then push the repo upstream
    
    cd dist
    git add --all
    git commit -m "first commit to OpenShift"
    git push
    

That's it, you can now checkout your application at:

    http://ng-$yournamespace.rhcloud.com

