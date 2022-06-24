# Rocket Lab Rocket Manager Demo

This is a demo application for managing a rocket a object of properties.

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

The frontend site was written using React. I used the [Material UI](https://mui.com/) for my component library. I used this since I am very familiar with Vue's material library [Vuetify](https://vuetifyjs.com),and really like the look of material design. I also used [PrimeFlex](https://www.primefaces.org/primeflex/) for some css utility classes. I also utilized Typescript.

### Running it
To start the FE use the following. The site will then be available at `localhost:8080`

```
cd fe
npm i
npm run start
```

### UI
I am usually not responsible for designing how sites look. So when it came to designing the look of the front-end for this site, I decided to try to match the look of the [RocketLab](https://www.rocketlabusa.com/) site. I actually download the font from your landing page (Nulshock Light) and used it in the header. 

### Challenges
This is my first react project.

## Backend

The Backend of this site was written with Express.js/Node. After some research I decided to utilize a relational database(Specifically MySQL) to store the rocket data (more detail in [Database](#Database)). MySQL was choosen as the database for this project since I am most familiar MySQL, and it was very straightforward to create a MySQL container in Docker. Sequelize was used as an OEM for this project. While I have never used this OEM before, after some research, it seemed to be very well supported/documented, straightforward to setup, and it was very similar to Loopback.io's build-in OEM. I also utilized Typescript.

### Running it
To start the BE use the following. The API will then be available at `localhost:3000`

```
docker-compose up -d
cd be
npm i
npm run build
npm run init-db
npm run seed
npm run start
```

### Database
This project utilizes two tables RocketNode/RocketProperty. RocketNode stores each node in the rocket data with a `path`(Ex: /Rocket/Stage1) as well as a `name` of each node(Ex: Stage1). The RocketProperty table stores node properties with a `key` (Ex: Mass) and `value` (Ex: 3000). The value of a RocketProperty must be a number. There is a hasMany relationship from RocketNode to RocketProperty with RocketProperty having the foriegn key  `nodeId`. 

#### Get Rocket Info

To Reconstruct the tree from a given path using the following steps.
- Get all nodes under given paths using `like: ${path}+'%'` to match all nodes with paths starting with the desired path.
- Sort resulting nodes by thestring length of thier paths descending. Thus the nodes are sorted by depth.
- create a new empty response object `res = {}`
- Since nodes are sorted by depth, build the response object by utilizing lodash's `_.set(res, node[i].path, node[i].name)` method for each node. Then create the properties for the current node by going through the properties of the node and following the same process `_.set(res, node[i].properties[j].path, node[i].properties[j].name)`
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

Inserting into the tree is very simple. The request url is used to create a new RocketNode, and the request body is used to create rocket properties/new rocket nodes depending on if thier value is a number or a object.  

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

