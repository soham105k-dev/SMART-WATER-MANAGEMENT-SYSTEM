🌐 API Documentation
Base URL
http://localhost:6000/api

Standard Response Format
{
  "success": true,
  "message": "Response message",
  "data": {}
}

📡 IoT APIs
Send Sensor Data

POST /iot/data

{
  "zoneId": "zone123",
  "pressure": 1.4,
  "flow": 21.8
}

1️⃣ Get All Zones
GET /dashboard/zones
📌 Purpose

This API provides a city-level overview of water supply status across all zones.

🧠 Why it is needed

Officials need to see which zones are normal and which are problematic

Used to display:

Zone list

Supply status

Color-coded dashboard tiles

🔁 What it does internally

Fetches all active zones from DB

Calculates current supply_status for each zone

Attaches latest pressure & flow readings

📤 Sample Response
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

🧑‍⚖️  explanation line

“This API gives a real-time overview of water supply across all zones.”

2️⃣ Get Active Alerts
GET /dashboard/alerts
📌 Purpose

This API fetches all unresolved water supply issues.

🧠 Why it is needed

Officials should immediately see:

Where the problem is

What kind of problem it is

How severe it is

🔁 What it does internally

Fetches alerts where status = ACTIVE

Sorts by severity and time

Maps alerts to zone names

📤 Sample Response
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

🧑‍⚖️  explanation line

“This API shows all active water supply problems that require attention.”

3️⃣ Get Zone Analytics
GET /dashboard/zones/:zoneId
📌 Purpose

This API provides detailed analytics for a specific zone.

🧠 Why it is needed

Helps officials drill down into a problematic zone

Used when someone clicks on a zone tile

🔁 What it does internally

Fetches zone details

Fetches recent sensor data

Fetches alert history for that zone

Calculates trends

📤 Sample Response
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

🧑‍⚖️ explanation line

“This endpoint gives detailed insights into a specific zone’s water supply behavior.”