umMEAN stack app
======================
MEAN stack app  was made to have a simple skeleton for a completed Web App ready to go for demonstration purposes and learning how to build CRUD & REST operations into a Node.js Web App. This is the final example that is demonstrated in [How to Create a Complete Express.js + Node.js + MongoDB CRUD and REST Skeleton](***GET FROM HERE*****)
## Generate Eclipse projects file (.project)
## Authentication
    1. npm install -g nodeclipse to install it
    2. Go to your folder, nodeclipse -g to generate nodeclipse project setting.
    3. Open it from Eclipse "import from other projects".
- There are two types of authentication approaches in web apps.
    1. cookie based approach (which is the oldest of the two)
      -cookie based  is not scalable when fetching data, becauase every time a login happens 
       the server has to create a new session, increasing waiting time.
    2. token based approach (which is the modern approach)
       -token based is scalable since during authentication every login is sighned with in an http request
        (it warks by creating a token of user credentials after authentication thus for every secure communicatio the web app
          will send this credentials along with the http requests,this makes token based authenticatio more scalable and fast)
## Installation
- Perform a clone of this repo. 
- Make sure MongoDB is installed (`brew install mongodb`)
- Create a MongoDB database named `enmskeleton` (`use enmskeleton`)
- Install packages and start the express.js web service (`npm install && npm start`)
- Navigate to `http://127.0.0.1:3000` to see the express.js welcome page

## Usage Instructions
All of the MVC pieces are built, but are also rudimentary and not flashy. The root of our webapp goes to the express.js landing page, but there is a schema created for a new object called `blobs`. To access `blobs`, follow the route that is already in place by going to `http://127.0.0.1:3000/blobs`.

Add a new blob by going to `http://127.0.0.1:3000/blobs/new`. 
<center><img src="https://lh3.googleusercontent.com/OeLGdiEdE4StkugUB7XnaBKcnVD0tx5lOs1v8cpHU0JjPTYTROBvwZcXW_I7FVkmCFEC8MNPsC7RkJynZoAthQ5Q2zJppVUCyX0a2sk9_hURMVrqGDrltZq6QybfUKwo4Qz8FmDLAi7MFN30QWE4NF3AEwBN3-YaNaEVwJbj_zv9qzPFduV9Uzwq614WWqxszbb3kqLx_RWViIOcDpg8CSLPp_ItZmibYMUKM6YWCjnrzWJI3yWK12A8THiO7yt5enV2KyQ1tZ-AFXASG-AwETZ_hXOmn3iwHLHITUAQfSAsh7kPe1QZ2b-95DbP-tIak1WB2g5EUWMTkr4QXs4EUEXnw3ZHGYhIsZ4hl3NZW7FiaVugkwo0JVnMDAOdV1RYA6KDOX0zVK3Hhvq7sX3NEhDvwS0aIdEXcAWB7tL9WkkoqwYFlznXPm1WlaGnLF9kOlVJc-i2RmAvToKUPOd2weo1QlE4HUW-2R9E0LAzSMlJyY1Xqu1a6eIe7u5O8dM1e8O6TTdsK4UGjE-cMtzC1TeZiep1yd2RgXeFZ_QtareA7RJeZTiP-nOyUJGGcIG0qUDhFN6IZ9iIq2h8IBrDDx3VuK5YLiw=s600-no" width="400"></center>

After submitting, this will take you back to the index page where you can now `Show` or `Edit` or `Delete` that blob record from the UI
<center><img src="https://s3.amazonaws.com/kennyonetime/blob_all.png" width="600"></center>

All of the REST pieces are baked in as well. You can test them using a multitude of different REST based tools.

## Contribution
Create a fork of the project into your own reposity. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

Licensing
---------
express-node-mongo-skeleton is freely distributed under the MIT License. See LICENSE for details