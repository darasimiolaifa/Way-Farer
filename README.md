[![Build Status](https://travis-ci.org/darasimiolaifa/Way-Farer.svg?branch=develop)](https://travis-ci.org/darasimiolaifa/Way-Farer)
[![Coverage Status](https://coveralls.io/repos/github/darasimiolaifa/Way-Farer/badge.svg?branch=develop)](https://coveralls.io/github/darasimiolaifa/Way-Farer?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/de3bc966d85dc4a85794/maintainability)](https://codeclimate.com/github/darasimiolaifa/Way-Farer/maintainability)

# Way-Farer
A public bus transport booking application.

## Project Overview
Travelling is a vital part of the human experience, and it is a sector that impacts the economy of any group of people. From reasons that range from career, visit and luxury, to vacation, tourism etc, the reasons for the travel notwithstanding, travelling is such a huge part of the human experience, and the logistics behind making arrangements for them is a big issue.

An application that makes it easy to handle booking and arranging for trips is going to make a big difference in lessoning the frictions and making the travel experience more enjoyable and worth it.

Way Farer is such an application, that makes it easy to make bookings for trips and overall trip management.

### Required Features
1. Users can sign up.
2. Users can login.
3. Admin can create a trip.
4. Admin can cancel a trip.
5. Admin and Users can see all trips.
6. Users can book a seat on a trip.
7. Admin can see all bookings, while Users can see all bookings that belong to them.
8. Users can delete their bookings

### Optional Features
1. Users can filter trips by origin.
2. Users can filter trips by destination.
3. Users can specify seat number while booking
4. Users can filter trips by date ranges.

### Pivotal Tracker

To make the project easy to manage and track, we are using the Pivotal Tracker tool. The board for the stories are located here. [Project Story Board](https://www.pivotaltracker.com/n/projects/2360297)

### API Endpoints.
##### Base URL 
The project API base is hosted here on [Heroku](https://darasimi-wayfarer.herokuapp.com/)

S/N  | Verb   | Endpoint                   | Description                 |
----:|--------|----------------------------|-----------------------------|
  1  | Post   | /api/v1/auth/signup        | Create a user account       |
  2  | Post   | /api/v1/auth/login         | Sign in a user              |
  3  | Get    | /api/v1/users              | Get all users               |
  4  | Get    | /api/v1/users/userId       | Get a specific user         |
  5  | Patch  | /api/v1/users/userId       | Edit a specific user        |
  6  | Delete | /api/v1/users/userId       | Delete a specific user      |
  7  | Get    | /api/v1/trips              | Get all trips               |
  8  | Get    | /api/v1/trips?origin       | Filter trips by origin      |
  9  | Get    | /api/v1/trips?destination  | Filter trips by destination |
  10 | Get    | /api/v1/trips?from         | Filter trips by start date  |
  11 | Get    | /api/v1/trips?to           | Filter trips by end date    |
  12 | Get    | /api/v1/trips/tripId       | Get a specific trip         |
  13 | Patch  | /api/v1/trips/tripId       | Cancel a specific trip      |
  14 | Patch  | /api/v1/trips/tripId/edit  | Edit a specific trip        |
  15 | Delete | /api/v1/trips/tripId       | Delete a specific trip      |
  16 | Post   | /api/v1/buses              | Create buses                |
  17 | Get    | /api/v1/buses              | Get all buses               |
  18 | Get    | /api/v1/buses/busId        | Get a specific bus          |
  19 | Patch  | /api/v1/buses/busId        | Edit a specific bus         |
  20 | Delete | /api/v1/buses/busId        | Delete a specific bus       | 
  21 | Post   | /api/v1/bookings           | Create bookings             |
  22 | Get    | /api/v1/bookings           | Get all bookings            |
  23 | Get    | /api/v1/bookings/bookingId | Get a specific booking      |
  24 | Patch  | /api/v1/bookings/bookingId | Edit a specific booking     |
  25 | Delete | /api/v1/bookings/bookingId | Delete a specific booking   |


### API Documentation :file_folder: :point_left:
The API documentation page can be found here [Documentation](https://darasimi-wayfarer.herokuapp.com/api/v1/docs)


### Author
Darasimi Olaifa

### Acknowledgements
* Andela