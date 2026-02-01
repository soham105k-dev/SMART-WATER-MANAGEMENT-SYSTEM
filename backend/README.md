# Backend API Documentaation

## Base URL
```
http://localhost:6000/api
```
## Response Format
All responses follow this structure:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": { ... }
}
```

# 1.📡 IoT APIs

Send Sensor Data
**POST** `/iot/data`
**Description:** Receives real-time pressure and flow data from IoT sensors installed in water distribution zones
**Request Body:**
```json
{
  "zoneId": "zone123",
  "pressure": 1.4,
  "flow": 21.8
}
```




# 2. Dashboard APIs

## 2.1  Get All Zones
**GET** `/dashboard/zones`

**Description:** Provides a city-level overview of water supply status across all zones.

**Use case :**

` Displays zone list on dashboard`

`Shows real-time supply status`

`Enables color-coded monitoring tiles `

**Internal Processing:**

`Fetches all active zones from the database`

`Calculates current supply status`

`Attaches latest pressure and flow readings`

**Sample Response:**
```json
{
  "success": true,
  "data": [
    {
      "zoneId": "zone1",
      "name": "North Solapur",
      "supply_status": "NORMAL",
      "latestPressure": 2.8,
      "latestFlow": 12.4
    },
    {
      "zoneId": "zone2",
      "name": "MIDC Area",
      "supply_status": "CRITICAL",
      "latestPressure": 1.1,
      "latestFlow": 23.6
    }
  ]
}

```
## 2.2 Get Active Alerts
**GET** `/dashboard/alerts`

**Description:** Fetches all unresolved water supply issues that require immediate attention.

**Use case :**

` Identifies problem zones`

`Displays alert type and severity`

`Helps prioritize emergency response`


**Internal Processing:**

`Fetches alerts with ACTIVE status`

`Sorts alerts by severity and timestamp`

`Maps alerts to zone names`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "alertId": "alert101",
      "zoneName": "Old City",
      "type": "LEAKAGE",
      "severity": "HIGH",
      "message": "Sudden pressure drop with high flow detected",
      "submitted_at": "2026-01-25T10:30:00Z"
    },
    {
      "alertId": "alert102",
      "zoneName": "Railway Area",
      "type": "UNEVEN_DISTRIBUTION",
      "severity": "MEDIUM",
      "message": "Significant pressure imbalance detected"
    }
  ]
}

```

## 2.3 Get Zone Analytics
**GET** `/dashboard/zones/:zoneId`

**Description:** Provides detailed analytics and historical insights for a specific zone.

**Use case :**

`Drill-down analysis for problem zones`

`Triggered when a zone is selected on the dashboard`


**Internal Processing:**

`Fetches zone details`

`Retrieves recent sensor readings`

`Fetches alert history`

`Analyzes trends`

**Response:**
```json

**Response:**
```json
{
  "success": true,
  "data": {
    "zone": {
      "zoneId": "zone2",
      "name": "MIDC Area",
      "supply_status": "CRITICAL"
    },
    "recentReadings": [
      { "pressure": 1.3, "flow": 22.1, "time": "10:00" },
      { "pressure": 1.1, "flow": 23.6, "time": "10:05" }
    ],
    "alerts": [
      {
        "type": "LEAKAGE",
        "severity": "HIGH",
        "status": "ACTIVE"
      }
    ]
  }
}

```



# 3. Error Responses

All API endpoints return consistent error responses:

## 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error: Email is required"
}
```

## 404 Not Found
```json
{
  "success": false,
  "message": "Route not found"
}
```


## 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

# 4. Common Enums

## SEVERITY
```
LOW
MEDIUM
HIGH
```

## STATUS
```
ACTIVE
RESOLVED
```

## TYPE
```
LOW_PRESSURE 
LEAKAGE 
UNEVEN_DISTRIBUTION
```

## SUPPLY_STATUS
```
NORMAL
WARNING
CRITICAL
```

---

# 5. Rate Limiting

The API has rate limiting enabled:
- **Window:** 15 minutes
- **Max Requests:** 100 requests per IP per window

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

