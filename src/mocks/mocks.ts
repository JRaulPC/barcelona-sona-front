import { Spot } from "../types";

export const spotsMock: Spot[] = [
  {
    id: "1",
    name: "La modelo",
    imageUrl:
      "https://s2.qwant.com/thumbr/0x380/c/5/0a5db7bbec61444fb5119af51a87c45fd74dbaf7aac051669d6f06bb573b10/la-modelo-prison-hallway.jpg?u=https%3A%2F%2Ftheinternationalangle.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fla-modelo-prison-hallway.jpg&q=0&b=1&p=0&a=0",
    spotUse: "Carcel",
    openingYear: 1910,
    isVisited: false,
  },
  {
    id: "2",
    name: "Palau de la música",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Palau_de_la_M%C3%BAsica_Catalana%2C_the_Catalan_Concert_Hall.jpg/800px-Palau_de_la_M%C3%BAsica_Catalana%2C_the_Catalan_Concert_Hall.jpg?20120927183654",
    spotUse: "Auditori",
    openingYear: 1856,
    isVisited: false,
  },
];
