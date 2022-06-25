# Rocket Lab Rocket Manager Demo

This is a demo application for managing a rocket as object of properties.

```json
{
  "Rocket": {
    "Height": 18.0,
    "Mass": 12000.0,
    "Stage1": {
      "Engine1": {
        "Thrust": 9.493,
        "ISP": 12.156
      },
      "Engine2": {
        "Thrust": 9.413,
        "ISP": 11.632
      },
      "Engine3": {
        "Thrust": 9.899,
        "ISP": 12.551
      }
    },
    "Stage2": {
      "Engine1": {
        "Thrust": 1.622,
        "ISP": 15.110
      }
    }
  }
}
```

## Frontend

The frontend site was written using React. I used the [Material UI](https://mui.com/) as a component library. This was chosen since I am very familiar with Vue's material library [Vuetify](https://vuetifyjs.com), and really like the look of material design. [PrimeFlex](https://www.primefaces.org/primeflex/) for some css utility classes. I also utilized Typescript.

### Running it
To start the FE use the following. The site will then be available at `localhost:8080`

```
cd fe
npm i
npm run start
```

### UI
I am usually not responsible for designing how sites look. So when it came to designing the look of the front-end for this site, I decided to try to match the look of the [RocketLab](https://www.rocketlabusa.com/) site. I actually downloaded the font from your landing page (Nulshock Light) and used it in the header. 

### Challenges
This is my first React project. So it took a little bit of reading to get started. However, the docs were really well written and I was pleased with how many parallels I noticed with Vue 3 and the Vue Composition API.

## Backend

The Backend of this site was written with Express.js/Node. After some research I decided to utilize a relational database(Specifically MySQL) to store the rocket data (more detail in [Database](#Database)). MySQL was choosen as the database for this project since I am most familiar MySQL, and it was very straightforward to create a MySQL container in Docker. Sequelize was used as an OEM for this project. While I have never used this OEM before, after some research, it seemed to be very well supported/documented, straightforward to setup, and it was very similar to Loopback.io's build-in OEM. I also utilized Typescript.

### Running it
To start the BE use the following commands. The API will then be available at `localhost:3000`

```
cd be
docker-compose up -d
npm i
npm run build
npm run init-db
npm run seed
npm run start
```

### Database
This project utilizes two tables RocketNode/RocketProperty. RocketNode stores each node in the rocket data with a `path`(Ex: /Rocket/Stage1) as well as a `name` of each node(Ex: Stage1). The RocketProperty table stores node properties with a `key` (Ex: Mass) and `value` (Ex: 3000). The value of a RocketProperty must be a number. There is a hasMany relationship from RocketNode to RocketProperty with RocketProperty having the foriegn key  `nodeId`. Thus, when pulling RocketNodes from the DB, the OEM automatically adds all the Rocket Properties to each node. 

### Challenges

Due to the fact that the user can sent any arbitary path to any depth (/a/b/c/d/e/f/...), this framework could end up inserting a node without a parent. Depending on the final use case for this project this can be resolved by either...
- Throwing an error when a user tries to create a node without a parent
- Create all intermediate nodes from the request when the parent does not exist.

Another issue with this solution is as the tree grows larger the path of each node will continue to grow O(N) in worst case. At some point, you are going to reach the maximum number of characters you can insert into the path column for SQL.

#### Get Rocket Info

To Reconstruct the tree from a given path using the following steps.
- Get all nodes under given paths using `like: ${path}+'%'` to match all nodes with paths starting with the desired path.
- Sort resulting nodes by the string length of their paths descending. Thus, the nodes are sorted by depth in the tree.
- Create a new empty response object `res = {}`
- Since nodes are sorted by depth, build the response object by utilizing lodash's `_.set(res, node[i].path, node[i].name)` method for each node. Also creating the properties for each node by going through the properties each node and following the same process `_.set(res, node[i].properties[j].path, node[i].properties[j].name)`
- return the constructed object as json

##### Request

`GET /child-1/child-2/.../child-n`

##### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

```json
{
  "Engine3": {
    "Thrust": 9.899,
    "ISP": 12.551
  }
}
```

#### Create Rocket Node

Inserting into the tree is very simple. The request url(Ex: /Rocket/Mass) is used to create the path of the new RocketNode, and the request body is used to create rocket properties/new rocket nodes depending on if thier value is a number or a object.  

##### Request

`POST /child-1/child-2/.../child-n`

    {
      "Engine": {
        "Mass": 1000
      },
      "Height": 34
    }

##### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
      "Engine": {
        "Mass": 1000
      },
      "Height": 34,
      "Height": 45
    }

## Production Ready 🤔

I don't think so. Besides the two issues I discussed in the Backend section. Here are some other action items.
- Add Dockerfile to build API/FE into two seperate docker images to deploy to ECS
- Add media query to handle different screen sizes.
- SQL table indexing for faster path-based lookup
- Add more input validation for more detailed error messages 
- Add unit tests
- Add created at/ modified for each node in the FE
