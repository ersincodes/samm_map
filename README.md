![Samm_Leaflet](https://github.com/ersincodes/samm_map/assets/115782012/15d2a1b4-26ae-4843-b5a6-ccc3f48a0601)

㆒ Project Overview ㆒

This repository contains the source code for a web application that allows users to save and manage GPS coordinates on a map using the Leaflet.js library. This application has a frontend for user interaction and a separate backend for data management. 

Backend - Express.js
Frontend - React & Typescript

✧ Features

✓ Interactive map displayed using Leaflet.js on the left side of the page.

✓ Ability to save the GPS coordinate information of the map's center point along with the current date by pressing the "Save Location" button.

✓ A list of saved locations on the right side of the page, with each entry containing GPS coordinates and the timestamp of when it was saved.

✓ Clickable list items that place a marker on the map at the corresponding coordinates.

✓ Deletion capability for each entry in the location list.

✓ Persistent storage of location data, ensuring that the list is repopulated upon page refresh.

✓ A "Download Data" button that allows users to download the saved coordinates as a .json file.

✓ Separate development of the frontend and backend, allowing for modular updates and maintenance.

✧ <u>How to Use</u>

🗺️ **<u>View the Map</u>**: Open the application, and you will see an interactive map on the left side of the page.

💾 **Save a Location**: Click the "Save Location" button to save the current center of the map along with the date and time.

📋 **Location List**: View the saved locations listed on the right side of the page.

🧷 **Interact with List**: Click on any listed location to see a marker appear on the map at the relevant coordinate.

🗑️ **Delete Locations**: Use the "Delete" button next to any location to remove it from the list.

📌 **Download Data**: Click the "Download Data" button to save your list of locations to your local device as a .json file.

♻️ **Refresh Persistence**: Locations will be retained and displayed even after refreshing the page.

✧ Installation

Clone this repository to your local machine using the following command:

```sh
git clone [repository-url]
```

### Frontend Setup

Navigate to the frontend directory and install dependencies:

```sh
cd frontend
npm install
```

Run the frontend server:

```sh
npm start
```

### Backend Setup

Navigate to the backend directory and install dependencies:

```sh
cd backend
npm install
```

Run the backend server:

```sh
npm run server
```


👩🏻‍🚀 Contact

Ersin Bahar - ersinbaharr@gmail.com - www.ersinbahar.com
