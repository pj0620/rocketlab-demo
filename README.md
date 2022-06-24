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
npm run start
```

### Database
This project utilizes two tables RocketNode/RocketProperty. RocketNode stores each node in the rocket data (Ex: /Rocket/Stage1) as well asthe name of each node (Ex: Stage1).
