# PickYourDishes project
Welcome to the PickYourDishes project! This repository is responsible for the visual presentation of its backend counterpart, [Pick Your Dishes - API](https://github.com/VanK33/PickYourDish-API), where all the heavy lifting takes place. This application is served as a food recipe management applicaiton designed to streamline the process of discovering, organizing and sharing culinary creations. 

## Table of Content
- Reserve


## About
This project serves as the forntend interactive application with a design of helping culinary enhusiasts discover, organize and share their favorite recipes with ease. The frontend UI allow the user to navigate through a vast collection of recipes depending on the personal choices, and manage their personal recipe collections once they are logged into the system. 


### Key Features:
Recipe Discovery: Explore the ever-expanding culinary recipe database from different region and manage your taste with multiple selections
Personal Recipe Management: Create, edit, and display all your own recipes in the user management page
Saving Your Favoriates: Save your favorite recipes with just one click. Next time you need to find them, simply open your personal page to see all the recipes you like. Convenient and simple (WIP).

### How-to
**Project Initialization**
1. Clone the repository
```
git clone https://github.com/VanK33/PickYourDish.git
```

2. Install dependencies
```
cd PickYourDish
npm install
```

3. Start the client:
```
npm start
```

### Roadmap:
The most immediate goals for this project primiarly lie in three aspects

#### Recipe Upload functionality ####

Only a preliminary number of recipes are added manually into the database, serving as the seeding files for the backend. This results in a narrow range of recipe selection options and limited output as multiple filters are applied. To combat this, the project needs to finish the upload option to reliably upload new recipes to the database. The ideal goal for the database is to hold more than 100 recipes.
current count: 17

#### User Registration ####

Currently, the user registration window is not implemented, although the backend support is already there. This will prevent any incoming traffic from registering, and therefore blocked from being able to add/edit recipes.

#### Multer Support ####

It is another critical component as each recipe requires a thumbnail image to be properly displayed. The uploaded image should ideally be in a 16:9 aspect ratio, so additional libraries, such as compress.js, are needed to achieve this requirement.


