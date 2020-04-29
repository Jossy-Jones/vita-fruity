-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2020 at 10:10 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vita_fruity`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `all_orders`
--

CREATE TABLE `all_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `add_info` varchar(255) DEFAULT NULL,
  `is_not_pip` int(11) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `pickup_time` varchar(255) DEFAULT NULL,
  `is_paid` int(11) DEFAULT NULL,
  `is_delivered` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  `main_img` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `delivered_orders`
--

CREATE TABLE `delivered_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `add_info` varchar(255) DEFAULT NULL,
  `is_not_pip` int(11) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `pickup_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `paid_orders`
--

CREATE TABLE `paid_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `txn_ref` varchar(255) DEFAULT NULL,
  `add_info` varchar(255) DEFAULT NULL,
  `is_not_pip` int(11) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `pickup_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  `is_available` int(11) DEFAULT NULL,
  `main_img` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `category_id`, `time_added`, `time_updated`, `is_available`, `main_img`, `slug`) VALUES
(1, 'Onion Salad with avocado', 4200, 'Very nice onion salad', 1, 1585503686244, 1585529710042, NULL, 'vitafruity-2eb999b5-0ab8-4b44-9933-3727aa29fd14.jpeg', 'Onion-Salad-with-avocado'),
(2, 'Fiesta Wrap and Mini Parfait ', 2800, 'Fresh energizer wrap ', 1, 1585859779937, NULL, NULL, 'vitafruity-59c3e676-f02f-45a9-9339-b2176c61be05.jpeg', 'fiesta-wrap-and-mini-parfait'),
(3, 'Fried yam chips and chicken wings', 2250, 'Delicious fried yam chips and chicken wings for a simple meal', 2, 1586460930135, NULL, NULL, 'vitafruity-eb2125a4-7cef-4f57-afd3-f93a229166c4.jpeg', 'fried-yam-chips-and-chicken-wings'),
(4, 'French fries and ketchup', 1450, 'Instant french fries and ketchup', 2, 1586461540027, NULL, NULL, 'vitafruity-079be735-7a6d-48ac-b7a8-96abc7237ec9.jpeg', 'french-fries-and-ketchup'),
(5, 'Banga soup and starch', 900, 'Banga soup with fresh fish and starch for a slightly heavy meal.', 3, 1586462284888, NULL, NULL, 'vitafruity-e380af19-88d1-4890-96be-6f044ae4989c.jpeg', 'banga-soup-and-starch'),
(6, 'African Jollof rice and chicken', 1550, 'A plate of jollof rice and chicken', 3, 1586463361901, 1586463426462, NULL, 'vitafruity-3aceb44b-47d9-4fe2-b2cd-0a096013f0c8.jpeg', 'african-jollof-rice-and-chicken');

-- --------------------------------------------------------

--
-- Table structure for table `product_orders`
--

CREATE TABLE `product_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sub_products`
--

CREATE TABLE `sub_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  `is_available` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `all_orders`
--
ALTER TABLE `all_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uri` (`slug`);

--
-- Indexes for table `delivered_orders`
--
ALTER TABLE `delivered_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paid_orders`
--
ALTER TABLE `paid_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uri` (`slug`);

--
-- Indexes for table `product_orders`
--
ALTER TABLE `product_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_products`
--
ALTER TABLE `sub_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uri` (`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `all_orders`
--
ALTER TABLE `all_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `delivered_orders`
--
ALTER TABLE `delivered_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `paid_orders`
--
ALTER TABLE `paid_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_orders`
--
ALTER TABLE `product_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sub_products`
--
ALTER TABLE `sub_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
