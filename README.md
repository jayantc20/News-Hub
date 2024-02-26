# News Hub with Node.js and Express.js, and TypeScript

This project implements a News Application RESTful API using Node.js and Express.js, and TypeScript incorporating user registration, login, and news preferences. It utilizes bcrypt and JWT for password hashing and token-based authentication. The application fetches news articles from external APIs based on user preferences and includes features like error handling, input validation, and optional extensions such as caching and user interactions with articles.

## Getting Started

### Prerequisites

- Node.js version 14 or later
- npm or yarn package manager
- setup config folder

config/development.json

```{
  "PORT": 3000,
  "NODE_ENV": "development",
  "SECRET_KEY": <SECRET_KEY>,
  "NEWS_API_KEY": <NEWS_API_KEY>,
  "DEBUG": true,
  "ExpiresIn": "7d"
}
```


### Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/jayantc20/News-Hub.git
    cd News-Hub
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the server:**

    ```bash
    npm run start:dev
    ```

4. **Test the API using Postman or a similar tool:** [Pending]

    ```bash
    npm run test
    ```

## API Endpoints

| Endpoint                                | Method | Description                                                    |
| ----------------------------------------| ------ | ---------------------------------------------------------------|
| /api/v1/users/register                  | POST   | Register a new user.                                           |
| /api/v1/users/login                     | POST   | Log in a user.                                                 |
| /api/v1/preferences                     | GET    | Retrieve the news preferences for the logged-in user.          |
| /api/v1//preferences                    | PUT    | Update the news preferences for the logged-in user.            |
| /api/v1/news                            | GET    | Fetch news articles based on the logged-in user's preferences. |
| /api/v1/news/:id/read                   | POST   | Mark a news article as read.                                   |
| /api/v1/news/:id/favorite               | POST   | Mark a news article as a favorite.                             |
| /api/v1/news/read                       | GET    | Retrieve all read news articles.                               |
| /api/v1/news/favorites                  | GET    | Retrieve all favorite news articles.                           |
| /api/v1/news/search/:keyword            | GET    | Search for news articles based on keywords.                    |

## Optional Extensions

- **Caching Mechanism:** Implement a caching mechanism to store news articles and reduce the number of calls to external news APIs. Use async/await and Promises to handle cache updates and retrievals.
- **User Interactions:**
    - **Mark as Read:** POST /news/:id/read - Mark a news article as read.
    - **Mark as Favorite:** POST /news/:id/favorite - Mark a news article as a favorite.
    - **Retrieve Read Articles:** GET /news/read - Retrieve all read news articles.
    - **Retrieve Favorite Articles:** GET /news/favorites - Retrieve all favorite news articles.
- **Background Updates:** Implement a mechanism to periodically update the cached news articles in the background, simulating a real-time news aggregator. [Pending]

## Postman Collection

You can import and test the APIs using the [Postman Collection](https://github.com/jayantc20/News-Hub/blob/main/News-Hub.postman_collection.json).

### Importing the Collection in Postman

1. Download the Postman Collection File.
2. Open Postman.
3. Click on "Import" at the top-left corner.
4. Choose the downloaded collection file.
5. The collection should now be available in your Postman workspace.

## Contributing

If you would like to contribute to the project, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
