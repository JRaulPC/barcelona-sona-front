import { ApiSpots, Spot } from "../types";

export const apiSpotsMock: ApiSpots = {
  spots: [
    {
      _id: "1",
      name: "La modelo",
      imageUrl:
        "https://s2.qwant.com/thumbr/0x380/c/5/0a5db7bbec61444fb5119af51a87c45fd74dbaf7aac051669d6f06bb573b10/la-modelo-prison-hallway.jpg?u=https%3A%2F%2Ftheinternationalangle.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fla-modelo-prison-hallway.jpg&q=0&b=1&p=0&a=0",
      spotUse: "Carcel",
      openingYear: 1910,
      isVisited: false,
      description: "La modelo es un espacio...",
    },
    {
      _id: "2",
      name: "Palau de la música",
      imageUrl:
        "https://cdn.discordapp.com/attachments/392765397910421507/1150508288430059691/pmc-concerts-hall.webp",
      spotUse: "Auditori",
      openingYear: 1856,
      isVisited: false,
      description: "El Palau de la música es un espacio...",
    },
  ],
};

export const apiSpotsMockDeletedSpot: ApiSpots = {
  spots: [
    {
      _id: "2",
      name: "Palau de la música",
      imageUrl:
        "https://cdn.discordapp.com/attachments/392765397910421507/1150508288430059691/pmc-concerts-hall.webp",
      spotUse: "Auditori",
      openingYear: 1856,
      isVisited: false,
      description: "El Palau de la música es un espacio...",
    },
  ],
};
export const apiSpotsMockAddedWithForm: ApiSpots = {
  spots: [
    {
      _id: "1",
      name: "La modelo",
      imageUrl:
        "https://s2.qwant.com/thumbr/0x380/c/5/0a5db7bbec61444fb5119af51a87c45fd74dbaf7aac051669d6f06bb573b10/la-modelo-prison-hallway.jpg?u=https%3A%2F%2Ftheinternationalangle.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fla-modelo-prison-hallway.jpg&q=0&b=1&p=0&a=0",
      spotUse: "Carcel",
      openingYear: 1910,
      isVisited: false,
      description: "La modelo es un espacio...",
    },
    {
      _id: "2",
      name: "Palau de la música",
      imageUrl:
        "https://cdn.discordapp.com/attachments/392765397910421507/1150508288430059691/pmc-concerts-hall.webp",
      spotUse: "Auditori",
      openingYear: 1856,
      isVisited: false,
      description: "El Palau de la música es un espacio...",
    },
    {
      _id: "3",
      name: "St. Felip Neri",
      isVisited: true,
      openingYear: 1500,
      spotUse: "church",
      imageUrl: "https://s2.qwant.cfelipneri.jp&p=0&a=0.jpg",
      description: "St.Felip Neri es una iglesia de...",
    },
  ],
};

export const apiSpot = {
  spot: {
    _id: "1",
    name: "La modelo",
    imageUrl:
      "https://s2.qwant.com/thumbr/0x380/c/5/0a5db7bbec61444fb5119af51a87c45fd74dbaf7aac051669d6f06bb573b10/la-modelo-prison-hallway.jpg?u=https%3A%2F%2Ftheinternationalangle.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fla-modelo-prison-hallway.jpg&q=0&b=1&p=0&a=0",
    spotUse: "Carcel",
    openingYear: 1910,
    isVisited: false,
    description: "La modelo es un espacio...",
  },
};

export const toggledApiSpotMock = {
  spot: {
    id: "1",
    name: "La modelo",
    imageUrl:
      "https://s2.qwant.com/thumbr/0x380/c/5/0a5db7bbec61444fb5119af51a87c45fd74dbaf7aac051669d6f06bb573b10/la-modelo-prison-hallway.jpg?u=https%3A%2F%2Ftheinternationalangle.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fla-modelo-prison-hallway.jpg&q=0&b=1&p=0&a=0",
    spotUse: "Carcel",
    openingYear: 1910,
    isVisited: true,
    description: "La modelo es un espacio...",
  },
};

export const toggleSpotMock = {
  id: "1",
  name: "La modelo",
  imageUrl:
    "https://s2.qwant.com/thumbr/0x380/c/5/0a5db7bbec61444fb5119af51a87c45fd74dbaf7aac051669d6f06bb573b10/la-modelo-prison-hallway.jpg?u=https%3A%2F%2Ftheinternationalangle.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fla-modelo-prison-hallway.jpg&q=0&b=1&p=0&a=0",
  spotUse: "Carcel",
  openingYear: 1910,
  isVisited: false,
  description: "La modelo es un espacio...",
};

export const spotsMock: Spot[] = [
  {
    id: "1",
    name: "La modelo",
    imageUrl:
      "https://s2.qwant.com/thumbr/0x380/c/5/0a5db7bbec61444fb5119af51a87c45fd74dbaf7aac051669d6f06bb573b10/la-modelo-prison-hallway.jpg?u=https%3A%2F%2Ftheinternationalangle.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fla-modelo-prison-hallway.jpg&q=0&b=1&p=0&a=0",
    spotUse: "Carcel",
    openingYear: 1910,
    isVisited: false,
    description: "La modelo es un espacio...",
  },
  {
    id: "2",
    name: "Palau de la música",
    imageUrl:
      "https://cdn.discordapp.com/attachments/392765397910421507/1150508288430059691/pmc-concerts-hall.webp",
    spotUse: "Auditori",
    openingYear: 1856,
    isVisited: false,
    description: "El Palau de la música es un espacio...",
  },
];
export const spotMock = spotsMock[0];
export const mockedId = spotsMock[0].id;

export const formMock: Partial<Spot> = {
  name: "St. Felip Neri",
  isVisited: true,
  openingYear: 1500,
  spotUse: "church",
  imageUrl: "https://s2.qwant.cfelipneri.jp&p=0&a=0.jpg",
  description: "St.Felip Neri es una iglesia de...",
};
