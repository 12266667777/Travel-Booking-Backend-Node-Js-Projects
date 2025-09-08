-- ==============================
-- 1. USERS
-- ==============================
CREATE TABLE users (
    user_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name     VARCHAR(50) NOT NULL,
    last_name      VARCHAR(50) NOT NULL,
    email          VARCHAR(100) UNIQUE NOT NULL,
    password_hash  VARCHAR(255) NOT NULL,
    phone          VARCHAR(20),
    date_of_birth  DATE,
    passport_number VARCHAR(20),   -- optional
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- 2. AIRLINES
-- ==============================
CREATE TABLE airlines (
    airline_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name           VARCHAR(100) NOT NULL,
    iata_code      VARCHAR(5) UNIQUE NOT NULL -- e.g., AI, 6E
);

-- ==============================
-- 3. AIRPORTS
-- ==============================
CREATE TABLE airports (
    airport_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    code           VARCHAR(10) UNIQUE NOT NULL, -- DEL, BOM
    name           VARCHAR(100) NOT NULL,
    city           VARCHAR(100) NOT NULL,
    country        VARCHAR(100) NOT NULL
);

-- ==============================
-- 4. FLIGHTS
-- ==============================
CREATE TABLE flights (
    flight_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_number  VARCHAR(20) UNIQUE NOT NULL,
    airline_id     INTEGER NOT NULL REFERENCES airlines(airline_id),
    source_airport INTEGER NOT NULL REFERENCES airports(airport_id),
    destination_airport INTEGER NOT NULL REFERENCES airports(airport_id),
    departure_time TIMESTAMP NOT NULL,
    arrival_time   TIMESTAMP NOT NULL,
    aircraft_type  VARCHAR(50),
    base_price     DECIMAL(10,2) NOT NULL,
    total_seats    INT NOT NULL,
    available_seats INT NOT NULL
);

-- ==============================
-- 5. HOTELS
-- ==============================
CREATE TABLE hotels (
    hotel_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name           VARCHAR(100) NOT NULL,
    city           VARCHAR(100) NOT NULL,
    star_rating    INT,
    amenities      TEXT,   -- JSON array
    check_in_time  TIME,
    check_out_time TIME
);

-- ==============================
-- 6. HOTEL ROOMS
-- ==============================
CREATE TABLE hotel_rooms (
    room_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    hotel_id       INTEGER NOT NULL REFERENCES hotels(hotel_id),
    room_type      VARCHAR(50) NOT NULL,  -- Single, Double, Suite
    price_per_night DECIMAL(10,2) NOT NULL,
    max_occupancy  INT NOT NULL,
    available_quantity INT NOT NULL,
    amenities      TEXT -- JSON array
);

-- ==============================
-- 7. HOLIDAY PACKAGES
-- ==============================
CREATE TABLE holiday_packages (
    package_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name           VARCHAR(100) NOT NULL,
    description    TEXT,
    duration_days  INT NOT NULL,
    duration_nights INT NOT NULL,
    destinations   TEXT,   -- JSON array
    inclusions     TEXT,   -- JSON array
    price_per_person DECIMAL(10,2) NOT NULL,
    min_group_size INT,
    max_group_size INT
);

-- ==============================
-- 8. FLIGHT BOOKINGS
-- ==============================
CREATE TABLE flight_bookings (
    booking_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL REFERENCES users(user_id),
    flight_id      INTEGER NOT NULL REFERENCES flights(flight_id),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    journey_date   DATE NOT NULL,
    travel_class   VARCHAR(20) NOT NULL, -- economy/business/first
    total_fare     DECIMAL(10,2) NOT NULL,
    status         VARCHAR(20) DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- 9. HOTEL BOOKINGS
-- ==============================
CREATE TABLE hotel_bookings (
    booking_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL REFERENCES users(user_id),
    hotel_id       INTEGER NOT NULL REFERENCES hotels(hotel_id),
    room_id        INTEGER NOT NULL REFERENCES hotel_rooms(room_id),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    check_in_date  DATE NOT NULL,
    check_out_date DATE NOT NULL,
    rooms_booked   INT NOT NULL,
    total_amount   DECIMAL(10,2) NOT NULL,
    status         VARCHAR(20) DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- 10. PACKAGE BOOKINGS
-- ==============================
CREATE TABLE package_bookings (
    booking_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL REFERENCES users(user_id),
    package_id     INTEGER NOT NULL REFERENCES holiday_packages(package_id),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    start_date     DATE NOT NULL,
    travelers      INT NOT NULL,
    total_cost     DECIMAL(10,2) NOT NULL,
    status         VARCHAR(20) DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- 11. PASSENGERS / TRAVELERS
-- ==============================
CREATE TABLE travelers (
    traveler_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_type   VARCHAR(20) NOT NULL CHECK (booking_type IN ('flight','package')),
    booking_id     INTEGER NOT NULL,  -- points to flight_bookings OR package_bookings
    first_name     VARCHAR(50) NOT NULL,
    last_name      VARCHAR(50) NOT NULL,
    date_of_birth  DATE NOT NULL,
    passport_number VARCHAR(20)
);

-- ==============================
-- 12. PAYMENTS
-- ==============================
CREATE TABLE payments (
    payment_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_type   VARCHAR(20) NOT NULL CHECK (booking_type IN ('flight','hotel','package')),
    booking_id     INTEGER NOT NULL, -- references booking depending on type
    amount         DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status         VARCHAR(20) DEFAULT 'pending',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
