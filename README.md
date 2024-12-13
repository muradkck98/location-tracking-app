This API allows users to log their geographic locations and checks if they enter predefined areas (geofences). If a user enters an area, this event is logged in the database.

---

## Features

1. **Log User Locations**: Accepts user location data (latitude/longitude) and logs them.
2. **Area Management**: Create and list geofences.
3. **Area Entry Logging**: Automatically detects when a user enters an area and logs the event.

---

## API Endpoints

### **1. Add Area**

**Endpoint:** `POST /areas`

**Request Body:**

```json
{
  "name": "Park",
  "polygon": {
    "type": "Polygon",
    "coordinates": [
      [
        [30.0, 10.0],
        [40.0, 40.0],
        [20.0, 40.0],
        [10.0, 20.0],
        [30.0, 10.0]
      ]
    ]
  }
}
```

**Response:**

```json
{
  "message": "Area added."
}
```

### **2. List Areas**

**Endpoint:** `GET /areas`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Park",
    "geom": {
      "type": "Polygon",
      "coordinates": [
        [
          [30.0, 10.0],
          [40.0, 40.0],
          [20.0, 40.0],
          [10.0, 20.0],
          [30.0, 10.0]
        ]
      ]
    }
  }
]
```

### **3. Log Location**

**Endpoint:** `POST /locations`

**Request Body:**

```json
{
  "userId": "user123",
  "point": {
    "type": "Point",
    "coordinates": [35.0, 30.0]
  }
}
```

**Response:**

```json
{
  "message": "Location processed."
}
```

### **4. List Logs**

**Endpoint:** `GET /logs`

**Response:**

```json
[
  {
    "id": 1,
    "userId": "user123",
    "areaId": 1,
    "timestamp": "2024-12-12T12:00:00.000Z"
  }
]
```

---

## Setting Up the Environment

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the `.env` file:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=location-api
   ```

3. Run the PostgreSQL database with PostGIS extension enabled using Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. Start the application:

   ```bash
   npm run start
   ```

---

## Testing the API

You can test the API using tools like Postman or cURL. Below are example steps to verify the functionality:

1. **Create a new area** using the `POST /areas` endpoint.
2. **List existing areas** using the `GET /areas` endpoint.
3. **Log a user location** using the `POST /locations` endpoint. Ensure the location is inside one of the defined areas.
4. **Check the logs** using the `GET /logs` endpoint to verify the area entry is recorded.

---

## Database Access

You can connect to the PostgreSQL database using [DBeaver](https://dbeaver.io/) or any other database client:

- **Host:** `localhost`
- **Port:** `5432`
- **Username:** `postgres`
- **Password:** `postgres`
- **Database:** `location-api`

---

## Additional Notes

- Ensure that the PostGIS extension is enabled for the PostgreSQL database.
- Use proper tools to monitor and scale the application under heavy load.
- Follow best practices for security and API rate limiting in production environments.
