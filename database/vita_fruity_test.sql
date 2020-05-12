-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2020 at 05:22 PM
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

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`) VALUES
(1, 'ovie', 'ovie@abc.com', '$2b$11$TeAvhw.fpvapiAdB/NQw1.jOZAyEo9.7ScI3vrFUbCpMX1fn2Li8O');

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
  `is_delivered` varchar(255) DEFAULT NULL,
  `zone_name` varchar(255) DEFAULT NULL,
  `zone_desc` varchar(255) DEFAULT NULL,
  `zone_price` int(255) DEFAULT NULL
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

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `time_added`, `time_updated`, `main_img`, `slug`) VALUES
(1, 'Smoothies', 1588538360392, NULL, 'vitafruity-ceea2646-7d17-443f-a31a-ee21b685a7da.jpeg', 'smoothies'),
(2, 'Sandwich', 1588538621753, NULL, 'vitafruity-fb6ac672-c097-40cf-b91f-e875e897445d.jpeg', 'sandwich'),
(3, 'Fruit Packs', 1588538742615, NULL, 'vitafruity-02170360-41ba-4a02-90ad-223c590919bf.jpeg', 'fruit-packs'),
(4, 'Wraps', 1588538809503, NULL, 'vitafruity-b105b8cb-12b0-482b-9d3b-e8b4b8c1e217.jpeg', 'wraps'),
(5, 'Juice ', 1588541297119, NULL, 'vitafruity-42a3ef8c-8abe-424b-9cdc-c95dfd2e1e94.jpeg', 'juice'),
(6, 'Others', 1588542698730, NULL, 'vitafruity-55106bf1-4af8-408f-941a-0189f6e7cc05.jpeg', 'others'),
(7, 'Parfait', 1588543431958, NULL, 'vitafruity-456840df-ef89-4a69-a9f3-53b590f7b68b.jpeg', 'parfait'),
(8, 'Salad', 1588544588129, NULL, 'vitafruity-67192c52-2776-492b-b451-116139729120.jpeg', 'salad');

-- --------------------------------------------------------

--
-- Table structure for table `delivered_orders`
--

CREATE TABLE `delivered_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `extras`
--

CREATE TABLE `extras` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `extras`
--

INSERT INTO `extras` (`id`, `name`, `price`, `category_id`) VALUES
(1, 'Egg', 100, 2),
(2, 'Avocado', 100, 2),
(3, 'Yoghurt', 300, 1),
(4, 'Celery', 200, 1),
(5, 'Parsley', 200, 1),
(6, 'Lime', 100, 1),
(7, 'Kale', 300, 1),
(8, 'Granula', 300, 1),
(9, 'Blueberry', 400, 1),
(10, 'Parsley', 200, 1),
(11, 'Ginger', 100, 1),
(12, 'Mint', 200, 1),
(13, 'Lemon', 200, 1),
(14, 'Spinach', 300, 1),
(15, 'Nuts', 200, 1),
(16, 'Strawberry', 400, 1),
(17, 'Kiwi', 400, 1),
(18, 'Extra Kiwi', 200, 7),
(19, 'Nuts', 400, 7),
(20, 'Grapes', 200, 7),
(21, 'Plum', 200, 7),
(22, 'Coconut flakes', 100, 7),
(23, 'Top up yoghurt', 500, 7),
(24, 'Extra Strawberry', 200, 7),
(25, 'Extra Granula', 300, 7),
(26, 'Egg', 100, 8),
(27, 'Grapes', 300, 8),
(28, 'Chicken', 100, 8),
(29, 'Avocado', 500, 8),
(30, 'Shrimp', 700, 8),
(31, 'Salad dressing', 100, 8),
(32, 'Sweetcorn', 200, 8),
(33, 'Peppered steak', 500, 8),
(34, 'Fish/Tuna', 500, 8);

-- --------------------------------------------------------

--
-- Table structure for table `extra_orders`
--

CREATE TABLE `extra_orders` (
  `id` int(11) NOT NULL,
  `product_order_key` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `time_added` bigint(11) DEFAULT NULL
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
  `pickup_time` varchar(255) DEFAULT NULL,
  `zone_name` varchar(255) DEFAULT NULL,
  `zone_desc` varchar(255) DEFAULT NULL,
  `zone_price` int(11) DEFAULT NULL
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
(1, 'Sweet Veggies Salad', NULL, 'Avocado, grapes, sweet-corn,cabbage,carrot,beetroot', 8, 1588936407164, NULL, NULL, 'vitafruity-1370457c-2bde-4c42-b677-95e5a3e0a193.jpeg', 'sweet-veggies-salad'),
(2, 'Apple and Kidney Beans Salad', NULL, 'Kidney-beans,green-apple,cucumber,carrot,sweet-pepper-mix,cabbage,lettuce', 8, 1588936562380, NULL, NULL, 'vitafruity-dc88f35a-84f2-46be-aa6f-33b31d807fb5.jpeg', 'apple-and-kidney-beans-salad'),
(3, 'Avo Chicken Salad', NULL, 'Chicken, avocados, eggs, tomatoes, cabbage, lettuce', 8, 1588936648256, NULL, NULL, 'vitafruity-18278118-e7a2-438a-998e-62db3058a60c.jpeg', 'avo-chicken-salad'),
(4, 'Sweet and Spicy Chicken Salad', NULL, 'Spicy chicken, grapes, sweet-corn, carrot, cabbage and lettuce.', 8, 1588936708264, NULL, NULL, 'vitafruity-9156dfe2-db59-4558-a6de-6d85ab2f5963.jpeg', 'sweet-and-spicy-chicken-salad'),
(5, 'Peppered Steak Salad', NULL, 'Peppered-steak, eggs, black-pepper, tomatoes, sweet-pepper-mix, cabbage, carrot, cucumber and lettuce.', 8, 1588936786385, NULL, NULL, 'vitafruity-fd05df5f-b192-429f-97d6-2f1d68df8dce.jpeg', 'peppered-steak-salad'),
(6, 'Avo Spicy Chicken Salad', NULL, 'Spicy chicken, avocado, eggs, cabbage, carrot, lettuce.', 8, 1588936847119, NULL, NULL, 'vitafruity-9687f578-856e-41cc-9d90-68ca8cecbe7a.jpeg', 'avo-spicy-chicken-salad'),
(7, 'Avo Tuna Salad', NULL, 'Tuna, Avocado, Sweet pepper mix, sweet-corn, cabbage, carrot, lettuce', 8, 1588936909790, NULL, NULL, 'vitafruity-22f0c506-3d4a-4682-8e3b-227c8fbf5adb.jpeg', 'avo-tuna-salad'),
(8, 'Sea Food Pastiche', NULL, 'Croaker, tuna, shrimps, oranges, spring onions, carrot, red-cabbage, pepper mix and lettuce.', 8, 1588937040717, NULL, NULL, 'vitafruity-a3ea6d79-6519-4265-90f6-a2988f5dcd3c.jpeg', 'sea-food-pastiche'),
(9, 'Tuna Special Salad', NULL, 'Tuna, egg, sweet-pepper, sweet corn, cabbage, carrot, grape, lettuce.', 8, 1588937103432, NULL, NULL, 'vitafruity-bbee9a8c-32be-4e2a-ab43-b423e4256af2.jpeg', 'tuna-special-salad'),
(10, 'Spicy Shrimp Avocado Salad', NULL, 'Spicy shrimp, avocado, tomatoes, eggs, cucumber, carrot and lettuce.', 8, 1588937163576, NULL, NULL, 'vitafruity-5726f0a6-c7da-45fa-addd-0e32ba0ecb09.jpeg', 'spicy-shrimp-avocado-salad'),
(11, 'Crunchy Chicken Shrimp Salad', NULL, 'Avocado, grape, sweet corn, cabbage, carrot, beetroot, lettuce, chicken, shrimp and cashew-nut.', 8, 1588937249411, NULL, NULL, 'vitafruity-536bd864-1241-4b46-949e-ae5264e0415d.jpeg', 'crunchy-chicken-shrimp-salad'),
(12, 'Fruit Cups', NULL, 'Apple, pineapple, watermelon, kiwi or berry or grape.', 3, 1588938734013, NULL, NULL, 'vitafruity-1e22889c-a902-4705-8df2-054a1fbc56e1.jpeg', 'fruit-cups'),
(13, 'Fruit Splash', NULL, 'Apple, pineapple, watermelon, coconut, kiwi or berry or grape', 3, 1588938787801, NULL, NULL, 'vitafruity-3ed1fa7a-51cb-477c-810c-60a7efaae565.jpeg', 'fruit-splash'),
(14, 'Fruit Splash (Value Pack)', NULL, 'Apple, pineapple, watermelon, coconut, kiwi or berry or grape.', 3, 1588938864462, NULL, NULL, 'vitafruity-54a97e3c-1877-4a54-a698-8869b0193beb.jpeg', 'fruit-splash-value-pack'),
(15, 'Chicken and Egg', NULL, 'Coleslaw, lettuce, cucumber, tomatoes, egg and chicken.', 2, 1588939214901, NULL, NULL, 'vitafruity-df52788d-e607-4de4-8407-c49dd13f0e98.jpeg', 'chicken-and-egg'),
(16, 'Chicken and Avocado', NULL, 'Coleslaw, lettuce, tomatoes, avocado, chicken and cucumber.', 2, 1588939269802, NULL, NULL, 'vitafruity-22912ea5-e02f-4ccd-bce7-76e3974a290b.jpeg', 'chicken-and-avocado'),
(17, 'Egg and Avocado', NULL, 'Coleslaw, lettuce, tomatoes, avocado, egg and cucumber.', 2, 1588939312135, NULL, NULL, 'vitafruity-8e16669f-895b-46d2-aafc-88c394c1dc13.jpeg', 'egg-and-avocado'),
(18, 'Tuna and Egg', NULL, 'Coleslaw, lettuce, tomatoes, tuna, egg and cucumber.', 2, 1588939349415, NULL, NULL, 'vitafruity-51183889-403f-4728-8852-d86551add288.jpeg', 'tuna-and-egg'),
(19, 'Mini', NULL, 'Berries, apple, grapes, kiwi, banana, yoghurt, granola', 7, 1588939834567, NULL, NULL, 'vitafruity-487853d9-5c40-4816-9df7-96e20fc76f52.jpeg', 'mini'),
(20, 'Regular', NULL, 'Berries, apple, grapes, kiwi, banana, yoghurt, granola.', 7, 1588939883278, NULL, NULL, 'vitafruity-52ef3660-351d-4991-b3eb-6f160d5271b5.jpeg', 'regular'),
(21, 'Parfait bowl (500ml)', NULL, 'Berries, apple. grapes, kiwi, banana, yoghurt, granola.', 7, 1588939956163, NULL, NULL, 'vitafruity-e84f4a33-ce2d-446f-b6b9-0d293f6e96e2.jpeg', 'parfait-bowl-500ml'),
(22, 'Parfait Bowl (1 ltr)', NULL, 'Berries, apple, grapes, kiwi, banana, yoghurt, granola.', 7, 1588940045941, NULL, NULL, 'vitafruity-ad945a1e-0b63-4a28-96c2-a9183cdb26f8.jpeg', 'parfait-bowl-1-ltr'),
(23, 'Fresh Fiesta Chicken', NULL, 'Chicken, carrot, lettuce, cabbage, potatoes and fiesta dressing.', 4, 1588940217132, NULL, NULL, 'vitafruity-7ca0a5c7-dfa6-4df9-85bc-73aeca67edd2.jpeg', 'fresh-fiesta-chicken'),
(24, 'Fresh Fiesta Beef', NULL, 'Beef, carrot, lettuce, cabbage, potatoes, and fiesta dressing.', 4, 1588940288564, NULL, NULL, 'vitafruity-66aed5dc-61a5-4cc7-bb77-2656cc7db45a.jpeg', 'fresh-fiesta-beef'),
(25, 'Fresh Fiesta Combo', NULL, 'Chicken, beef, avocado, carrot, lettuce, cabbage, potatoes and fiesta dressing.', 4, 1588940340694, NULL, NULL, 'vitafruity-3f65e9cc-f67c-48c0-9480-cad3b77a1be8.jpeg', 'fresh-fiesta-combo'),
(26, 'Yoghurt (500ml)', NULL, 'N/A', 6, 1588940520425, NULL, NULL, 'vitafruity-c414fed3-b30c-4b96-898b-e86bb7434986.jpeg', 'yoghurt-500ml'),
(27, 'Yoghurt (1 ltr)', NULL, 'N/A', 6, 1588940589277, NULL, NULL, 'vitafruity-02ff7a5a-0378-40d8-adb2-033db1a91fff.jpeg', 'yoghurt-1-ltr'),
(28, 'Coconut Flakes (Funmi Coconuts)', NULL, 'N/A', 6, 1588940624170, NULL, NULL, 'vitafruity-8ac064bd-a875-4d17-81d0-e299ec880ef6.jpeg', 'coconut-flakes-funmi-coconuts'),
(29, 'Coconut Flakes (Vita Fruity)', NULL, 'N/A', 6, 1588940653931, NULL, NULL, 'vitafruity-a4f55878-6127-4149-89d0-848d6770fdf5.jpeg', 'coconut-flakes-vita-fruity'),
(30, 'Granula (350g)', NULL, 'N/A', 6, 1588940691462, NULL, NULL, 'vitafruity-ab96049a-3be3-439e-bd3c-89d2da4148d4.jpeg', 'granula-350g'),
(31, 'Tiger Nut Juice ', NULL, 'N/A', 5, 1588941548901, NULL, NULL, 'vitafruity-acb49a2d-fa82-4085-be95-696ea93ceb2e.jpeg', 'tiger-nut-juice'),
(32, 'Watermelon & Pineapple  ', NULL, 'N/A', 5, 1588941638358, NULL, NULL, 'vitafruity-dbefd444-7f7d-4c57-809f-f7a7cdab9f7b.jpeg', 'watermelon-and-pineapple'),
(33, 'Watermelon and Cucumber', NULL, 'N/A', 5, 1588941680888, NULL, NULL, 'vitafruity-0c7541bc-7254-41b6-9b7f-25068d6caccc.jpeg', 'watermelon-and-cucumber'),
(34, 'Orange & Pineapple ', NULL, 'N/A', 5, 1588941778440, NULL, NULL, 'vitafruity-0759aee7-e079-4895-94b5-ad8668a325bc.jpeg', 'orange-and-pineapple'),
(35, 'Glow Up', NULL, 'Pineapple, Apple, Lemon, Lime.', 5, 1588941892056, NULL, NULL, 'vitafruity-a6c8f1f9-6dbc-48da-848d-8ff8f20c3b43.jpeg', 'glow-up'),
(36, 'Pink Crush ', NULL, 'Watermelon, Orange, Pineapple, Lemon ', 5, 1588941974937, NULL, NULL, 'vitafruity-8ac96321-86ba-4cac-ae2e-e093707db7c3.jpeg', 'pink-crush'),
(37, 'Lemon Zinger ', NULL, 'Lemon, Apple, Pineapple, ginger ', 5, 1588942079851, NULL, NULL, 'vitafruity-e3da4674-77e7-44a7-8557-2306cb67092f.jpeg', 'lemon-zinger'),
(38, 'Green Lee', NULL, 'Spinach, Lemon, Cucumber, Pear, Apple', 5, 1588942572240, NULL, NULL, 'vitafruity-250bd10d-a440-469f-b87d-26fd254890b0.jpeg', 'green-lee'),
(39, 'Naked ', NULL, '\r\nCucumber, Pineapple, Kale, Lemon ', 5, 1588942663711, NULL, NULL, 'vitafruity-2a694b73-893f-4e44-979f-73956f5d64c0.jpeg', 'naked'),
(40, 'Golden Wonder ', NULL, 'Orange, Carrot, Ginger, Cinnamon ', 5, 1588942875206, NULL, NULL, 'vitafruity-e501e280-475d-4fc1-85c9-303d6417cc22.jpeg', 'golden-wonder'),
(41, 'Melon Meet ', NULL, 'Apple, Beetroot, Grape, Mint, Watermelon. ', 5, 1588943855587, NULL, NULL, 'vitafruity-f528b5e1-2de6-4a39-a6d1-bc3cfc5e50ae.jpeg', 'melon-meet'),
(42, 'Sunshine ', NULL, 'Apple, Lemon, Orange.', 5, 1588943939454, NULL, NULL, 'vitafruity-34e7248d-0b95-4b37-aae2-22a78958a62a.jpeg', 'sunshine'),
(43, 'Easy Green ', NULL, 'Celery, Cucumber, Lettuce Mint, Orange ', 5, 1588944186820, NULL, NULL, 'vitafruity-18d2453c-cb09-4602-9d03-2e5e4024d7a8.jpeg', 'easy-green'),
(44, 'Sweet Beet', NULL, 'Apple, beet, carrot', 5, 1588945469473, NULL, NULL, 'vitafruity-ad2544fb-bb23-4100-b554-ca67bd0e12aa.jpeg', 'sweet-beet'),
(45, 'Carrot Cooler', NULL, 'Carrot, pineapple, cucumber', 5, 1588945510413, NULL, NULL, 'vitafruity-c995611d-eaf3-4390-bbc8-af3b9d0673e2.jpeg', 'carrot-cooler'),
(46, 'Aqua Splash', NULL, 'Cucumber, celery, pineapple, mint and apple.', 5, 1588945557803, NULL, NULL, 'vitafruity-6060c2ff-e1e7-494d-95d1-964964f1d9af.jpeg', 'aqua-splash'),
(47, 'Greeensvive', NULL, 'Lettuce, cucumber, pineapple, mint leave.', 5, 1588945606351, NULL, NULL, 'vitafruity-3c014a81-8e2a-4940-a1f2-d47e1ac00c71.jpeg', 'greeensvive'),
(48, 'Pick me  up', NULL, 'Ginger, pineapple, pumpkin leaves', 5, 1588945640053, NULL, NULL, 'vitafruity-82555f91-e758-40f8-a609-6cfe44a5c23e.jpeg', 'pick-me-up'),
(49, 'Delight Twist', NULL, 'Pineapple, apple, lemon and lime.', 5, 1588946324188, NULL, NULL, 'vitafruity-6ebbeb0d-ca4a-4c23-95d4-70b81dea92f7.jpeg', 'delight-twist'),
(50, 'Day Booster', NULL, 'apple, banana, pineapple, beetroot', 1, 1588946935926, NULL, NULL, 'vitafruity-080c466e-79ee-4cad-90a4-0f95f8ad8f83.jpeg', 'day-booster'),
(51, 'Day Starter', NULL, 'Banana,pineapple,sweet-pear,watermelon', 1, 1588947139778, NULL, NULL, 'vitafruity-c6821779-14a0-4669-84e3-4aaa4ec784a7.jpeg', 'day-starter'),
(52, 'Avocado Relish', NULL, 'Avocado,pineapple juice,sweet-pear,ginger', 1, 1588947274633, NULL, NULL, 'vitafruity-2e7fb8e2-1a1b-435b-b798-7f04c945a517.jpeg', 'avocado-relish'),
(53, 'Sunrise', NULL, 'papaya,pineapple,ginger', 1, 1588947342728, NULL, NULL, 'vitafruity-c044d91a-e611-48a4-ac88-fad141d95aa2.jpeg', 'sunrise'),
(54, 'Breakfast Bloom', NULL, 'Banana,sweat pear,pineapple,yoghurt', 1, 1588947559450, NULL, NULL, 'vitafruity-affba576-97e5-449e-b17f-eaad6a32114e.jpeg', 'breakfast-bloom'),
(55, 'Berry Twist', NULL, 'Strawberry,pineapple,banana', 1, 1588947601770, NULL, NULL, 'vitafruity-88732422-9fd5-4a06-8b95-99550952ba64.jpeg', 'berry-twist'),
(56, 'Berry Charge', NULL, 'Banana,dates,stawberry,watermelon', 1, 1588947732772, NULL, NULL, 'vitafruity-87ca970c-12a9-400a-984a-b7bf758a2176.jpeg', 'berry-charge'),
(57, 'Exotic Twist', NULL, 'Grapes,sweet pear,banana,pineapple', 1, 1588947791113, NULL, NULL, 'vitafruity-bfd43620-23b3-4b0f-9917-c10aea61bd3c.jpeg', 'exotic-twist'),
(58, 'Nutty Nutty', NULL, 'Apple,banana,cashew nut,ginger', 1, 1588947856290, NULL, NULL, 'vitafruity-9ab10485-3dbb-4afa-a781-73ae639ce73e.jpeg', 'nutty-nutty'),
(59, 'Punched Up', NULL, 'banana,kiwi,pineapple,orange juice', 1, 1588947910577, NULL, NULL, 'vitafruity-f98b4926-71b2-437e-b403-72f5f5f4802c.jpeg', 'punched-up'),
(60, 'Ample Amy', NULL, 'Apple,cucumber,kiwi,pumpkin leave', 1, 1588947965084, NULL, NULL, 'vitafruity-8987039c-7b44-4fa7-b696-1e5d6eacd461.jpeg', 'ample-amy'),
(61, 'Mully Berry (seasonal)', NULL, 'mulberry,strawberry,banana,yoghurt', 1, 1588948256261, NULL, NULL, 'vitafruity-47368828-fdfa-40d4-8f9a-788c9183b910.jpeg', 'mully-berry-seasonal'),
(62, 'Banny Coco', NULL, 'Banana,coconut,pineapple', 1, 1588948293899, NULL, NULL, 'vitafruity-c1a1a80b-d688-4249-b2d5-8d3dab2966d7.jpeg', 'banny-coco'),
(63, 'Effecty', NULL, 'Banana,ginger,oats,pear', 1, 1588948408423, NULL, NULL, 'vitafruity-ca20f535-903a-4f68-9d64-6f167e73c0cb.jpeg', 'effecty'),
(64, 'Meanest', NULL, 'Banana,cucumber,lettuce,spinach', 1, 1588948480012, NULL, NULL, 'vitafruity-9ebe1c12-cf11-4482-8c34-0853c1e191ac.jpeg', 'meanest'),
(65, 'Mango Delight (seasonal) ', NULL, 'Mango,apple,pineapple,watermelon', 1, 1588948555793, NULL, NULL, 'vitafruity-28a53d0b-0628-46f0-b075-9c5d38da1803.jpeg', 'mango-delight-seasonal'),
(66, 'Man-Cum (seasonal)', NULL, 'Mango,pineapple,orange,banana', 1, 1588948610392, NULL, NULL, 'vitafruity-a6df747c-0901-4d70-a77f-9cc834400976.jpeg', 'man-cum-seasonal'),
(67, 'Cherry Bliss(seasonal)', NULL, 'Yoghurt, pineapple, red apple, agbalumo,banana', 1, 1588948696707, NULL, NULL, 'vitafruity-60e4455c-44ab-4d11-b735-258212322e41.jpeg', 'cherry-blissseasonal'),
(68, 'Cherry Delight (seasonal)', NULL, 'pineapple, banana,red apple, agbalumo', 1, 1588948805009, NULL, NULL, 'vitafruity-259e8e31-e0da-4d15-ac63-59010ddb0b16.jpeg', 'cherry-delight-seasonal'),
(69, 'Creamy Delight ', NULL, 'Green apple,spinach,avocado,pineapple', 1, 1588949004954, NULL, NULL, 'vitafruity-acb22f71-6a61-48bc-8e6e-7193f9dfeb91.jpeg', 'creamy-delight'),
(70, 'Cleanse', NULL, 'Kale,banana,celery,sweet pear,lemon', 1, 1588949044473, NULL, NULL, 'vitafruity-e29af55c-f437-4385-8eb5-550a35cd591c.jpeg', 'cleanse');

-- --------------------------------------------------------

--
-- Table structure for table `product_orders`
--

CREATE TABLE `product_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `product_order_key` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `sub_product_id` int(11) DEFAULT NULL,
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
  `is_available` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_products`
--

INSERT INTO `sub_products` (`id`, `name`, `price`, `description`, `product_id`, `time_added`, `time_updated`, `is_available`) VALUES
(1, '*', 2500, NULL, 11, 1588937471979, NULL, NULL),
(4, '*', 2500, NULL, 10, 1588937758599, NULL, NULL),
(5, '*', 2500, NULL, 9, 1588937790453, NULL, NULL),
(6, '*', 2500, NULL, 8, 1588937812028, NULL, NULL),
(7, '*', 2200, NULL, 7, 1588937897214, NULL, NULL),
(8, '*', 2200, NULL, 6, 1588937922878, NULL, NULL),
(9, '*', 2200, NULL, 5, 1588937939167, NULL, NULL),
(10, '*', 2200, NULL, 4, 1588937968365, NULL, NULL),
(11, '*', 2200, NULL, 3, 1588937984172, NULL, NULL),
(12, '*', 2000, NULL, 2, 1588938002913, NULL, NULL),
(13, '*', 2000, NULL, 1, 1588938020331, NULL, NULL),
(14, '*', 1600, NULL, 14, 1588938881516, NULL, NULL),
(15, '*', 1200, NULL, 13, 1588938898632, NULL, NULL),
(16, '*', 1000, NULL, 12, 1588938914286, NULL, NULL),
(17, '*', 800, NULL, 18, 1588939618230, NULL, NULL),
(18, '*', 800, NULL, 17, 1588939633501, NULL, NULL),
(19, '*', 800, NULL, 16, 1588939653628, NULL, NULL),
(20, '*', 800, NULL, 15, 1588939666042, NULL, NULL),
(21, '*', 3500, NULL, 22, 1588940062976, NULL, NULL),
(22, '*', 1800, NULL, 21, 1588940084689, NULL, NULL),
(23, '*', 1500, NULL, 20, 1588940104137, NULL, NULL),
(24, '*', 1000, NULL, 19, 1588940118802, NULL, NULL),
(25, '*', 1500, NULL, 23, 1588940355855, NULL, NULL),
(26, '*', 1500, NULL, 24, 1588940371341, NULL, NULL),
(27, '*', 1800, NULL, 25, 1588940390257, NULL, NULL),
(28, '*', 2000, NULL, 26, 1588940748302, NULL, NULL),
(29, '*', 3000, NULL, 27, 1588940767961, NULL, NULL),
(30, '*', 600, NULL, 28, 1588940786694, NULL, NULL),
(31, '*', 1000, NULL, 29, 1588940803158, NULL, NULL),
(32, '*', 1000, NULL, 30, 1588940855486, NULL, NULL),
(33, '500ml', 1200, NULL, 48, 1588945669064, NULL, NULL),
(34, '750ml', 2000, NULL, 48, 1588945689370, NULL, NULL),
(35, '500ml', 1200, NULL, 47, 1588945713920, NULL, NULL),
(36, '750ml', 2000, NULL, 47, 1588945734836, NULL, NULL),
(37, '500ml', 1200, NULL, 46, 1588945764014, NULL, NULL),
(38, '750ml', 2000, NULL, 46, 1588945778563, NULL, NULL),
(39, '500ml', 1200, NULL, 45, 1588945810982, NULL, NULL),
(40, '750ml', 2000, NULL, 45, 1588945823479, NULL, NULL),
(41, '500ml', 1200, NULL, 44, 1588945843455, NULL, NULL),
(42, '750ml', 2000, NULL, 44, 1588945857859, NULL, NULL),
(43, '500ml', 1200, NULL, 43, 1588945881077, NULL, NULL),
(44, '750ml', 2000, NULL, 43, 1588945896142, NULL, NULL),
(45, '500ml', 1200, NULL, 42, 1588945914626, NULL, NULL),
(46, '750ml', 2000, NULL, 42, 1588945925837, NULL, NULL),
(47, '500ml', 1200, NULL, 41, 1588945948057, NULL, NULL),
(48, '750ml', 2000, NULL, 41, 1588945958862, NULL, NULL),
(49, '500ml', 1200, NULL, 40, 1588945975703, NULL, NULL),
(50, '750ml', 2000, NULL, 40, 1588945984685, NULL, NULL),
(51, '500ml', 1200, NULL, 39, 1588946002785, NULL, NULL),
(52, '750ml', 2000, NULL, 39, 1588946014704, NULL, NULL),
(53, '500ml', 1200, NULL, 38, 1588946033850, NULL, NULL),
(54, '750ml', 2000, NULL, 38, 1588946043403, NULL, NULL),
(55, '500ml', 1200, NULL, 37, 1588946060152, NULL, NULL),
(56, '750ml', 2000, NULL, 37, 1588946073069, NULL, NULL),
(57, '500ml', 1200, NULL, 36, 1588946088299, NULL, NULL),
(58, '750ml', 2000, NULL, 36, 1588946096633, NULL, NULL),
(59, '500ml', 1200, NULL, 35, 1588946150232, NULL, NULL),
(60, '750ml', 2000, NULL, 35, 1588946160859, NULL, NULL),
(61, '500ml', 1000, NULL, 34, 1588946181567, NULL, NULL),
(62, '750ml', 1800, NULL, 34, 1588946191027, NULL, NULL),
(63, '500ml', 1000, NULL, 33, 1588946210857, NULL, NULL),
(64, '750ml', 1800, NULL, 33, 1588946221809, NULL, NULL),
(65, '500ml', 1000, NULL, 32, 1588946241972, NULL, NULL),
(66, '750ml', 1800, NULL, 32, 1588946254798, NULL, NULL),
(67, '500ml', 1000, NULL, 31, 1588946272889, NULL, NULL),
(68, '750ml', 1800, NULL, 31, 1588946285222, NULL, NULL),
(69, '500ml', 1200, NULL, 49, 1588946341935, NULL, NULL),
(70, '750ml', 2000, NULL, 49, 1588946352669, NULL, NULL),
(71, '500ml', 1500, NULL, 70, 1588949384584, NULL, NULL),
(72, '750ml', 2300, NULL, 70, 1588949393504, NULL, NULL),
(73, '500ml', 1500, NULL, 69, 1588949408037, NULL, NULL),
(74, '750ml', 2300, NULL, 69, 1588949417514, NULL, NULL),
(75, '500ml', 1500, NULL, 68, 1588949433319, NULL, NULL),
(76, '750ml', 2300, NULL, 68, 1588949442358, NULL, NULL),
(77, '500ml', 1500, NULL, 67, 1588949458727, NULL, NULL),
(78, '750ml', 2300, NULL, 67, 1588949468174, NULL, NULL),
(79, '500ml', 1500, NULL, 66, 1588949489205, NULL, NULL),
(80, '750ml', 2300, NULL, 66, 1588949498282, NULL, NULL),
(81, '500ml', 1500, NULL, 65, 1588949512659, NULL, NULL),
(82, '750ml', 2300, NULL, 65, 1588949521588, NULL, NULL),
(83, '500ml', 1500, NULL, 64, 1588949538212, NULL, NULL),
(84, '750ml', 2300, NULL, 64, 1588949548995, NULL, NULL),
(85, '500ml', 1500, NULL, 63, 1588949570362, NULL, NULL),
(86, '750ml', 2300, NULL, 63, 1588949579719, NULL, NULL),
(87, '500ml', 1500, NULL, 62, 1588949599311, NULL, NULL),
(88, '750ml', 2300, NULL, 62, 1588949609042, NULL, NULL),
(89, '500ml', 1500, NULL, 61, 1588949635356, NULL, NULL),
(90, '750ml', 2300, NULL, 61, 1588949644867, NULL, NULL),
(91, '500ml', 1500, NULL, 60, 1588949696506, NULL, NULL),
(92, '750ml', 2300, NULL, 60, 1588949705334, NULL, NULL),
(93, '500ml', 1500, NULL, 59, 1588949721886, NULL, NULL),
(94, '750ml', 2300, NULL, 59, 1588949732882, NULL, NULL),
(95, '500ml', 1500, NULL, 58, 1588949750548, NULL, NULL),
(96, '750ml', 2300, NULL, 58, 1588949760243, NULL, NULL),
(97, '500ml', 1500, NULL, 57, 1588949778852, NULL, NULL),
(98, '750ml', 2300, NULL, 57, 1588949787740, NULL, NULL),
(99, '500ml', 1500, NULL, 56, 1588949805284, NULL, NULL),
(100, '750ml', 2300, NULL, 56, 1588949814148, NULL, NULL),
(101, '500ml', 1500, NULL, 55, 1588949836693, NULL, NULL),
(102, '750ml', 2300, NULL, 55, 1588949845815, NULL, NULL),
(103, '500ml', 1500, NULL, 54, 1588949868337, NULL, NULL),
(104, '750ml', 2300, NULL, 54, 1588949881930, NULL, NULL),
(105, '500ml', 1500, NULL, 53, 1588949900304, NULL, NULL),
(106, '750ml', 2300, NULL, 53, 1588949911954, NULL, NULL),
(107, '500ml', 1500, NULL, 52, 1588949931284, NULL, NULL),
(108, '750ml', 2300, NULL, 52, 1588949940435, NULL, NULL),
(109, '500ml', 1500, NULL, 51, 1588949956060, NULL, NULL),
(110, '750ml', 2300, NULL, 51, 1588949965523, NULL, NULL),
(111, '500ml', 1500, NULL, 50, 1588949983545, NULL, NULL),
(112, '750ml', 2300, NULL, 50, 1588949992974, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE `zones` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`id`, `name`, `description`, `price`, `time_added`, `time_updated`) VALUES
(1, 'Zone 1', 'PTI Road | Jakpa Junction', 500, 1589282433175, NULL),
(2, 'Zone 2', 'Airport Road | Estate Roundabout', 700, 1589282433175, NULL),
(3, 'Zone 3', 'Udu Road', 800, 1589282433175, NULL);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_key` (`order_key`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_key` (`order_key`);

--
-- Indexes for table `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_orders`
--
ALTER TABLE `extra_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paid_orders`
--
ALTER TABLE `paid_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_key` (`order_key`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `delivered_orders`
--
ALTER TABLE `delivered_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extras`
--
ALTER TABLE `extras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `extra_orders`
--
ALTER TABLE `extra_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `paid_orders`
--
ALTER TABLE `paid_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `product_orders`
--
ALTER TABLE `product_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `sub_products`
--
ALTER TABLE `sub_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
