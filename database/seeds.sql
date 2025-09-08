 
-- ===========================
-- USERS
-- ===========================
INSERT INTO users (first_name, last_name, email, password_hash, phone, date_of_birth, passport_number)
VALUES
('Naveen', 'Reddy', 'naveen@example.com', 'hashed_pass_1', '+919876543210', '1999-05-15', 'P1234567'),
('Priya', 'Sharma', 'priya@example.com', 'hashed_pass_2', '+918765432109', '2000-09-20', NULL);

-- ===========================
-- AIRLINES
-- ===========================
INSERT INTO airlines (name, iata_code) VALUES
('Air India', 'AI'),
('IndiGo', '6E'),
('Vistara', 'UK');

-- ===========================
-- AIRPORTS
-- ===========================
INSERT INTO airports (code, name, city, country) VALUES
('DEL', 'Indira Gandhi International Airport', 'New Delhi', 'India'),
('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', 'India'),
('BLR', 'Kempegowda International Airport', 'Bangalore', 'India');

-- ===========================
-- FLIGHTS
-- ===========================
INSERT INTO flights (flight_number, airline_id, source_airport, destination_airport, departure_time, arrival_time, aircraft_type, base_price, total_seats, available_seats)
VALUES
('AI101', 1, 1, 2, '2025-09-15 09:00:00', '2025-09-15 11:00:00', 'Airbus A320', 5500.00, 180, 175),
('6E202', 2, 2, 3, '2025-09-18 14:30:00', '2025-09-18 16:00:00', 'ATR 72', 4000.00, 220, 210),
('UK303', 3, 1, 3, '2025-09-20 07:45:00', '2025-09-20 10:15:00', 'Boeing 737', 6200.00, 200, 198);

-- ===========================
-- HOTELS
-- ===========================
INSERT INTO hotels (name, city, star_rating, amenities, check_in_time, check_out_time)
VALUES
('Taj Palace', 'New Delhi', 5, '["WiFi","Pool","Spa","Restaurant"]', '14:00', '12:00'),
('Oberoi Mumbai', 'Mumbai', 5, '["WiFi","Gym","Bar","Airport Shuttle"]', '13:00', '11:00'),
('ITC Gardenia', 'Bangalore', 4, '["WiFi","Pool","Restaurant"]', '14:00', '12:00');

-- ===========================
-- HOTEL ROOMS
-- ===========================
INSERT INTO hotel_rooms (hotel_id, room_type, price_per_night, max_occupancy, available_quantity, amenities)
VALUES
(1, 'Deluxe Room', 8000.00, 2, 10, '["WiFi","TV","Mini Bar"]'),
(1, 'Suite', 15000.00, 4, 5, '["WiFi","TV","Jacuzzi"]'),
(2, 'Executive Room', 12000.00, 2, 8, '["WiFi","Sea View","TV"]'),
(3, 'Standard Room', 6000.00, 2, 15, '["WiFi","TV"]');

-- ===========================
-- HOLIDAY PACKAGES
-- ===========================
INSERT INTO holiday_packages (name, description, duration_days, duration_nights, destinations, inclusions, price_per_person, min_group_size, max_group_size)
VALUES
('Golden Triangle Tour', 'Delhi-Agra-Jaipur cultural trip', 5, 4, '["Delhi","Agra","Jaipur"]', '["Meals","Sightseeing","Transfers"]', 25000.00, 2, 30),
('Goa Beach Retreat', 'Relax at Goa beaches with parties', 4, 3, '["Goa"]', '["Meals","Beach Parties","Airport Transfers"]', 18000.00, 2, 20);

-- ===========================
-- FLIGHT BOOKINGS
-- ===========================
INSERT INTO flight_bookings (user_id, flight_id, booking_reference, journey_date, travel_class, total_fare, status)
VALUES
(1, 1, 'FB12345', '2025-09-15', 'economy', 11000.00, 'confirmed'),
(2, 2, 'FB67890', '2025-09-18', 'business', 8000.00, 'pending');

-- ===========================
-- HOTEL BOOKINGS
-- ===========================
INSERT INTO hotel_bookings (user_id, hotel_id, room_id, booking_reference, check_in_date, check_out_date, rooms_booked, total_amount, status)
VALUES
(1, 1, 1, 'HB12345', '2025-09-20', '2025-09-23', 2, 24000.00, 'confirmed'),
(2, 3, 4, 'HB67890', '2025-10-01', '2025-10-05', 1, 24000.00, 'pending');

-- ===========================
-- PACKAGE BOOKINGS
-- ===========================
INSERT INTO package_bookings (user_id, package_id, booking_reference, start_date, travelers, total_cost, status)
VALUES
(1, 1, 'PB12345', '2025-11-01', 2, 50000.00, 'confirmed'),
(2, 2, 'PB67890', '2025-12-15', 4, 72000.00, 'pending');

-- ===========================
-- TRAVELERS
-- ===========================
INSERT INTO travelers (booking_type, booking_id, first_name, last_name, date_of_birth, passport_number)
VALUES
('flight', 1, 'Naveen', 'Reddy', '1999-05-15', 'P1234567'),
('flight', 1, 'Priya', 'Sharma', '2000-09-20', NULL),
('package', 1, 'Naveen', 'Reddy', '1999-05-15', 'P1234567'),
('package', 1, 'Priya', 'Sharma', '2000-09-20', NULL);

-- ===========================
-- PAYMENTS
-- ===========================
INSERT INTO payments (booking_type, booking_id, amount, payment_method, status)
VALUES
('flight', 1, 11000.00, 'Credit Card', 'success'),
('hotel', 1, 24000.00, 'UPI', 'success'),
('package', 2, 72000.00, 'Net Banking', 'pending');
