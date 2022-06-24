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

## Front End

The frontend site was written using React. I used the [Material UI](https://mui.com/) for my component library. I used this since I am very familiar with Vue's material library [Vuetify](https://vuetifyjs.com),and really like the look of material design. I also used [PrimeFlex](https://www.primefaces.org/primeflex/) for some css utility classes. 

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


