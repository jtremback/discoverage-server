### login

- **POST** `/login`

- **Body**
  ```
  {
      "email": "jehan.tremback@gmail.com",
      "password": "pokemon"
  }
  ```

- **Response**
  ```
  {
      token: '8091755178757',
      _id: '550648a8fa6b8286095dd5ce',
      name: 'jehan',
      email: 'jehan.tremback@gmail.com',
      password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
      __v: 0,
      bananaCount: 5
  }
  ```

### logout

- **GET** `/logout?token=8091755178757`

- **Response**
  ```
  Logged Out.
  ```


### get all users

- **GET** `/users`

- **Response:**
  ```
  [{
      __v: 0,
      _id: '550648a8fa6b8286095dd5ce',
      email: 'jehan.tremback@gmail.com',
      name: 'jehan',
      password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
      token: '8091755178757',
      bananaCount: 5
  }]
  ```

### get user by id

- **GET** `/users/550648a8fa6b8286095dd5ce`

- **Response:**
  ```
  {
      __v: 0,
      _id: '550648a8fa6b8286095dd5ce',
      email: 'jehan.tremback@gmail.com',
      name: 'jehan',
      password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
      token: '8091755178757',
      bananaCount: 5
  }
  ```

### save new user

- **POST** `/user`

- **Body**
  ```
  {
    "name": "aditya",
    "email": "adit99@gmail.com",
    "password": "pokemon"
  }
  ```

- **Response**
  ```
  {
      __v: 0,
      name: 'aditya',
      email: 'adit99@gmail.com',
      password: '$2a$10$RHIkxTvaBb4uw1F60A9yTuIodAajvtEMRfFeTnJu5xAQAYgiJkoIS',
      _id: '5508a810f79859a7d61ec066',
      bananaCount: 0
  }
  ```

### update user

- **POST** `/user/550648a8fa6b8286095dd5ce?token=8091755178757`

- **Body**
  ```
  {
      "bananaCount": 9
  }
  ```

- **Response**
  ```
  {
      __v: 0,
      _id: '550648a8fa6b8286095dd5ce',
      email: 'jehan.tremback@gmail.com',
      name: 'jehan',
      password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
      token: '8091755178757',
      bananaCount: 9
  }
  ```

### get all users filtered

- **GET** `/users?name=aditya`

- **Response:**
  ```
  [{
      name: 'aditya',
      email: 'adit99@gmail.com',
      password: '$2a$10$RHIkxTvaBb4uw1F60A9yTuIodAajvtEMRfFeTnJu5xAQAYgiJkoIS',
      _id: '5508a810f79859a7d61ec066',
      __v: 0,
      bananaCount: 0
  }]
  ```

### get all animals

- **GET** `/animals`

- **Response:**
  ```
  [{
      _id: '550632455b692503008e659f',
      location: [35.3343, 121.2223],
      owner: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      __v: 0,
      health: 5,
      sprite: '1_charizard',
      name: 'Charizard'
  }]
  ```

### get animal by id

- **GET** `/animals/550632455b692503008e659f`

- **Response:**
  ```
  {
      _id: '550632455b692503008e659f',
      location: [35.3343, 121.2223],
      owner: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      __v: 0,
      health: 5,
      sprite: '1_charizard',
      name: 'Charizard'
  }
  ```

### get animals nearby

- **GET** `/animals/near?lon=37&lat=122&dist=1000000`

- **Response:**
  ```
  [{
      _id: '550632455b692503008e659f',
      location: [35.3343, 121.2223],
      owner: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      __v: 0,
      health: 5,
      sprite: '1_charizard',
      name: 'Charizard'
  }]
  ```

### update animal

- **POST** `/animal/550632455b692503008e659f?token=8091755178757`

- **Body**
  ```
  {
      "health": 9
  }
  ```

- **Response**
  ```
  {
      _id: '550632455b692503008e659f',
      location: [35.3343, 121.2223],
      owner: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      __v: 0,
      health: 9,
      sprite: '1_charizard',
      name: 'Charizard'
  }
  ```

### get all animals filtered

- **GET** `/animals?owner=550648a8fa6b8286095dd5ce`

- **Response:**
  ```
  [{
      _id: '550632455b692503008e659f',
      location: [35.3343, 121.2223],
      owner: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      __v: 0,
      health: 9,
      sprite: '1_charizard',
      name: 'Charizard'
  }]
  ```

### get all bananaPicks

- **GET** `/bananapicks`

- **Response:**
  ```
  [{
      _id: '5399a1ae13a2d700003bded8',
      bananaTree: null,
      picker: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      __v: 0,
      timestamp: 1426485627563
  }]
  ```

### get bananaPick by id

- **GET** `/bananapicks/5399a1ae13a2d700003bded8`

- **Response:**
  ```
  {
      _id: '5399a1ae13a2d700003bded8',
      bananaTree: null,
      picker: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      __v: 0,
      timestamp: 1426485627563
  }
  ```

### save new bananaPick

- **POST** `/bananaPick?token=8091755178757`

- **Body**
  ```
  {
      "bananaTree": "5399a1ae13a2d700003bded8",
      "timestamp": 1426485625563,
      "picker": "550648a8fa6b8286095dd5ce"
  }
  ```

- **Response**
  ```
  {
      bananaTree: {
          _id: '5399a1ae13a2d700003bded8',
          location: [37.77777, 122.223333],
          __v: 0
      },
      picker: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      _id: '5508a810f79859a7d61ec067',
      __v: 0,
      timestamp: 1426485625563
  }
  ```

### get all bananaPicks filtered

- **GET** `/bananaPicks?timestamp=1426485625563`

- **Response:**
  ```
  [{
      bananaTree: {
          _id: '5399a1ae13a2d700003bded8',
          location: [Object],
          __v: 0
      },
      picker: {
          __v: 0,
          _id: '550648a8fa6b8286095dd5ce',
          email: 'jehan.tremback@gmail.com',
          name: 'jehan',
          password: '$2a$10$52MTy3uWUp4uneozYERMQ.MHeLiIWPmuQ7wDUANV8T1dEN70uzaiy',
          token: '8091755178757',
          bananaCount: 9
      },
      _id: '5508a810f79859a7d61ec067',
      __v: 0,
      timestamp: 1426485625563
  }]
  ```

### get all bananaTrees

- **GET** `/bananatrees`

- **Response:**
  ```
  [{
      _id: '5399a1ae13a2d700003bded8',
      location: [37.77777, 122.223333],
      __v: 0
  }]
  ```

### get bananaTree by id

- **GET** `/bananatrees/5399a1ae13a2d700003bded8`

- **Response:**
  ```
  {
      _id: '5399a1ae13a2d700003bded8',
      location: [37.77777, 122.223333],
      __v: 0
  }
  ```

### get bananaTrees nearby

- **GET** `/bananatrees/near?lon=37&lat=122&dist=1000000`

- **Response:**
  ```
  [{
      _id: '5399a1ae13a2d700003bded8',
      location: [37.77777, 122.223333],
      __v: 0
  }]
  ```

### update a bunch of shit at once

- **POST** `/update`

- **Body**
  ```
  {
      "animals": [{
          "_id": "550632455b692503008e659f",
          "owner": "550648a8fa6b8286095dd5ce"
      }],
      "users": [{
          "_id": "550648a8fa6b8286095dd5ce",
          "bananaCount": 23
      }],
      "bananaPicks": [{
          "bananaTree": "5399a1ae13a2d700003bded8",
          "picker": "550648a8fa6b8286095dd5ce"
      }],
      "token": "8856562073342"
  }
  ```

- **Response**
  ```
  {
    "users": [
      {
        "_id": "550648a8fa6b8286095dd5ce",
        "email": "jehan.tremback@gmail.com",
        "name": "jehan",
        "bananaCount": 23
      }
    ],
    "animals": [
      {
        "_id": "550632455b692503008e659f",
        "location": [
          35.3343,
          121.2223
        ],
        "owner": {
          "_id": "550648a8fa6b8286095dd5ce",
          "email": "jehan.tremback@gmail.com",
          "name": "jehan",
          "bananaCount": 23
        },
        "health": 9,
        "sprite": "1_charizard",
        "name": "Charizard"
      }
    ],
    "bananaPicks": [
      {
        "bananaTree": {
          "_id": "5399a1ae13a2d700003bded8",
          "location": [
            37.77777,
            122.223333
          ]
        },
        "picker": {
          "_id": "550648a8fa6b8286095dd5ce",
          "email": "jehan.tremback@gmail.com",
          "name": "jehan",
          "bananaCount": 23
        },
        "_id": "550b29c5c9bb1a0b64b7d015",
        "timestamp": 1426794948560
      }
    ]
  }
  ```