-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2024 at 12:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apiyoucode`
--

-- --------------------------------------------------------

--
-- Table structure for table `associations`
--

CREATE TABLE `associations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `logo` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `illness_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('active','inactive','suspended','deleted') NOT NULL DEFAULT 'active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `region` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `associations`
--

INSERT INTO `associations` (`id`, `name`, `address`, `logo`, `city`, `illness_id`, `status`, `deleted_at`, `created_at`, `updated_at`, `region`) VALUES
(1, 'Association 2', 'casa', '1713430302.jpg', 'Safi', 1, 'active', NULL, '2024-04-18 07:51:42', '2024-05-01 21:13:47', 'Marrakech-Safi'),
(2, 'Association 1', 'rue ishak mosili molay hassan', '1713473751.png', 'El Jadid', 2, 'active', NULL, '2024-04-18 19:55:51', '2024-05-01 21:13:34', 'Casablanca-Settat'),
(4, 'youcode444', 'casa', '1713777853.png', 'Al Aaroui', 1, 'inactive', '2024-04-22 08:33:53', '2024-04-22 08:24:13', '2024-04-22 08:33:53', 'Oriental'),
(5, 'Association 7', 'casa', '1713778481.png', 'Safi', 1, 'active', NULL, '2024-04-22 08:34:41', '2024-05-01 21:13:23', 'Marrakech-Safi'),
(6, 'Association 10', 'Tangier addres', '1714319208.jpg', 'Agadir', 1, 'active', NULL, '2024-04-28 14:46:48', '2024-05-01 21:13:11', 'Souss-Massa'),
(7, 'youcode bo5', 'casa jfjf 521', '1714319230.jpg', 'Tangier', 2, 'deleted', '2024-04-28 14:55:03', '2024-04-28 14:47:10', '2024-04-28 14:55:03', 'Tanger-Tétouan-Al Hoceïma'),
(9, 'youcode bo5jhj', 'casa jfjf 521', '1714319270.jpg', 'Tangier', 2, 'deleted', '2024-04-28 14:55:05', '2024-04-28 14:47:50', '2024-04-28 14:55:05', 'Tanger-Tétouan-Al Hoceïma');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `illnesses`
--

CREATE TABLE `illnesses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `illnesses`
--

INSERT INTO `illnesses` (`id`, `name`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Maladie 1', NULL, '2024-04-18 07:50:43', '2024-04-18 07:50:43'),
(2, 'UpdatMaladie 2', NULL, '2024-04-18 07:50:48', '2024-04-27 10:24:02'),
(3, 'holansd', NULL, '2024-04-27 10:22:25', '2024-04-27 10:22:25'),
(4, 'hwowndjd', NULL, '2024-04-27 10:23:42', '2024-04-27 10:23:51'),
(5, 'dssdfjknhh', NULL, '2024-04-29 08:52:27', '2024-04-30 07:28:10'),
(6, 'Maladie', NULL, '2024-05-01 20:47:46', '2024-05-01 20:47:46'),
(7, 'Maladie 3', NULL, '2024-05-01 20:48:02', '2024-05-01 20:48:02');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2011_03_30_230901_create_illnesses_table', 1),
(2, '2012_03_30_230435_create_associations_table', 1),
(3, '2013_03_30_225611_create_roles_table', 1),
(4, '2014_10_12_000000_create_users_table', 1),
(5, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(6, '2019_08_19_000000_create_failed_jobs_table', 1),
(7, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(8, '2024_04_03_115614_create_patients_table', 1),
(9, '2024_04_26_110320_create_timelines_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `association_id` bigint(20) UNSIGNED DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `current_address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `status` enum('active','inactive','deleted','dead') NOT NULL DEFAULT 'active',
  `date_of_birth` date NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `association_id`, `first_name`, `last_name`, `city`, `current_address`, `phone`, `avatar`, `status`, `date_of_birth`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'Alda', 'Ernser', 'New Brainshire', '15291 Hodkiewicz Burgs Apt. 592\nXzavierburgh, TN 23172', '+1.321.679.6864', '1714140307.png', 'active', '2018-05-16', NULL, '2024-02-27 04:18:08', '2024-04-18 19:59:12'),
(2, 2, 'Ivah', 'Howell', 'South Wyatt', '60876 Reichert Junctions Suite 749\nBahringershire, NH 71799', '463-378-4764', '1714140307.png', 'active', '2018-03-16', NULL, '2024-03-28 17:32:22', '2024-04-18 19:59:12'),
(3, 2, 'Mauricio', 'Heidenreich', 'Lake Ruthieview', '240 Vesta Roads\nErikburgh, IN 35958', '+1.480.214.4027', '1714140307.png', 'active', '2010-08-28', NULL, '2024-04-06 16:10:34', '2024-04-18 19:59:12'),
(4, 2, 'Suzanne', 'Luettgen', 'Mckaylafurt', '199 Felix Motorway\nNew Edwardo, VA 13775-7020', '+1-610-279-9328', '1714140307.png', 'active', '2019-01-18', NULL, '2024-04-16 22:22:22', '2024-04-18 19:59:12'),
(5, 2, 'Jed', 'Haag', 'North Marcelo', '70219 Kutch Station\nNew Anyaside, FL 42020-4779', '1-757-630-3294', '1714140307.png', 'active', '2003-05-11', NULL, '2024-04-07 10:19:35', '2024-04-18 19:59:12'),
(6, 2, 'Corbin', 'Champlin', 'East Harveyview', '729 Genoveva Drive Apt. 971\nEast Mustafa, TX 95583-3033', '256.662.7823', '1714140307.png', 'active', '2012-07-15', NULL, '2024-04-06 12:14:57', '2024-04-18 19:59:12'),
(7, 2, 'Terrill', 'Roob', 'Lake Tomasa', '8541 Clifton Dam Suite 666\nWest Allene, OK 32519-3276', '+16572772301', '1714140307.png', 'active', '2015-03-06', NULL, '2024-04-10 08:30:14', '2024-04-18 19:59:12'),
(8, 2, 'Claude', 'Hoppe', 'New Wilburn', '836 Bednar Falls\nEltabury, MA 41514', '(432) 546-1906', '1714140307.png', 'active', '2006-04-05', NULL, '2024-04-15 05:02:10', '2024-04-18 19:59:12'),
(9, 2, 'Hulda', 'Mueller', 'Connorshire', '8744 Hilda Ridges Apt. 452\nNew Jalonbury, DC 51771', '301-281-4876', '1714140307.png', 'active', '2007-10-11', NULL, '2024-03-07 11:22:29', '2024-04-18 19:59:12'),
(10, 2, 'Theodora', 'O\'Hara', 'New Emiliano', '10970 McGlynn Course Suite 064\nAbbottview, NY 19337-9321', '+15517002811', '1714140307.png', 'active', '2018-07-11', NULL, '2024-03-03 08:05:03', '2024-04-18 19:59:12'),
(11, 2, 'Natasha', 'Pollich', 'North Antonettetown', '1126 Bergstrom Highway\nWest Antonietta, MD 12467-1190', '(731) 351-9729', '1714140307.png', 'active', '2004-12-11', NULL, '2024-03-15 02:43:03', '2024-04-18 19:59:12'),
(12, 2, 'Jevon', 'Leuschke', 'Howellhaven', '55215 Kip Way\nNorth Dan, ID 31425-7952', '716-498-3218', '1714140307.png', 'active', '2018-07-05', NULL, '2024-03-30 05:18:16', '2024-04-18 19:59:12'),
(13, 2, 'Jalon', 'Rice', 'West Helmer', '55988 Arnaldo Center Apt. 462\nPort Enrique, CT 76794-2715', '870-216-3360', '1714140307.png', 'active', '2007-01-26', NULL, '2024-04-09 12:37:31', '2024-04-18 19:59:12'),
(14, 2, 'Quincy', 'Tillman', 'Mabelleborough', '288 Legros Springs Apt. 443\nDooleybury, MS 85053-3474', '+1-909-416-6328', '1714140307.png', 'active', '2003-02-03', NULL, '2024-03-11 02:45:28', '2024-04-18 19:59:12'),
(15, 2, 'Olin', 'Swift', 'Gerlachborough', '9296 Kreiger Turnpike\nBashirianfort, NY 83752-8960', '820.779.1163', '1714140307.png', 'active', '2011-10-30', NULL, '2024-04-13 13:25:32', '2024-04-18 19:59:12'),
(16, 2, 'Magnus', 'Muller', 'Port Grantchester', '85869 Rath Lane Suite 428\nConnellyborough, NH 34454-9359', '+1 (302) 487-0902', '1714140307.png', 'active', '2011-08-11', NULL, '2024-04-10 01:13:23', '2024-04-18 19:59:12'),
(17, 2, 'Kelton', 'Larkin', 'Ryleechester', '5017 Grady Islands\nBinsfort, CT 15258-7077', '(563) 297-9815', '1714140307.png', 'active', '2006-06-28', NULL, '2024-04-15 04:22:16', '2024-04-18 19:59:12'),
(18, 2, 'Alverta', 'Abbott', 'East Careyhaven', '867 Okey Valleys Apt. 975\nNew Tressie, TN 67757-7675', '+1 (402) 834-6655', '1714140307.png', 'active', '2008-06-15', NULL, '2024-03-15 05:45:54', '2024-04-18 19:59:12'),
(19, 2, 'Kirstin', 'Cremin', 'North Taryn', '9897 Schaefer Villages\nSouth Akeemside, NV 46072-6898', '1-605-824-6893', '1714140307.png', 'active', '2018-02-11', NULL, '2024-04-08 00:40:56', '2024-04-18 19:59:12'),
(20, 2, 'Brian', 'White', 'Schowalterberg', '919 O\'Keefe Station\nWest Mckenzie, SC 12279', '908.997.0452', '1714140307.png', 'active', '2007-10-28', NULL, '2024-04-07 11:31:04', '2024-04-18 19:59:12'),
(21, 2, 'Foster', 'Boyer', 'New Wandaburgh', '906 Derek Ranch Suite 425\nLabadiechester, WV 05373-2950', '1-364-979-1829', '1714140307.png', 'active', '2006-11-01', NULL, '2024-04-05 16:47:45', '2024-04-18 19:59:12'),
(22, 2, 'Daisha', 'Cruickshank', 'Kohlerchester', '487 O\'Hara Light Apt. 713\nNorth Melisashire, PA 62844', '1-256-451-1203', '1714140307.png', 'active', '2015-06-06', NULL, '2024-04-09 16:17:29', '2024-04-18 19:59:12'),
(23, 2, 'Joanny', 'Weissnat', 'Champlinport', '454 Queenie Harbor\nColeberg, NM 02447-3767', '661.471.1051', '1714140307.png', 'active', '2014-02-26', NULL, '2024-04-13 00:22:22', '2024-04-18 19:59:12'),
(24, 2, 'Gregg', 'Stracke', 'Krisberg', '9655 Warren Vista\nSouth Eleanorechester, AL 37197-4861', '+1 (325) 908-0386', '1714140307.png', 'active', '2018-02-28', NULL, '2024-04-04 09:58:51', '2024-04-18 19:59:12'),
(25, 2, 'Kristy', 'Koelpin', 'Gerholdside', '577 Santina Flat\nNorth Dawson, IL 67951-6050', '520.729.1946', '1714140307.png', 'active', '2018-07-04', NULL, '2024-03-26 01:20:39', '2024-04-18 19:59:12'),
(26, 2, 'Verona', 'Durgan', 'Bednarstad', '8528 Schuster Gardens\nHamilltown, KS 08345', '+1-931-396-8685', '1714140307.png', 'active', '2016-06-25', NULL, '2024-03-27 11:07:25', '2024-04-18 19:59:12'),
(27, 2, 'Eldridge', 'Kiehn', 'South Keshawnville', '85329 Kasey Roads Suite 657\nBernierland, OR 61720', '+1-520-469-0766', '1714140307.png', 'active', '2019-02-28', NULL, '2024-04-10 06:59:03', '2024-04-18 19:59:12'),
(28, 2, 'Joelle', 'Wuckert', 'East Mireya', '858 Nels Plaza\nNorth Colt, OK 56574-9960', '+1.757.617.5675', '1714140307.png', 'active', '2013-09-10', NULL, '2024-04-10 09:54:20', '2024-04-18 19:59:12'),
(29, 2, 'Brandyn', 'Willms', 'Walshville', '975 Britney Ridge\nDorriston, ND 28496', '+12487558877', '1714140307.png', 'active', '2017-07-15', NULL, '2024-03-12 07:29:05', '2024-04-18 19:59:12'),
(30, 2, 'Emory', 'Christiansen', 'Sawaynburgh', '818 Micheal Estates Apt. 487\nLake Judgeberg, CO 06448-7958', '+1 (585) 618-8340', '1714140307.png', 'active', '2001-07-29', NULL, '2024-03-21 12:20:25', '2024-04-18 19:59:12'),
(31, 2, 'Eldora', 'Dibbert', 'Caesarstad', '2369 Harmony Meadow Apt. 308\nWest Rexfort, TN 82757', '+1 (231) 404-8845', '1714140307.png', 'active', '2008-04-28', NULL, '2024-03-20 12:15:49', '2024-04-18 19:59:12'),
(32, 2, 'Sanford', 'Feil', 'Tonimouth', '6299 Welch Knoll\nOkunevaport, MO 45520-3745', '334-921-8450', '1714140307.png', 'active', '2019-06-25', NULL, '2024-04-15 07:25:56', '2024-04-18 19:59:12'),
(33, 2, 'Aylin', 'Turcotte', 'Elodystad', '472 Ward Walks\nAmirmouth, NJ 72862', '325-863-6790', '1714140307.png', 'active', '2015-08-31', NULL, '2024-03-25 20:21:24', '2024-04-18 19:59:12'),
(34, 2, 'Marco', 'Grimes', 'Funktown', '58865 Gennaro Lane Apt. 598\nPfefferchester, NH 22602', '+1.614.742.9964', '1714140307.png', 'active', '2014-08-23', NULL, '2024-03-30 07:38:22', '2024-04-18 19:59:12'),
(35, 2, 'Edmond', 'Erdman', 'New Cotyfurt', '4290 Juana Cape Suite 128\nHandberg, MD 21276-7774', '+1-620-478-5657', '1714140307.png', 'active', '2018-12-04', NULL, '2024-03-08 22:19:55', '2024-04-18 19:59:12'),
(36, 2, 'Hildegard', 'Hartmann', 'North Baileyside', '54545 Reichel Unions\nFritschton, HI 63288', '+13613237053', '1714140307.png', 'active', '2005-02-26', NULL, '2024-04-13 02:26:25', '2024-04-18 19:59:12'),
(37, 2, 'Rashawn', 'Heller', 'Predovicmouth', '7285 Heller Greens\nBeierfurt, MT 12012-2119', '+1 (680) 918-1360', '1714140307.png', 'active', '2010-03-26', NULL, '2024-03-29 16:45:57', '2024-04-18 19:59:12'),
(38, 2, 'Lindsey', 'Raynor', 'Noahtown', '27835 Vito Bridge Suite 876\nWintheisertown, WV 51071', '+19154647337', '1714140307.png', 'active', '2011-10-26', NULL, '2024-04-06 04:18:37', '2024-04-18 19:59:12'),
(39, 2, 'Colby', 'Rosenbaum', 'South Urielshire', '574 Muller River Apt. 436\nHaagberg, NM 69052', '1-386-291-1458', '1714140307.png', 'active', '2010-02-03', NULL, '2024-04-01 12:05:08', '2024-04-18 19:59:12'),
(40, 2, 'Kellie', 'Kunde', 'Dereckmouth', '5645 Rau Crossing Suite 130\nHettingerburgh, FL 32371', '+1-754-622-9550', '1714140307.png', 'active', '2008-05-14', NULL, '2024-03-10 08:19:22', '2024-04-18 19:59:12'),
(41, 2, 'Frank', 'Schimmel', 'New Demetris', '3991 Buddy Villages\nMichelside, FL 92176', '279.502.3411', '1714140307.png', 'active', '2017-09-02', NULL, '2024-04-10 08:53:31', '2024-04-18 19:59:12'),
(42, 2, 'Fredrick', 'Kling', 'Lake Richmond', '3481 Jaiden Hollow Suite 606\nSouth Garryton, VT 94353-7861', '(559) 398-8750', '1714140307.png', 'active', '2011-08-17', NULL, '2024-04-12 16:05:44', '2024-04-18 19:59:12'),
(43, 2, 'Eino', 'Wyman', 'Cynthiaberg', '2927 Herminio Park Suite 344\nVladimirmouth, DC 78095', '+1 (458) 621-8790', '1714140307.png', 'active', '2012-03-16', NULL, '2024-04-11 17:53:21', '2024-04-18 19:59:12'),
(44, 2, 'Liam', 'Bernier', 'Lake Hansburgh', '84290 Kristy Overpass Suite 844\nNorth Gisselleside, OK 13590-0332', '+1-908-505-6838', '1714140307.png', 'active', '2013-06-19', NULL, '2024-04-14 18:08:23', '2024-04-18 19:59:12'),
(45, 2, 'Sanford', 'Ebert', 'Lake Vanceton', '8898 Cheyenne Row Apt. 311\nRansomside, WA 52487', '+1.201.549.7432', '1714140307.png', 'active', '2015-06-26', NULL, '2024-03-28 19:54:12', '2024-04-18 19:59:12'),
(46, 2, 'Marjolaine', 'Kris', 'Lake Frederickshire', '296 Huels Cliff Apt. 942\nStokeshaven, CA 08789', '(347) 900-3973', '1714140307.png', 'active', '2006-07-30', NULL, '2024-04-11 08:41:11', '2024-04-18 19:59:12'),
(47, 2, 'Althea', 'Terry', 'Ryanstad', '26485 Murray Springs Suite 615\nLake Christianmouth, VT 04668', '+1-872-769-7722', '1714140307.png', 'active', '2014-02-21', NULL, '2024-04-04 20:13:17', '2024-04-18 19:59:12'),
(48, 2, 'Korey', 'Streich', 'South Angelitabury', '552 Yost Passage\nPort Isaias, NY 40319-2697', '+1-732-357-9073', '1714140307.png', 'active', '2007-04-20', NULL, '2024-04-12 12:29:26', '2024-04-18 19:59:12'),
(49, 2, 'Justus', 'Pollich', 'Virgilchester', '2456 Bertram Key Suite 107\nPort Izabellafort, IA 52785', '1-682-588-8788', '1714140307.png', 'active', '2006-12-11', NULL, '2024-04-12 11:26:50', '2024-04-18 19:59:12'),
(50, 2, 'Jakayla', 'Johnson', 'Kreigerfurt', '233 Cara Throughway Apt. 953\nWest Bradford, VT 35361-2962', '+1-781-543-0866', '1714140307.png', 'active', '2005-12-24', NULL, '2024-04-11 17:06:43', '2024-04-18 19:59:12'),
(51, 1, 'User 1', 'user 1', 'Marrakech', 'safi alex morocc', '63790915553', '1714140307.png', 'active', '2024-02-28', NULL, '2024-04-22 08:29:52', '2024-05-01 21:15:39'),
(52, 1, 'user 1', 'nome1', 'Bir Jdid', '2112 ruskjnbkj', '06352528585', '1714140307.png', 'active', '2024-01-02', NULL, '2024-04-26 13:03:41', '2024-04-26 13:03:41'),
(53, 1, 'user 10', 'user 10', 'Agadir', 'kjbjh hbhjb', '063254856555', '1714140307.png', 'deleted', '2018-01-01', '2024-04-27 17:32:46', '2024-04-26 13:05:07', '2024-04-27 17:32:46'),
(54, 1, 'alex', 'bo5j', 'Tangier', 'rue jalo qu malo', '06388888878', '1714466643.jpg', 'active', '2023-11-15', NULL, '2024-04-30 07:44:03', '2024-04-30 07:48:19');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'super admin', NULL, '2024-04-18 07:43:17', '2024-04-18 07:43:17'),
(2, 'admin association', NULL, '2024-04-18 07:43:17', '2024-04-18 07:43:17');

-- --------------------------------------------------------

--
-- Table structure for table `timelines`
--

CREATE TABLE `timelines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `responsable_id` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `file_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timelines`
--

INSERT INTO `timelines` (`id`, `patient_id`, `responsable_id`, `description`, `file_url`, `created_at`, `updated_at`) VALUES
(1, 53, 2, 'Create Profile', NULL, '2024-04-26 13:05:07', '2024-04-26 13:05:07'),
(2, 52, 2, 'tchafa hmdoulah', NULL, '2024-04-26 14:19:29', '2024-04-26 14:19:29'),
(3, 52, 2, 'dakhlt lih cart national', '1714144829.jpg', '2024-04-26 14:20:29', '2024-04-26 14:20:29'),
(4, 52, 2, 'dakhlt lih pdf', '1714144852.pdf', '2024-04-26 14:20:52', '2024-04-26 14:20:52'),
(5, 53, 2, 'wffrom websit', '1714147975.pdf', '2024-04-26 15:12:55', '2024-04-26 15:12:55'),
(6, 53, 2, 'hellon zano', '1714216237.pdf', '2024-04-27 10:10:37', '2024-04-27 10:10:37'),
(7, 53, 2, 'newone', '1714218842.pdf', '2024-04-27 10:54:02', '2024-04-27 10:54:02'),
(8, 53, 2, 'habibi come', '1714219241.pdf', '2024-04-27 11:00:41', '2024-04-27 11:00:41'),
(9, 53, 2, 'new tbib', '1714219894.png', '2024-04-27 11:11:34', '2024-04-27 11:11:34'),
(10, 53, 2, 'letcoode', '1714220597.png', '2024-04-27 11:23:17', '2024-04-27 11:23:17'),
(11, 53, 2, 'heloo new', '1714220659.jpg', '2024-04-27 11:24:19', '2024-04-27 11:24:19'),
(12, 53, 2, 'hello', '1714220789.jpg', '2024-04-27 11:26:29', '2024-04-27 11:26:29'),
(13, 53, 2, 'hbbfhjf', '1714220934.pdf', '2024-04-27 11:28:54', '2024-04-27 11:28:54'),
(14, 53, 2, 'malik', '1714220994.jpg', '2024-04-27 11:29:54', '2024-04-27 11:29:54'),
(15, 53, 2, 'kjjk', '1714221040.jpg', '2024-04-27 11:30:40', '2024-04-27 11:30:40'),
(16, 53, 2, 'jhbjhbscs', '1714221581.pdf', '2024-04-27 11:39:41', '2024-04-27 11:39:41'),
(17, 53, 2, 'jhbjhbscsm', '1714221646.pdf', '2024-04-27 11:40:46', '2024-04-27 11:40:46'),
(18, 53, 2, 'zahya', '1714221658.png', '2024-04-27 11:40:58', '2024-04-27 11:40:58'),
(19, 53, 2, 'slue', '1714221961.pdf', '2024-04-27 11:46:01', '2024-04-27 11:46:01'),
(20, 53, 2, 'helo use loaidng', '1714222226.jpg', '2024-04-27 11:50:26', '2024-04-27 11:50:26'),
(21, 53, 2, 'holdj loading new', '1714222494.png', '2024-04-27 11:54:54', '2024-04-27 11:54:54'),
(22, 53, 2, 'new fkjnds', '1714222948.jpg', '2024-04-27 12:02:28', '2024-04-27 12:02:28'),
(23, 53, 2, 'kjbkh', '1714223214.jpg', '2024-04-27 12:06:54', '2024-04-27 12:06:54'),
(24, 53, 2, 'skeletcon loaidng', '1714223818.pdf', '2024-04-27 12:16:58', '2024-04-27 12:16:58'),
(25, 52, 2, 'dakhlt lih pdf', NULL, '2024-04-27 12:42:06', '2024-04-27 12:42:06'),
(26, 53, 2, 'no file', NULL, '2024-04-27 12:51:50', '2024-04-27 12:51:50'),
(27, 53, 2, 'hello new', NULL, '2024-04-27 13:53:03', '2024-04-27 13:53:03'),
(28, 54, 2, 'Create Profile', NULL, '2024-04-30 07:44:03', '2024-04-30 07:44:03'),
(29, 54, 2, 'zwinhjbjh', '1714467060.png', '2024-04-30 07:51:00', '2024-04-30 07:51:00'),
(30, 51, 2, 'you can add you comments here with files', '1714601770.png', '2024-05-01 21:16:10', '2024-05-01 21:16:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `association_id` bigint(20) UNSIGNED DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `last_online_at` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive','suspended','deleted') NOT NULL DEFAULT 'active',
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role_id`, `association_id`, `phone`, `last_online_at`, `status`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'asosiat yassine', 'hello@yassine.info', '2024-04-19 07:47:45', '$2y$10$yuyal79htCTHsJNX2MGwRuO.2/rv7jRC.C/fFTFgF8EQraLyCLTt.', 1, NULL, NULL, NULL, 'active', '8Vwv3IxldAMOEw6ppds0zW5auX56fMkGjRoMRpMJ7niSM1exmze2VQ5dXqjE', NULL, '2024-04-18 07:46:25', '2024-04-19 08:04:30'),
(2, 'admin test99', 'sisko4me@gmail.com', '2024-04-03 10:26:55', '$2y$10$ohm9.DnP6leOfQn1m3xxhekCIncBJNB5gCDDWLq14hA/d7.5SK4Ne', 2, 1, NULL, NULL, 'active', 'q48IBhIQiI4k9JkNgJeg6SdcyfSu7oRyShRA54817lYzZs0uX8cIaFBK2cWU', NULL, '2024-04-18 07:51:42', '2024-04-30 09:47:41'),
(3, 'admin usaMakor', 'sisko9me@gmail.com', NULL, '$2y$10$wk.dIFAaE/0LVq1IQ2cQk.7ryJ72k3iyzXUtINFPZpbEFooP5nz86', 2, 2, NULL, NULL, 'inactive', NULL, NULL, '2024-04-18 19:55:52', '2024-04-19 09:59:53'),
(4, 'admin youcode444', 'sisko9ddme@gmail.com', NULL, '$2y$10$A7YoiM6nJnnRhCix51OLhOlTldVlSfpd4bHJ1Q0Yq7j91HkA4qMoS', 2, 4, NULL, NULL, 'inactive', NULL, NULL, '2024-04-22 08:24:13', '2024-04-22 08:33:53'),
(5, 'admin SuperAssociation', 'sisko4dev@gmail.com', NULL, '$2y$10$V8sh9xR7jxYJd9JL2scgX.gjVsmifmfFshPdwhZ8o1sYn09uLbXSW', 2, 5, NULL, NULL, 'active', NULL, NULL, '2024-04-22 08:34:41', '2024-04-22 08:34:41'),
(6, 'yassine', 'yasskkinejjjj1lk@gmail.com', NULL, '$2y$10$45ZmOVXRWsER0RM.qdhzUeifypfW5SYgzpjURJ/fovAHPEt4.DYa2', 2, 6, NULL, NULL, 'active', NULL, NULL, '2024-04-28 14:46:48', '2024-04-28 14:46:48'),
(7, 'admin youcode bo5', 'sisko9mdmsnje@gmail.com', NULL, '$2y$10$A.Nn4XQrYQtEkR/gMl7kZOHWI/UvIfarPaAqGeOKqmNKs2QAd7Ula', 2, 7, NULL, NULL, 'inactive', NULL, NULL, '2024-04-28 14:47:10', '2024-04-28 14:55:03'),
(8, 'admin youcode bo5jhj', 'sisko9mddjfmsnje@gmail.com', NULL, '$2y$10$c42M1zSg/s8XVnOoH1Bx0.6aZBJxXXgPuL345eJ1n01Q1j8OR9gl2', 2, 9, NULL, NULL, 'inactive', NULL, NULL, '2024-04-28 14:47:50', '2024-04-28 14:55:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `associations`
--
ALTER TABLE `associations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `associations_name_unique` (`name`),
  ADD KEY `associations_illness_id_foreign` (`illness_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `illnesses`
--
ALTER TABLE `illnesses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `illnesses_name_unique` (`name`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patients_association_id_foreign` (`association_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timelines`
--
ALTER TABLE `timelines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `timelines_patient_id_foreign` (`patient_id`),
  ADD KEY `timelines_responsable_id_foreign` (`responsable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`),
  ADD KEY `users_association_id_foreign` (`association_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `associations`
--
ALTER TABLE `associations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `illnesses`
--
ALTER TABLE `illnesses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `timelines`
--
ALTER TABLE `timelines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `associations`
--
ALTER TABLE `associations`
  ADD CONSTRAINT `associations_illness_id_foreign` FOREIGN KEY (`illness_id`) REFERENCES `illnesses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_association_id_foreign` FOREIGN KEY (`association_id`) REFERENCES `associations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `timelines`
--
ALTER TABLE `timelines`
  ADD CONSTRAINT `timelines_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timelines_responsable_id_foreign` FOREIGN KEY (`responsable_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_association_id_foreign` FOREIGN KEY (`association_id`) REFERENCES `associations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
