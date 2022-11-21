-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2022 at 07:41 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `banned`
--

CREATE TABLE `banned` (
  `b_id` int(11) NOT NULL,
  `b_whobanned` varchar(100) NOT NULL,
  `b_whoisbanned` varchar(100) NOT NULL,
  `b_bandate` varchar(100) NOT NULL,
  `b_reason` varchar(100) NOT NULL,
  `b_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bannedhistory`
--

CREATE TABLE `bannedhistory` (
  `bh_id` int(30) NOT NULL,
  `bh_whoisbanned` varchar(100) NOT NULL,
  `bh_whobanned` varchar(100) NOT NULL,
  `bh_whounbanned` varchar(100) NOT NULL,
  `bh_reasonbanned` varchar(100) NOT NULL,
  `bh_banduration` varchar(100) NOT NULL,
  `bh_dateofban` varchar(100) NOT NULL,
  `bh_dateofunban` varchar(100) NOT NULL,
  `bh_dateofstoring` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bannedhistory`
--

INSERT INTO `bannedhistory` (`bh_id`, `bh_whoisbanned`, `bh_whobanned`, `bh_whounbanned`, `bh_reasonbanned`, `bh_banduration`, `bh_dateofban`, `bh_dateofunban`, `bh_dateofstoring`) VALUES
(1, '', 'xeqtr', '', 'debil', '', '2022-10-20 02:49:02.363', '', '2022-10-20 00:49:02'),
(2, '', '', 'xeqtr', 'debil', '', '2022-10-20 02:49:02.000', '2022-10-20 03:20:34.353', '2022-10-20 01:20:34'),
(3, '', '', 'xeqtr', 'debil', '', '2022-10-20 02:49:02.000', '2022-10-20 03:22:00.762', '2022-10-20 01:22:00'),
(4, 'test123', 'xeqtr', 'xeqtr', 'You ruled', '', '2022-10-20 03:39:05.000', '2022-10-20 03:39:19.079', '2022-10-20 01:39:19'),
(5, 'test123', 'xeqtr', 'xeqtr', 'You ruled', '', '2022-10-20 03:39:05.000', '2022-10-20 03:40:06.558', '2022-10-20 01:40:06'),
(6, 'test123', 'xeqtr', 'xeqtr', 'acab', '', '2022-10-20 03:40:41.000', '2022-10-20 03:40:52.832', '2022-10-20 01:40:52'),
(7, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 04:05:00.000', '2022-10-20 05:38:09.593', '2022-10-20 03:38:09'),
(8, 'test123', 'xeqtr', 'xeqtr', 'deb', '12/11/2022', '2022-10-20 05:45:50.000', '2022-10-20 05:46:14.162', '2022-10-20 03:46:14'),
(9, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 05:46:22.000', '2022-10-20 05:47:56.197', '2022-10-20 03:47:56'),
(10, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 05:48:17.000', '2022-10-20 16:58:18.774', '2022-10-20 14:58:18'),
(11, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 16:59:14.000', '2022-10-20 17:06:50.376', '2022-10-20 15:06:50'),
(12, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 17:07:01.000', '2022-10-20 17:12:24.189', '2022-10-20 15:12:24'),
(13, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 17:12:29.000', '2022-10-20 17:14:58.257', '2022-10-20 15:14:58'),
(14, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 17:15:52.000', '2022-10-20 17:17:18.619', '2022-10-20 15:17:18'),
(15, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 17:17:24.000', '2022-10-20 17:18:26.464', '2022-10-20 15:18:26'),
(16, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/11/2022', '2022-10-20 17:18:31.000', '2022-10-20 17:19:29.346', '2022-10-20 15:19:29'),
(17, 'test123', 'xeqtr', 'xeqtr', 'acab1312', '12/11/2022', '2022-10-20 17:19:38.000', '2022-10-20 17:40:22.104', '2022-10-20 15:40:22'),
(18, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/12/2022', '2022-10-21 01:19:33.000', '2022-10-21 01:19:40.149', '2022-10-20 23:19:40'),
(19, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/12/2022', '2022-10-21 01:20:27.000', '2022-10-21 01:20:40.836', '2022-10-20 23:20:40'),
(20, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/12/2022', '2022-10-21 01:22:28.000', '2022-10-21 01:22:30.549', '2022-10-20 23:22:30'),
(21, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/12/2022', '2022-10-21 01:26:14.000', '2022-10-21 01:26:23.567', '2022-10-20 23:26:23'),
(22, 'test123', 'xeqtr', 'xeqtr', 'acab', '12/12/2022', '2022-10-21 01:27:23.000', '2022-10-29 22:58:03.488', '2022-10-29 20:58:03');

-- --------------------------------------------------------

--
-- Table structure for table `browserhistory`
--

CREATE TABLE `browserhistory` (
  `browserid` int(11) NOT NULL,
  `browser_username` varchar(100) NOT NULL,
  `browser_name` varchar(100) NOT NULL,
  `browser_osname` varchar(100) NOT NULL,
  `browser_platform` varchar(100) NOT NULL,
  `browser_ipaddress` varchar(100) NOT NULL,
  `browser_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `browserhistory`
--

INSERT INTO `browserhistory` (`browserid`, `browser_username`, `browser_name`, `browser_osname`, `browser_platform`, `browser_ipaddress`, `browser_date`) VALUES
(1, 'xeqtr', 'Chrome', '', 'Microsoft Windows', '0', '2022-09-16 23:52:12'),
(2, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-09-16 23:53:13'),
(3, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-09-17 17:29:48'),
(4, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-09-18 21:04:29'),
(5, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-09-19 23:27:13'),
(6, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-09-20 11:50:08'),
(7, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-09-20 11:52:00'),
(8, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-09-20 12:13:11'),
(9, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 19:21:11'),
(10, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 19:22:55'),
(11, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 19:28:27'),
(12, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 19:32:48'),
(13, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 21:43:35'),
(14, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:00:42'),
(15, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:01:06'),
(16, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:01:36'),
(17, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:02:11'),
(18, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:04:38'),
(19, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:06:03'),
(20, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:07:38'),
(21, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:09:33'),
(22, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::ffff:127.0.0.1', '2022-10-07 22:10:30'),
(23, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:18:37'),
(24, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::ffff:127.0.0.1', '2022-10-07 22:20:05'),
(25, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:32:31'),
(26, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:35:01'),
(27, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:38:57'),
(28, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:48:43'),
(29, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:49:22'),
(30, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:50:02'),
(31, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:58:39'),
(32, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 22:59:56'),
(33, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 23:26:07'),
(34, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 23:32:46'),
(35, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 23:34:17'),
(36, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 23:54:10'),
(37, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 23:54:32'),
(38, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-07 23:56:10'),
(39, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 00:00:35'),
(40, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 00:09:32'),
(41, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 00:22:08'),
(42, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 01:57:59'),
(43, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 02:13:12'),
(44, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 02:29:11'),
(45, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 20:54:01'),
(46, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 21:01:41'),
(47, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 22:16:32'),
(48, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-08 22:30:32'),
(49, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-10 21:46:04'),
(50, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-12 03:26:16'),
(51, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 02:00:56'),
(52, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 15:23:21'),
(53, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 16:55:58'),
(54, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 16:57:24'),
(55, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 17:01:29'),
(56, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 17:03:02'),
(57, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 17:17:58'),
(58, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-16 17:30:18'),
(59, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-18 01:22:45'),
(60, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-18 01:23:15'),
(61, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-18 01:42:33'),
(62, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-18 22:18:40'),
(63, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::ffff:127.0.0.1', '2022-10-18 22:19:12'),
(64, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-18 22:20:14'),
(65, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-18 23:54:31'),
(66, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 00:45:37'),
(67, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 01:23:37'),
(68, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 01:46:44'),
(69, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 01:49:04'),
(70, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 01:52:18'),
(71, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 01:55:32'),
(72, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 01:55:49'),
(73, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:19:04'),
(74, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:19:14'),
(75, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:24:46'),
(76, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:25:37'),
(77, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:27:46'),
(78, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:34:58'),
(79, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:35:11'),
(80, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:35:44'),
(81, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-19 02:37:52'),
(82, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 02:52:40'),
(83, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 02:53:07'),
(84, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 02:55:21'),
(85, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 02:55:47'),
(86, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:04:46'),
(87, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:13:32'),
(88, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:15:45'),
(89, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:16:13'),
(90, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:20:53'),
(91, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:22:27'),
(92, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:30:38'),
(93, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:31:17'),
(94, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:38:16'),
(95, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 03:47:59'),
(96, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 14:58:28'),
(97, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 23:20:14'),
(98, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-20 23:27:09'),
(99, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-28 00:33:40'),
(100, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-28 01:41:13'),
(101, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-28 20:03:54'),
(102, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-29 20:58:07'),
(103, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-10-31 23:48:32'),
(104, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-11-11 11:09:23'),
(105, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-11-12 13:46:18'),
(106, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-11-21 02:27:16'),
(107, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-11-21 03:05:34'),
(108, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-11-21 17:59:15'),
(109, 'xeqtr', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-11-21 17:59:35'),
(110, 'test123', 'Chrome', 'Windows 10.0', 'Microsoft Windows', '::1', '2022-11-21 17:59:50');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cid` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cid`, `title`, `description`, `date`) VALUES
(2, 'Pravila', 'Official rules of The Conjured can be found in this section.\r\n', '2022-09-24 19:50:16'),
(3, 'Firme Biznisi', 'Staff of The Conjued.', '2022-09-25 16:36:04'),
(4, 'Predlozi za server', 'You can post your support questions here.\r\n', '2022-09-24 19:51:23'),
(5, 'Prijava bugova', 'Talk about anything related to the community.', '2022-09-24 19:51:37'),
(6, 'Zahtev za vracanje statsa', 'Here you can share modifications. Please follow the guidelines posted inside.', '2022-09-24 19:52:07'),
(7, 'Konkursi', 'Here you can share interesting and funny media.', '2022-09-24 19:52:25'),
(8, 'Zahtevi', 'If you\'re new to the community, you can introduce yourself here! Post your real life pictures, or si', '2022-09-24 19:52:41'),
(9, 'Zalbe', 'Here you can talk about any game.', '2022-09-24 19:52:47');

-- --------------------------------------------------------

--
-- Table structure for table `editreply`
--

CREATE TABLE `editreply` (
  `e_id` int(255) NOT NULL,
  `e_whoedit` varchar(100) NOT NULL,
  `e_hwtedited` int(100) NOT NULL,
  `e_whenedit` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `e_idreply` int(11) NOT NULL,
  `e_titlename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `editreply`
--

INSERT INTO `editreply` (`e_id`, `e_whoedit`, `e_hwtedited`, `e_whenedit`, `e_idreply`, `e_titlename`) VALUES
(1, 'xeqtr', 1, '2022-10-29 21:55:01', 360, 'ahs');

-- --------------------------------------------------------

--
-- Table structure for table `messagerooms`
--

CREATE TABLE `messagerooms` (
  `roomid` int(11) NOT NULL,
  `room_sender` varchar(100) NOT NULL,
  `room_receiver` varchar(100) NOT NULL,
  `room_receiverimage` varchar(100) NOT NULL,
  `room_senderimage` varchar(100) NOT NULL,
  `room_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messagerooms`
--

INSERT INTO `messagerooms` (`roomid`, `room_sender`, `room_receiver`, `room_receiverimage`, `room_senderimage`, `room_date`) VALUES
(89, 'xeqtr', 'test123', '', 'o0nh3sf4xc79dy06czia', '2022-09-29 22:49:16'),
(90, 'test123', 'xeqtrasdasdasd', '', '', '2022-09-29 22:49:28'),
(91, 'xeqtr', 'asdas', '', 'o0nh3sf4xc79dy06czia', '2022-09-29 23:40:33'),
(92, 'testChatacab', 'test123', '', '', '2022-10-01 17:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `messagesid` int(30) NOT NULL,
  `messageuser` varchar(100) NOT NULL,
  `messagecontent` varchar(100) NOT NULL,
  `messageimage` varchar(100) NOT NULL,
  `messagedate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`messagesid`, `messageuser`, `messagecontent`, `messageimage`, `messagedate`) VALUES
(1, 'xeqtr', 'Helloooooooo!', '', '2022-09-18 21:19:51'),
(2, 'test123', 'Helloooooooo!', '', '2022-09-18 21:20:01'),
(3, 'xeqtr', 'acab1312😅', '', '2022-09-18 23:43:31'),
(4, 'xeqtr', 'acab🎃', '', '2022-09-18 23:44:46'),
(5, 'xeqtr', 'acab🎃', '', '2022-09-18 23:45:01'),
(6, 'xeqtr', 'fafafafafa', '', '2022-09-18 23:45:23'),
(7, 'xeqtr', 'aaaaaa', '', '2022-09-18 23:45:25'),
(8, 'xeqtr', 'ahhahaha', '', '2022-09-18 23:46:48'),
(9, 'xeqtr', 'aaa', '', '2022-09-18 23:46:49'),
(10, 'xeqtr', 'aaaaa', '', '2022-09-18 23:46:50'),
(11, 'xeqtr', 'aaaaafasf', '', '2022-09-18 23:52:17'),
(12, 'xeqtr', 'aaaaafasfaaa', '', '2022-09-18 23:52:22'),
(13, 'xeqtr', 'asfasfasfasfa', '', '2022-09-18 23:53:28'),
(14, 'xeqtr', 'asfasfasfasfaaha', '', '2022-09-18 23:53:33'),
(15, 'xeqtr', 'asfasfasfasfaaha', '', '2022-09-18 23:54:05'),
(16, 'xeqtr', 'asfasfasfasfaahaaa', '', '2022-09-18 23:54:08'),
(17, 'xeqtr', 'fas', '', '2022-09-18 23:54:16'),
(18, 'test123', 'fas', '', '2022-09-18 23:54:19'),
(19, 'test123', 'fasfas', '', '2022-09-18 23:54:48'),
(20, 'test123', 'fasfasaaa', '', '2022-09-18 23:54:54'),
(21, 'xeqtr', 'acab1312😅', '', '2022-09-19 00:09:47'),
(22, 'xeqtr', 'acabbbbbbbbbbbbbbbbbbbhhhh', '', '2022-09-19 00:14:01'),
(23, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:26:09'),
(24, 'xeqtr', 'has', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:41:31'),
(25, 'xeqtr', 'hashahas', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:42:04'),
(26, 'xeqtr', 'has', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:42:47'),
(27, 'xeqtr', 'aaaaaaaaaaaaaasf', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:43:08'),
(28, 'xeqtr', 'ahaha', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:43:39'),
(29, 'xeqtr', 'heheheh', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:44:01'),
(30, 'xeqtr', 'ahaha', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:44:29'),
(31, 'xeqtr', 'ahaha', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:44:35'),
(32, 'xeqtr', 'best', 'o0nh3sf4xc79dy06czia', '2022-09-19 00:44:55'),
(33, 'xeqtr', 'asdf', 'o0nh3sf4xc79dy06czia', '2022-09-19 15:37:15'),
(34, 'xeqtr', 'asdf', 'o0nh3sf4xc79dy06czia', '2022-09-19 19:40:44'),
(35, 'xeqtr', 'asdfgg', 'o0nh3sf4xc79dy06czia', '2022-09-19 19:40:45'),
(36, 'xeqtr', 'fasfafs', 'o0nh3sf4xc79dy06czia', '2022-09-19 20:34:37'),
(37, 'xeqtr', 'asdf', 'o0nh3sf4xc79dy06czia', '2022-09-19 20:38:43'),
(38, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 20:40:18'),
(39, 'xeqtr', 'afsafas', 'o0nh3sf4xc79dy06czia', '2022-09-19 21:47:20'),
(40, 'xeqtr', 'fasfasfa', 'o0nh3sf4xc79dy06czia', '2022-09-19 21:48:04'),
(41, 'xeqtr', 'asfafsafsa', 'o0nh3sf4xc79dy06czia', '2022-09-19 21:49:11'),
(42, 'xeqtr', 'fasfsa', 'o0nh3sf4xc79dy06czia', '2022-09-19 21:59:17'),
(43, 'xeqtr', 'ahs', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:06:10'),
(44, 'xeqtr', 'asfsafsa', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:08:15'),
(45, 'xeqtr', 'asfs', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:08:48'),
(46, 'xeqtr', 'asfs', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:13:58'),
(47, 'xeqtr', 'asfs', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:15:15'),
(48, 'xeqtr', 'asfasfasf', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:23:58'),
(49, 'xeqtr', 'afasfaaaa', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:28:22'),
(50, 'xeqtr', 'aaaa', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:30:30'),
(51, 'xeqtr', 'ahaha', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:31:12'),
(52, 'xeqtr', 'asfsafa', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:33:11'),
(53, 'xeqtr', 'afasfsa', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:34:16'),
(54, 'xeqtr', 'asfs', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:56:12'),
(55, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:56:20'),
(56, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:56:35'),
(57, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:56:43'),
(58, 'xeqtr', 'ahaaaa', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:56:45'),
(59, 'xeqtr', 'fasfsafa', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:57:05'),
(60, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:58:13'),
(61, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:58:40'),
(62, 'xeqtr', 'ne', 'o0nh3sf4xc79dy06czia', '2022-09-19 22:59:42'),
(63, 'xeqtr', 'asfs', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:00:09'),
(64, 'xeqtr', 'ane', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:00:11'),
(65, 'xeqtr', 'asfsa', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:00:23'),
(66, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:00:27'),
(67, 'xeqtr', 'aaaaaa', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:00:34'),
(68, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:00:38'),
(69, 'xeqtr', 'ahaha🎃', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:01:00'),
(70, 'xeqtr', 'asf', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:23:28'),
(71, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:23:32'),
(72, 'test123', 'aha', '', '2022-09-19 23:27:16'),
(73, 'xeqtr', 'test', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:27:29'),
(74, 'test123', 'neasfffff', '', '2022-09-19 23:27:59'),
(75, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:28:05'),
(76, 'test123', 'neasfffffaha', '', '2022-09-19 23:28:09'),
(77, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:28:16'),
(78, 'test123', 'neasfffffaha', '', '2022-09-19 23:28:29'),
(79, 'test123', 'aha', '', '2022-09-19 23:29:02'),
(80, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:29:15'),
(81, 'xeqtr', 'asfs', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:29:46'),
(82, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:30:29'),
(83, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:30:48'),
(84, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:30:57'),
(85, 'test123', 'aha', '', '2022-09-19 23:31:04'),
(86, 'test123', 'ejeje', '', '2022-09-19 23:31:09'),
(87, 'xeqtr', 'ahaeje', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:31:13'),
(88, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:31:19'),
(89, 'test123', 'ejeje', '', '2022-09-19 23:31:29'),
(90, 'xeqtr', 'ahae', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:31:57'),
(91, 'test123', 'ejeje', '', '2022-09-19 23:32:02'),
(92, 'xeqtr', 'ASFS', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:32:49'),
(93, 'test123', 'aha', '', '2022-09-19 23:35:23'),
(94, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:35:48'),
(95, 'xeqtr', 'ahaahaha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:38:31'),
(96, 'xeqtr', 'ahaahaha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:38:32'),
(97, 'xeqtr', 'ahaahaha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:38:32'),
(98, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:50:26'),
(99, 'xeqtr', 'hehe', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:50:43'),
(100, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:50:57'),
(101, 'test123', 'e', '', '2022-09-19 23:51:07'),
(102, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:51:10'),
(103, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:58:43'),
(104, 'xeqtr', 'e', 'o0nh3sf4xc79dy06czia', '2022-09-19 23:58:46'),
(105, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:01:38'),
(106, 'test123', 'aha', '', '2022-09-20 00:01:46'),
(107, 'test123', 'e', '', '2022-09-20 00:01:49'),
(108, 'xeqtr', 'e', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:01:54'),
(109, 'xeqtr', 'ehe', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:02:03'),
(110, 'test123', 'ehe', '', '2022-09-20 00:02:10'),
(111, 'xeqtr', 'HAESHEASHESA', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:02:15'),
(112, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:02:20'),
(113, 'xeqtr', 'hehe', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:02:51'),
(114, 'xeqtr', 'e', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:04:54'),
(115, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:05:23'),
(116, 'xeqtr', 'ehe', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:07:09'),
(117, 'test123', 'aha', '', '2022-09-20 00:07:27'),
(118, 'xeqtr', 'eahehasheas', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:10:13'),
(119, 'xeqtr', 'rasrasr', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:18:02'),
(120, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:26:59'),
(121, 'xeqtr', 'ahaaaa', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:28:02'),
(122, 'xeqtr', 'ehehehehe', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:29:00'),
(123, 'xeqtr', 'eh', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:32:22'),
(124, 'xeqtr', 'ahes', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:33:39'),
(125, 'xeqtr', 'afsfasfa', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:38:47'),
(126, 'xeqtr', 'gaga', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:41:18'),
(127, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:46:12'),
(128, 'xeqtr', 'asfsa', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:47:33'),
(129, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:47:59'),
(130, 'xeqtr', 'test', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:48:22'),
(131, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:48:56'),
(132, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:49:20'),
(133, 'xeqtr', 'aseasea', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:49:31'),
(134, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:50:57'),
(135, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:51:17'),
(136, 'xeqtr', 'aga', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:51:27'),
(137, 'xeqtr', 'asesaeas', 'o0nh3sf4xc79dy06czia', '2022-09-20 00:53:12'),
(138, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 11:51:34'),
(139, 'test123', 'ehe', '', '2022-09-20 11:52:03'),
(140, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 11:52:51'),
(141, 'test123', 'aha', '', '2022-09-20 11:52:59'),
(142, 'xeqtr', 'test', 'o0nh3sf4xc79dy06czia', '2022-09-20 11:53:16'),
(143, 'test123', 'test', '', '2022-09-20 11:53:20'),
(144, 'xeqtr', 'test', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:01:22'),
(145, 'xeqtr', 'acab1312', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:01:34'),
(146, 'test123', 'acab', '', '2022-09-20 12:01:40'),
(147, 'xeqtr', 'hehe', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:01:44'),
(148, 'test123', 'aha', '', '2022-09-20 12:03:50'),
(149, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:03:56'),
(150, 'xeqtr', 'ehehehehe', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:04:00'),
(151, 'xeqtr', 'ehe', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:05:56'),
(152, 'test123', 'aha', '', '2022-09-20 12:06:09'),
(153, 'test123', 'e', '', '2022-09-20 12:13:14'),
(154, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:22:42'),
(155, 'test123', 'e', '', '2022-09-20 12:22:51'),
(156, 'test123', 'eee', '', '2022-09-20 12:23:26'),
(157, 'xeqtr', 'ehs', 'o0nh3sf4xc79dy06czia', '2022-09-20 12:25:13'),
(158, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-20 19:52:17'),
(159, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:41:56'),
(160, 'xeqtr', 'ehehe', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:45:22'),
(161, 'xeqtr', 'afs', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:46:25'),
(162, 'xeqtr', 'sss', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:46:28'),
(163, 'test123', 'ahs', '', '2022-09-23 20:46:36'),
(164, 'xeqtr', 'ahs', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:53:24'),
(165, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:53:33'),
(166, 'xeqtr', 'ahs', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:54:50'),
(167, 'xeqtr', 'aaa', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:54:53'),
(168, 'xeqtr', 'ahs', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:56:12'),
(169, 'xeqtr', 'ahs', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:56:46'),
(170, 'xeqtr', 'ah', 'o0nh3sf4xc79dy06czia', '2022-09-23 20:58:16'),
(171, 'xeqtr', 'ahs', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:00:47'),
(172, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:01:15'),
(173, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:01:26'),
(174, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:02:59'),
(175, 'xeqtr', 'ah', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:03:19'),
(176, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:17:07'),
(177, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:36:16'),
(178, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:36:19'),
(179, 'xeqtr', 'es', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:36:21'),
(180, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:36:44'),
(181, 'xeqtr', 'ehs', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:36:46'),
(182, 'xeqtr', 'asfss', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:36:48'),
(183, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:37:29'),
(184, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:37:34'),
(185, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:37:37'),
(186, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:44:26'),
(187, 'test123', 'acab', '', '2022-09-23 21:44:40'),
(188, 'test123', 'hehe', '', '2022-09-23 21:44:42'),
(189, 'test123', 'bezo bre😅', '', '2022-09-23 21:44:57'),
(190, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:55:06'),
(191, 'xeqtr', 'ahehse', 'o0nh3sf4xc79dy06czia', '2022-09-23 21:59:52'),
(192, 'test123', 'a', '', '2022-09-23 22:14:30'),
(193, 'xeqtr', '', 'o0nh3sf4xc79dy06czia', '2022-09-23 22:22:35'),
(194, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-23 22:39:22'),
(195, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-24 18:41:30'),
(196, 'xeqtr', 'ekms', 'o0nh3sf4xc79dy06czia', '2022-09-24 18:41:31'),
(197, 'xeqtr', 'acab', 'o0nh3sf4xc79dy06czia', '2022-09-24 19:43:45'),
(198, 'xeqtr', 'aha', 'o0nh3sf4xc79dy06czia', '2022-09-29 13:42:01'),
(199, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-29 13:42:15'),
(200, 'test123', 'afs', '', '2022-09-29 13:42:36'),
(201, 'xeqtr', 'a', 'o0nh3sf4xc79dy06czia', '2022-09-29 13:42:47'),
(202, 'xeqtr', 'aca', 'o0nh3sf4xc79dy06czia', '2022-09-29 13:55:05'),
(203, 'test123', 'acab', '', '2022-09-29 13:55:11'),
(204, 'xeqtr', 'e', 'o0nh3sf4xc79dy06czia', '2022-09-30 23:09:19'),
(205, 'test123', 'acab', '', '2022-09-30 23:09:44'),
(206, 'test123', 'aha', '', '2022-10-01 17:58:11'),
(207, 'test123', 'aes', '', '2022-10-01 17:58:18'),
(208, 'test123', 'a', '', '2022-10-01 17:58:27'),
(209, 'testChatacab', 'a', '', '2022-10-01 17:58:44'),
(210, 'testChatacab', 'a', '', '2022-10-01 17:59:27'),
(211, 'xeqtr', 'xeq', '', '2022-10-01 17:59:44'),
(212, 'test123', 'acab', '', '2022-10-01 18:01:29'),
(213, 'testChatacab', 'a', '', '2022-10-01 18:02:10'),
(214, 'xeqtr', 'a', '', '2022-10-01 23:21:35'),
(215, 'xeqtr', '😈acab', '', '2022-10-02 00:36:22'),
(216, 'xeqtr', 'acab', 'qhsvhbc9vslicus0sk8n', '2022-10-02 14:33:57'),
(217, 'xeqtr', 'acab', 'qhsvhbc9vslicus0sk8n', '2022-10-02 14:34:04'),
(218, 'xeqtr', 'ahs', 'qhsvhbc9vslicus0sk8n', '2022-10-02 14:59:59'),
(219, 'xeqtr', 'aha', 'qhsvhbc9vslicus0sk8n', '2022-10-02 15:15:08'),
(220, 'xeqtr', 's', 'qhsvhbc9vslicus0sk8n', '2022-10-02 19:18:35'),
(221, 'xeqtr', 's', 'qhsvhbc9vslicus0sk8n', '2022-10-02 19:41:49'),
(222, 'xeqtr', 'acab', 'qhsvhbc9vslicus0sk8n', '2022-10-02 19:54:16'),
(223, 'xeqtr', 'yqwyqy', 'qhsvhbc9vslicus0sk8n', '2022-10-03 01:09:14'),
(224, 'test123', 'aha', '', '2022-10-03 01:21:03'),
(225, 'test123', 'aha', '', '2022-10-03 01:21:23'),
(226, 'test123', 'aha', 'kgkbimjbljywzqmnavol', '2022-10-03 01:21:28'),
(227, 'test123', 'NECE BOLETA VISE', 'kgkbimjbljywzqmnavol', '2022-10-03 01:21:34'),
(228, 'xeqtr', 'NEGO STA NEGO NECE', 'qhsvhbc9vslicus0sk8n', '2022-10-03 01:40:47'),
(229, 'xeqtr', '', 'qhsvhbc9vslicus0sk8n', '2022-10-03 01:40:51'),
(230, 'xeqtr', '', 'qhsvhbc9vslicus0sk8n', '2022-10-03 01:40:52'),
(231, 'xeqtr', 'a', 'qhsvhbc9vslicus0sk8n', '2022-10-03 01:42:22'),
(232, 'xeqtr', 'haha', 'qhsvhbc9vslicus0sk8n', '2022-10-03 22:45:38'),
(233, 'xeqtr', 'aha', 'qhsvhbc9vslicus0sk8n', '2022-10-04 19:23:19'),
(234, 'xeqtr', 'aha', 'qhsvhbc9vslicus0sk8n', '2022-10-05 00:15:44'),
(235, 'xeqtr', 'aha', 'qhsvhbc9vslicus0sk8n', '2022-10-05 11:48:05'),
(236, 'xeqtr', 'acab', 'qhsvhbc9vslicus0sk8n', '2022-10-07 17:48:18'),
(237, 'xeqtr', 'aca', 'qhsvhbc9vslicus0sk8n', '2022-10-07 17:48:23'),
(238, 'xeqtr', 'aha', 'qhsvhbc9vslicus0sk8n', '2022-10-07 17:53:30'),
(239, 'xeqtr', 'a', 'qhsvhbc9vslicus0sk8n', '2022-10-07 22:34:11'),
(240, 'xeqtr', 'a', 'qhsvhbc9vslicus0sk8n', '2022-10-07 22:34:14'),
(241, 'xeqtr', 'a😃', 'qhsvhbc9vslicus0sk8n', '2022-10-07 22:34:19'),
(242, 'xeqtr', 'a', 'qhsvhbc9vslicus0sk8n', '2022-10-07 22:35:03'),
(243, 'xeqtr', 'fs', 'qhsvhbc9vslicus0sk8n', '2022-10-07 22:35:07'),
(244, 'xeqtr', 'a', 'qhsvhbc9vslicus0sk8n', '2022-10-07 22:35:42'),
(245, 'xeqtr', 'aha', 'qhsvhbc9vslicus0sk8n', '2022-10-08 00:18:26'),
(246, 'test123', 'acab', 'kgkbimjbljywzqmnavol', '2022-10-12 03:30:33'),
(247, 'xeqtr', 'aha', 'qhsvhbc9vslicus0sk8n', '2022-10-15 02:16:08'),
(248, 'xeqtr', 'acab', 'qhsvhbc9vslicus0sk8n', '2022-10-15 21:06:51'),
(249, 'xeqtr', 'acab', 'qhsvhbc9vslicus0sk8n', '2022-10-16 17:18:13'),
(250, 'xeqtr', 'ACAB', 'qhsvhbc9vslicus0sk8n', '2022-10-16 17:29:56'),
(251, 'xeqtr', 'HEASHEsa', 'qhsvhbc9vslicus0sk8n', '2022-10-16 17:29:58'),
(252, 'test123', 'acab', 'kgkbimjbljywzqmnavol', '2022-10-16 17:30:20'),
(253, 'test123', 'acab', 'kgkbimjbljywzqmnavol', '2022-10-16 17:30:25'),
(254, 'xeqtr', '🥵', 'qhsvhbc9vslicus0sk8n', '2022-10-16 17:37:28'),
(255, 'test123', 'aseasea', 'kgkbimjbljywzqmnavol', '2022-10-20 23:27:40'),
(256, 'test123', 'ff', 'kgkbimjbljywzqmnavol', '2022-10-20 23:27:42'),
(257, 'test123', 'f', 'kgkbimjbljywzqmnavol', '2022-10-20 23:27:43'),
(258, 'xeqtr', 'afs', 'qhsvhbc9vslicus0sk8n', '2022-10-24 20:12:57'),
(259, 'xeqtr', 'fasfasfsa', 'qhsvhbc9vslicus0sk8n', '2022-10-28 20:00:14'),
(260, 'test123', 'ahya', 'kgkbimjbljywzqmnavol', '2022-10-29 21:11:06'),
(261, 'xeqtr', 'fsa', 'qhsvhbc9vslicus0sk8n', '2022-11-12 20:51:19'),
(262, 'xeqtr', 'fasfsa', 'qhsvhbc9vslicus0sk8n', '2022-11-12 22:11:39'),
(263, 'xeqtr', 'aa', 'qhsvhbc9vslicus0sk8n', '2022-11-12 22:11:43'),
(264, 'xeqtr', 'fasefase', 'qhsvhbc9vslicus0sk8n', '2022-11-12 22:19:03'),
(265, 'xeqtr', 'fas', 'qhsvhbc9vslicus0sk8n', '2022-11-13 13:17:46'),
(266, 'xeqtr', 'fas', 'qhsvhbc9vslicus0sk8n', '2022-11-21 01:27:24');

-- --------------------------------------------------------

--
-- Table structure for table `messagesfromrooms`
--

CREATE TABLE `messagesfromrooms` (
  `roommessage_id` int(11) NOT NULL,
  `roommessage_roomid` int(111) NOT NULL,
  `roommessage_sender` varchar(100) NOT NULL,
  `roommessage_sender_image` varchar(100) NOT NULL,
  `roommessage_receiver` varchar(100) NOT NULL,
  `roommessage_content` text NOT NULL,
  `roommessage_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messagesfromrooms`
--

INSERT INTO `messagesfromrooms` (`roommessage_id`, `roommessage_roomid`, `roommessage_sender`, `roommessage_sender_image`, `roommessage_receiver`, `roommessage_content`, `roommessage_date`) VALUES
(1, 89, 'xeqtr', '', 'test123', '[value-5]', '0000-00-00 00:00:00'),
(2, 89, 'test123', '', 'xeqtr', '[value-5easesaaesesaesa]', '0000-00-00 00:00:00'),
(3, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 22:25:13'),
(4, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:25:56'),
(5, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'aha', '2022-09-30 22:26:11'),
(6, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:26:23'),
(7, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:26:55'),
(8, 89, 'test123', '', 'test123', 'ahasdhsada', '2022-09-30 22:27:21'),
(9, 89, 'test123', '', 'test123', 'ahasdhsada', '2022-09-30 22:27:22'),
(10, 89, 'test123', '', 'test123', 'ahasdhsada', '2022-09-30 22:27:26'),
(11, 89, 'test123', '', 'test123', 'asdf', '2022-09-30 22:27:41'),
(12, 89, 'test123', '', 'test123', 'a', '2022-09-30 22:28:08'),
(13, 89, 'test123', '', 'test123', 'aha', '2022-09-30 22:28:59'),
(14, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'asf', '2022-09-30 22:29:37'),
(15, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'aha', '2022-09-30 22:30:18'),
(16, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:30:56'),
(17, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'ahs', '2022-09-30 22:31:30'),
(18, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'ACAB', '2022-09-30 22:32:32'),
(19, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'aha', '2022-09-30 22:33:35'),
(20, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:33:42'),
(21, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:33:43'),
(22, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:33:43'),
(23, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:33:43'),
(24, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'a', '2022-09-30 22:33:43'),
(25, 89, 'test123', '', 'test123', 'ej', '2022-09-30 22:34:28'),
(26, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'asd', '2022-09-30 22:34:35'),
(27, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 22:35:33'),
(28, 89, 'test123', '', 'test123', 'acab', '2022-09-30 22:35:40'),
(29, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'ne brate', '2022-09-30 22:35:48'),
(30, 89, 'test123', '', 'test123', 'kako ne', '2022-09-30 22:35:58'),
(31, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'aj da probamo i ovo brate moj dobri', '2022-09-30 22:36:11'),
(32, 89, 'test123', '', 'test123', 'acab', '2022-09-30 22:36:50'),
(33, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'aj da probamo i ovo brate moj dobri', '2022-09-30 22:37:06'),
(34, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 22:38:40'),
(35, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'aj da vidimo OVO AKO RADI TO JE TO', '2022-09-30 22:39:02'),
(36, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 22:48:16'),
(37, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'ehehe', '2022-09-30 22:48:18'),
(38, 89, 'test123', '', 'test123', 'acab', '2022-09-30 22:48:34'),
(39, 89, 'test123', '', 'test123', 'ne', '2022-09-30 22:48:37'),
(40, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'ne', '2022-09-30 22:48:41'),
(41, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 22:56:59'),
(42, 89, 'test123', '', 'test123', 'e', '2022-09-30 22:57:04'),
(43, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acabbb', '2022-09-30 22:57:09'),
(44, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 22:57:37'),
(45, 89, 'test123', '', 'test123', 'acab', '2022-09-30 22:57:45'),
(46, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 22:59:18'),
(47, 89, 'test123', '', 'test123', 'acab', '2022-09-30 22:59:23'),
(48, 89, 'test123', '', 'test123', 'pa ne znam brate', '2022-09-30 22:59:26'),
(49, 89, 'test123', '', 'test123', 'e', '2022-09-30 22:59:37'),
(50, 89, 'test123', '', 'test123', 'eee', '2022-09-30 22:59:38'),
(51, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 23:04:35'),
(52, 89, 'test123', '', 'test123', 'acabv', '2022-09-30 23:04:41'),
(53, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'ne', '2022-09-30 23:04:45'),
(54, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'aj mozda moze', '2022-09-30 23:04:49'),
(55, 89, 'test123', '', 'test123', 'moze', '2022-09-30 23:04:55'),
(56, 89, 'xeqtr', 'o0nh3sf4xc79dy06czia', 'test123', 'acab', '2022-09-30 23:15:04'),
(57, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 00:25:12'),
(58, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 01:10:07'),
(59, 92, 'testChatacab', '', 'test123', 'acab', '2022-10-01 17:59:23'),
(60, 89, 'test123', '', 'test123', 'acab', '2022-10-01 18:02:32'),
(61, 89, 'test123', '', 'test123', 'ahahahahaha', '2022-10-01 18:02:45'),
(62, 92, 'test123', '', 'test123', 'ahahahahaha', '2022-10-01 18:03:17'),
(63, 92, 'testChatacab', '', 'test123', 'botino radi ti sve haha', '2022-10-01 18:03:25'),
(64, 89, 'test123', '', 'test123', 'ahaha', '2022-10-01 18:11:08'),
(65, 92, 'test123', '', 'test123', 'e', '2022-10-01 18:11:12'),
(66, 89, 'test123', '', 'test123', 'acab', '2022-10-01 18:11:51'),
(67, 89, 'test123', '', 'test123', 'acab', '2022-10-01 18:11:53'),
(68, 89, 'test123', '', 'test123', 'aha', '2022-10-01 18:12:33'),
(69, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:12:37'),
(70, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:14:37'),
(71, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:14:56'),
(72, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:20:20'),
(73, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:21:03'),
(74, 89, 'xeqtr', '', 'test123', 'hahaha', '2022-10-01 18:21:11'),
(75, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:22:20'),
(76, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:23:28'),
(77, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:24:53'),
(78, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:33:28'),
(79, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:35:57'),
(80, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:38:33'),
(81, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:38:41'),
(82, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:41:22'),
(83, 89, 'xeqtr', '', 'test123', 'aha', '2022-10-01 18:41:31'),
(84, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:47:45'),
(85, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 18:51:26'),
(86, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 19:00:38'),
(87, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 19:00:43'),
(88, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 19:01:30'),
(89, 89, 'xeqtr', '', 'test123', 'ehe', '2022-10-01 19:01:33'),
(90, 89, 'xeqtr', '', 'test123', 'moze ovako', '2022-10-01 19:07:55'),
(91, 89, 'xeqtr', '', 'test123', 'da', '2022-10-01 19:08:06'),
(92, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 19:09:18'),
(93, 89, 'xeqtr', '', 'test123', 'ne', '2022-10-01 19:09:20'),
(94, 89, 'xeqtr', '', 'test123', 'da', '2022-10-01 19:09:21'),
(95, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 19:09:23'),
(96, 89, 'xeqtr', '', 'test123', 'aes', '2022-10-01 19:09:24'),
(97, 89, 'xeqtr', '', 'test123', '\\ase', '2022-10-01 19:09:25'),
(98, 89, 'xeqtr', '', 'test123', 'aseesa', '2022-10-01 19:09:25'),
(99, 89, 'xeqtr', '', 'test123', 'sae', '2022-10-01 19:09:25'),
(100, 89, 'xeqtr', '', 'test123', 'ase', '2022-10-01 19:09:26'),
(101, 89, 'xeqtr', '', 'test123', 'eas', '2022-10-01 19:09:27'),
(102, 89, 'xeqtr', '', 'test123', 'esa', '2022-10-01 19:09:27'),
(103, 89, 'xeqtr', '', 'test123', 'es', '2022-10-01 19:09:27'),
(104, 89, 'xeqtr', '', 'test123', 'ase', '2022-10-01 19:09:27'),
(105, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 19:16:32'),
(106, 89, 'xeqtr', '', 'test123', 'asd', '2022-10-01 19:52:36'),
(107, 89, 'xeqtr', '', 'test123', 'asd', '2022-10-01 20:50:29'),
(108, 89, 'xeqtr', '', 'test123', 'aaaaa', '2022-10-01 20:50:32'),
(109, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 20:56:04'),
(110, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 20:58:02'),
(111, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 22:07:47'),
(112, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 22:19:54'),
(113, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:23:13'),
(114, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:24:19'),
(115, 89, 'xeqtr', '', 'test123', 's', '2022-10-01 22:24:20'),
(116, 89, 'xeqtr', '', 'test123', 'dfasfsa', '2022-10-01 22:24:23'),
(117, 89, 'xeqtr', '', 'test123', 'afs', '2022-10-01 22:24:35'),
(118, 89, 'xeqtr', '', 'test123', 'fsfsfsfs', '2022-10-01 22:24:41'),
(119, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:24:48'),
(120, 89, 'xeqtr', '', 'test123', 'fs', '2022-10-01 22:24:49'),
(121, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:24:50'),
(122, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:25:17'),
(123, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:30:12'),
(124, 89, 'xeqtr', '', 'test123', 'afs', '2022-10-01 22:35:37'),
(125, 89, 'xeqtr', '', 'test123', 'fs', '2022-10-01 22:36:08'),
(126, 89, 'xeqtr', '', 'test123', 'ah', '2022-10-01 22:37:02'),
(127, 89, 'xeqtr', '', 'test123', 'ah', '2022-10-01 22:37:18'),
(128, 89, 'xeqtr', '', 'test123', 'acab', '2022-10-01 22:38:06'),
(129, 89, 'xeqtr', '', 'test123', 'ahs', '2022-10-01 22:38:54'),
(130, 89, 'xeqtr', '', 'test123', 'asds', '2022-10-01 22:39:52'),
(131, 89, 'xeqtr', '', 'test123', 'ahs', '2022-10-01 22:42:33'),
(132, 89, 'xeqtr', '', 'test123', 'sd', '2022-10-01 22:47:54'),
(133, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:49:09'),
(134, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:49:12'),
(135, 89, 'xeqtr', '', 'test123', 'asfs', '2022-10-01 22:51:10'),
(136, 89, 'xeqtr', '', 'test123', 'asf', '2022-10-01 22:51:36'),
(137, 89, 'xeqtr', '', 'test123', 'h', '2022-10-01 22:53:46'),
(138, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:54:18'),
(139, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 22:58:29'),
(140, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 23:01:00'),
(141, 89, 'xeqtr', '', 'test123', 'fghs', '2022-10-01 23:01:30'),
(142, 89, 'xeqtr', '', 'test123', 'fs', '2022-10-01 23:02:42'),
(143, 89, 'xeqtr', '', 'test123', 'afs', '2022-10-01 23:04:11'),
(144, 89, 'xeqtr', '', 'test123', 'afs', '2022-10-01 23:04:31'),
(145, 89, 'xeqtr', '', 'test123', 'f', '2022-10-01 23:05:17'),
(146, 89, 'xeqtr', '', 'test123', 's', '2022-10-01 23:05:41'),
(147, 89, 'xeqtr', '', 'test123', 'f', '2022-10-01 23:07:01'),
(148, 89, 'xeqtr', '', 'test123', 'h', '2022-10-01 23:07:31'),
(149, 89, 'xeqtr', '', 'test123', 'f', '2022-10-01 23:09:45'),
(150, 89, 'xeqtr', '', 'test123', 'asf', '2022-10-01 23:11:23'),
(151, 89, 'xeqtr', '', 'test123', 'asf', '2022-10-01 23:12:57'),
(152, 89, 'xeqtr', '', 'test123', 'a', '2022-10-01 23:12:59'),
(153, 89, 'xeqtr', '', 'test123', 'a', '2022-10-02 00:23:22'),
(154, 89, 'test123', 'kgkbimjbljywzqmnavol', 'test123', 'acab', '2022-10-16 17:30:56'),
(155, 89, 'xeqtr', 'qhsvhbc9vslicus0sk8n', 'test123', 'e moj brate dobri', '2022-10-30 01:55:13'),
(156, 89, 'test123', 'kgkbimjbljywzqmnavol', 'test123', 'eee', '2022-11-21 18:02:28');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `n_id` int(11) NOT NULL,
  `n_title` varchar(100) NOT NULL,
  `n_shortdesc` varchar(100) NOT NULL,
  `n_image` varchar(100) NOT NULL,
  `n_username` varchar(100) NOT NULL,
  `n_description` text NOT NULL,
  `n_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`n_id`, `n_title`, `n_shortdesc`, `n_image`, `n_username`, `n_description`, `n_date`) VALUES
(1, 'acab', 'EHASEHASEH', '', 'xeqtr', '<p>ACABBBBBBBBBBBBBB</p>', '2022-10-17 22:16:03'),
(4, 'acabEHEHE', 'abesaebasebas', '', 'xeqtr', '<p>ebasebasebasebas</p>', '2022-10-17 23:19:31'),
(5, 'News!', 'HAS', '', 'xeqtr', '<p>acabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p><p><br></p><p><br></p><ul><li>aha</li><li>aha</li></ul><p><br></p><p><br></p><p><br></p><ol><li>da</li><li>ne</li><li>jes</li><li><br></li></ol>', '2022-10-17 23:55:41'),
(6, 'fasf', 'fafafafafafafafafaf', '', 'xeqtr', '<p>affafafafafa</p>', '2022-11-21 17:26:48');

-- --------------------------------------------------------

--
-- Table structure for table `overwatchposts`
--

CREATE TABLE `overwatchposts` (
  `ow_pid` int(11) NOT NULL,
  `ow_pusername` varchar(100) NOT NULL,
  `ow_pname` varchar(100) NOT NULL,
  `ow_psection` varchar(1000) NOT NULL,
  `ow_pdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `overwatchposts`
--

INSERT INTO `overwatchposts` (`ow_pid`, `ow_pusername`, `ow_pname`, `ow_psection`, `ow_pdate`) VALUES
(1, 'xeqtr', 'adsafdasfas', 'Moved post to subforum, ', '2022-10-13 02:39:40'),
(2, 'xeqtr', 'adsad', 'Moved topic to category, category: Predlozi za server, post title: adsad ', '2022-10-13 02:50:20'),
(3, 'xeqtr', 'acabbbbbasf', 'Locked thread, post title: acabbbbbasf ', '2022-10-16 01:09:15'),
(4, 'xeqtr', 'acabbbbbasf', 'Unlocked thread, post title: acabbbbbasf ', '2022-10-16 01:09:29'),
(5, 'xeqtr', 'acaaaaaaaab', 'SubForum added, category: Predlozi za server, title of subforum: acaaaaaaaab', '2022-10-16 17:32:25'),
(6, 'xeqtr', 'aheasheasheas', 'Locked thread, post title: aheasheasheas ', '2022-10-25 22:41:49'),
(7, 'xeqtr', 'aheasheasheas', 'Unlocked thread, post title: aheasheasheas ', '2022-10-25 22:41:53'),
(8, 'xeqtr', 'ahaeh', 'Moved post to subforum, subforum title: Zahtev za unban, post title: ahaeh', '2022-10-25 23:52:12'),
(9, 'xeqtr', 'aaaaaaaaaaTEST', 'Moved post to subforum, subforum title: ahas, post title: aaaaaaaaaaTEST', '2022-10-25 23:52:39'),
(10, 'xeqtr', 'aeaesesaesaesaaesesaaesaesaes', 'Moved post to subforum, subforum title: pedrowy, post title: aeaesesaesaesaaesesaaesaesaes', '2022-10-26 00:24:58'),
(11, 'xeqtr', 'adsad', 'Moved post to subforum, subforum title: acab, post title: adsad', '2022-10-26 00:49:25'),
(12, 'xeqtr', 'acab', 'SubForum added, category: Predlozi za server, title of subforum: acab', '2022-10-26 01:48:35'),
(13, 'xeqtr', 'acab', 'SubForum added, category: Predlozi za server, title of subforum: acab', '2022-10-26 02:02:12'),
(14, 'xeqtr', 'aha', 'SubForum added, category: Predlozi za server, title of subforum: aha', '2022-10-26 02:02:18'),
(15, 'xeqtr', 'acab', 'Added theme per category, category: Predlozi za server, theme title: acab, theme name: aha', '2022-10-26 02:14:42'),
(16, 'xeqtr', 'aha', 'Added post per theme, category: Predlozi za server', '2022-10-26 02:18:07'),
(17, 'xeqtr', 'test', 'Added theme per category, category: Zahtev za vracanje statsa, theme title: test, theme name: acab', '2022-10-26 20:26:44'),
(18, 'xeqtr', 'acab', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 20:26:49'),
(19, 'xeqtr', 'acab', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 20:26:58'),
(20, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:05:57'),
(21, 'xeqtr', 'acab', 'Removed theme, category: Zahtev za vracanje statsa', '2022-10-26 21:05:59'),
(22, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:09:25'),
(23, 'xeqtr', 'acab', 'Removed theme, category: Zahtev za vracanje statsa', '2022-10-26 21:09:29'),
(24, 'xeqtr', 'test', 'Added theme per category, category: Zahtev za vracanje statsa, theme title: test, theme name: acab', '2022-10-26 21:09:37'),
(25, 'xeqtr', 'acab', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:09:44'),
(26, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:14:10'),
(27, 'xeqtr', 'acab', 'Removed theme, category: Zahtev za vracanje statsa', '2022-10-26 21:14:11'),
(28, 'xeqtr', 'es', 'Added theme per category, category: Zahtev za vracanje statsa, theme title: es, theme name: acab', '2022-10-26 21:14:19'),
(29, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:31:12'),
(30, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:32:10'),
(31, 'xeqtr', 'as', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: as', '2022-10-26 21:32:34'),
(32, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:32:41'),
(33, 'xeqtr', 'ahe', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: ahe', '2022-10-26 21:33:29'),
(34, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:33:33'),
(35, 'xeqtr', 'ahes', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: ahes', '2022-10-26 21:34:26'),
(36, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:34:32'),
(37, 'xeqtr', 'ahs', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: ahs', '2022-10-26 21:35:42'),
(38, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:35:45'),
(39, 'xeqtr', 'ahes', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: ahes', '2022-10-26 21:37:33'),
(40, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:37:38'),
(41, 'xeqtr', 'test', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: test', '2022-10-26 21:39:34'),
(42, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:39:43'),
(43, 'xeqtr', 'ahs', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: ahs', '2022-10-26 21:40:34'),
(44, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:40:37'),
(45, 'xeqtr', 'as', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: as', '2022-10-26 21:43:37'),
(46, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:43:41'),
(47, 'xeqtr', 'ahes', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: ahes', '2022-10-26 21:48:59'),
(48, 'xeqtr', 'aha', 'Moved post to subforum, subforum title: ahes, post title: aha', '2022-10-26 21:49:05'),
(49, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 21:49:38'),
(50, 'xeqtr', 'acab', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: acab', '2022-10-26 22:23:42'),
(51, 'xeqtr', 'accccccab', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: accccccab', '2022-10-26 22:25:03'),
(52, 'xeqtr', 'aheasheasheas', 'Moved post to subforum, subforum title: accccccab, post title: aheasheasheas', '2022-10-26 22:25:13'),
(53, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 22:25:24'),
(54, 'xeqtr', 'aheasheasheas', 'Removed subforum', '2022-10-26 22:25:25'),
(55, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 22:29:36'),
(56, 'xeqtr', 'acab', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: acab', '2022-10-26 22:29:43'),
(57, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 22:29:46'),
(58, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-26 22:29:47'),
(59, 'xeqtr', 'fsafsaf', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: fsafsaf', '2022-10-26 22:31:30'),
(60, 'xeqtr', 'afasfafsafsa', 'Moved post to subforum, subforum title: fsafsaf, post title: afasfafsafsa', '2022-10-26 22:31:36'),
(61, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 22:31:43'),
(62, 'xeqtr', 'afasfafsafsa', 'Removed subforum', '2022-10-26 22:31:44'),
(63, 'xeqtr', 'acab', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: acab', '2022-10-26 22:31:56'),
(64, 'xeqtr', 'acab', 'Added pinned theme', '2022-10-26 22:33:21'),
(65, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-10-26 22:34:46'),
(66, 'xeqtr', 'acab', 'Removed theme, category: Zahtev za vracanje statsa', '2022-10-26 22:34:47'),
(67, 'xeqtr', '', 'Added post per theme, category: Firme Biznisi', '2022-10-27 00:11:20'),
(68, 'xeqtr', 'ahah', 'Removed theme, category: Firme Biznisi', '2022-10-27 00:11:22'),
(69, 'xeqtr', '', 'Added post per theme, category: Firme Biznisi', '2022-10-27 00:11:25'),
(70, 'xeqtr', 'adsafdasfas', 'Removed subforum', '2022-10-27 00:11:26'),
(71, 'xeqtr', 'adsad', 'Removed subforum', '2022-10-27 00:11:28'),
(72, 'xeqtr', 'hahahahahah', 'Moved topic to category, category: Predlozi za server, post title: hahahahahah ', '2022-10-29 01:28:10'),
(73, 'xeqtr', 'AAAAAAAAAAAAAAAAAAAAAAAAAHS', 'Moved topic to category, category: Konkursi, post title: AAAAAAAAAAAAAAAAAAAAAAAAAHS ', '2022-10-29 01:28:32'),
(74, 'xeqtr', 'ahaeh', 'Moved topic to category, category: Pravila, post title: ahaeh ', '2022-10-29 01:31:52'),
(75, 'xeqtr', 'hahahahahahahahhaahhaha', 'Moved topic to category, category: Zahtevi, post title: hahahahahahahahhaahhaha ', '2022-10-29 01:32:09'),
(76, 'xeqtr', 'TYEST', 'Moved topic to category, category: Konkursi, post title: TYEST ', '2022-10-29 01:32:22'),
(77, 'xeqtr', 'acab', 'Moved topic to category, category: Firme Biznisi, post title: acab ', '2022-10-29 01:33:02'),
(78, 'xeqtr', 'acaaaaaaaaaab', 'Moved topic to category, category: Konkursi, post title: acaaaaaaaaaab ', '2022-10-29 01:33:38'),
(79, 'xeqtr', 'AAAAAAAAAAAAAAAAAAAAAAAAAHS', 'Moved topic to category, category: Zahtev za vracanje statsa, post title: AAAAAAAAAAAAAAAAAAAAAAAAAHS ', '2022-10-29 01:33:47'),
(80, 'xeqtr', 'AAAAAAAAAAAAAAAAAAAAAAAAAHS', 'Moved topic to category, category: Zalbe, post title: AAAAAAAAAAAAAAAAAAAAAAAAAHS ', '2022-10-29 01:33:58'),
(81, 'xeqtr', 'AAAAAAAAAAAAAAAAAAAAAAAAAHS', 'Locked thread, post title: AAAAAAAAAAAAAAAAAAAAAAAAAHS ', '2022-10-29 01:34:11'),
(82, 'xeqtr', 'AAAAAAAAAAAAAAAAAAAAAAAAAHS', 'Unlocked thread, post title: AAAAAAAAAAAAAAAAAAAAAAAAAHS ', '2022-10-29 01:36:20'),
(83, 'xeqtr', '541', 'Updated reply, reply id = 541', '2022-10-29 18:42:17'),
(84, 'xeqtr', '541', 'Updated reply, reply id = 541', '2022-10-29 18:43:30'),
(85, 'xeqtr', '541', 'Updated reply, reply id = 541', '2022-10-29 18:44:27'),
(86, 'xeqtr', '541', 'Updated reply, reply id = 541', '2022-10-29 18:46:26'),
(87, 'xeqtr', '541', 'Updated reply, reply id = 541', '2022-10-29 18:47:23'),
(88, 'xeqtr', '541', 'Updated reply, reply id = 541', '2022-10-29 18:48:02'),
(89, 'xeqtr', '539', 'Delete reply by an admin', '2022-10-29 18:49:19'),
(90, 'xeqtr', '536', 'Updated reply, reply id = 536', '2022-10-29 19:31:46'),
(91, 'xeqtr', '536', 'Updated reply, reply id = 536', '2022-10-29 19:31:52'),
(92, 'xeqtr', '441', 'Updated reply, reply id = 441', '2022-10-30 01:39:41'),
(93, 'xeqtr', '441', 'Updated reply, reply id = 441', '2022-10-30 01:39:46'),
(94, 'test123', '557', 'Updated reply, reply id = 557', '2022-10-30 01:46:55'),
(95, 'xeqtr', '441', 'Updated reply, reply id = 441', '2022-10-30 01:51:47'),
(96, 'xeqtr', '556', 'Delete reply by an admin', '2022-10-30 01:59:05'),
(97, 'xeqtr', '559', 'Delete reply by an admin', '2022-10-30 02:00:56'),
(98, 'xeqtr', 'aaaaaaaaaaaaaaaaaaaaaa', 'Locked thread, post title: aaaaaaaaaaaaaaaaaaaaaa ', '2022-10-30 02:11:49'),
(99, 'xeqtr', '', 'Added post per theme, category: Pravila', '2022-10-31 17:41:49'),
(100, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:41:51'),
(101, 'xeqtr', 'test', 'SubForum added, category: Firme Biznisi, title of subforum: test', '2022-10-31 17:43:13'),
(102, 'xeqtr', '', 'Added post per theme, category: Firme Biznisi', '2022-10-31 17:43:17'),
(103, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:43:18'),
(104, 'xeqtr', 'ahane', 'SubForum added, category: Konkursi, title of subforum: ahane', '2022-10-31 17:43:42'),
(105, 'xeqtr', '', 'Added post per theme, category: Konkursi', '2022-10-31 17:43:45'),
(106, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:43:46'),
(107, 'xeqtr', 'fasefas', 'SubForum added, category: Konkursi, title of subforum: fasefas', '2022-10-31 17:46:20'),
(108, 'xeqtr', '', 'Added post per theme, category: Konkursi', '2022-10-31 17:46:30'),
(109, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:46:31'),
(110, 'xeqtr', 'fafafa', 'SubForum added, category: Konkursi, title of subforum: fafafa', '2022-10-31 17:47:37'),
(111, 'xeqtr', '', 'Added post per theme, category: Konkursi', '2022-10-31 17:47:40'),
(112, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:48:19'),
(113, 'xeqtr', '', 'Added post per theme, category: Konkursi', '2022-10-31 17:48:33'),
(114, 'xeqtr', 'ahaeh', 'Removed subforum', '2022-10-31 17:48:35'),
(115, 'xeqtr', 'ffafa', 'SubForum added, category: Zalbe, title of subforum: ffafa', '2022-10-31 17:51:19'),
(116, 'xeqtr', '', 'Added post per theme, category: Zalbe', '2022-10-31 17:51:22'),
(117, 'xeqtr', 'acab', 'SubForum added, category: Zalbe, title of subforum: acab', '2022-10-31 17:57:06'),
(118, 'xeqtr', '', 'Added post per theme, category: Zalbe', '2022-10-31 17:57:19'),
(119, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:57:20'),
(120, 'xeqtr', 'afafa', 'SubForum added, category: Zalbe, title of subforum: afafa', '2022-10-31 17:57:29'),
(121, 'xeqtr', 'fafaf', 'SubForum added, category: Zalbe, title of subforum: fafaf', '2022-10-31 17:57:32'),
(122, 'xeqtr', '', 'Added post per theme, category: Zalbe', '2022-10-31 17:57:37'),
(123, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:57:38'),
(124, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-10-31 17:57:39'),
(125, 'xeqtr', 'afafaf', 'Added theme per category, category: Zalbe, theme title: afafaf, theme name: fasfa', '2022-10-31 18:05:22'),
(126, 'xeqtr', '', 'Added post per theme, category: Zalbe', '2022-10-31 18:05:28'),
(127, 'xeqtr', 'fasfa', 'Removed theme, category: Zalbe', '2022-10-31 18:05:29'),
(128, 'xeqtr', 'a', 'Added theme per category, category: Zalbe, theme title: a, theme name: a', '2022-10-31 18:05:33'),
(129, 'xeqtr', 'a', 'Added theme per category, category: Zalbe, theme title: a, theme name: a', '2022-10-31 18:05:38'),
(130, 'xeqtr', 'a', 'Added post per theme, category: Zalbe', '2022-10-31 18:05:48'),
(131, 'xeqtr', 'a', 'Added post per theme, category: Zalbe', '2022-10-31 18:05:53'),
(132, 'xeqtr', 'a', 'Removed theme, category: Zalbe', '2022-10-31 18:05:54'),
(133, 'xeqtr', 'fasfsa', 'Added theme per category, category: Zalbe, theme title: fasfsa, theme name: fafafas', '2022-10-31 18:06:02'),
(134, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:13'),
(135, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:16'),
(136, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:20'),
(137, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:21'),
(138, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:23'),
(139, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:24'),
(140, 'xeqtr', 'fafafas', 'Removed theme, category: Zalbe', '2022-10-31 18:06:25'),
(141, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:29'),
(142, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:30'),
(143, 'xeqtr', 'fasfsa', 'Added theme per category, category: Zalbe, theme title: fasfsa, theme name: fafa', '2022-10-31 18:06:40'),
(144, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:43'),
(145, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:44'),
(146, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:45'),
(147, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:46'),
(148, 'xeqtr', 'aaa', 'Added theme per category, category: Zalbe, theme title: aaa, theme name: aa', '2022-10-31 18:06:52'),
(149, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:56'),
(150, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:58'),
(151, 'xeqtr', 'fafafas', 'Added post per theme, category: Zalbe', '2022-10-31 18:06:59'),
(152, 'xeqtr', 'fafa', 'Removed theme, category: Zalbe', '2022-10-31 18:07:00'),
(153, 'xeqtr', 'aa', 'Removed theme, category: Zalbe', '2022-10-31 18:07:02'),
(154, 'xeqtr', 'TESTTS', 'Deleted post', '2022-10-31 23:41:15'),
(155, 'xeqtr', 'aaaaaaaaaaaaaaaaaaaaaa', 'Deleted post', '2022-10-31 23:42:03'),
(156, 'xeqtr', 'acabbbbbbb', 'Deleted post', '2022-10-31 23:42:23'),
(157, 'xeqtr', 'TESTTTTTTTTTTTTTTTTTTTTT', 'Deleted post', '2022-10-31 23:42:53'),
(158, 'xeqtr', 'TESTAAAAAAAAAHS', 'Deleted post', '2022-10-31 23:46:22'),
(159, 'xeqtr', 'aaaaaaaaaaaaaaaehs', 'Deleted post', '2022-11-01 23:23:57'),
(160, 'xeqtr', 'aaaaaaaaaaaaaaaaaaaaasfs', 'Deleted post', '2022-11-01 23:24:11'),
(161, 'xeqtr', 'fsafsafsa', 'Deleted post', '2022-11-01 23:24:13'),
(162, 'xeqtr', '485', 'Delete reply by an admin', '2022-11-01 23:29:53'),
(163, 'xeqtr', 'AAAAAAAAAAAAAAAAAAAAAAAAAHS', 'Moved post to subforum, subforum title: acaaaaaaaab, post title: AAAAAAAAAAAAAAAAAAAAAAAAAHS', '2022-11-02 19:34:05'),
(164, 'xeqtr', 'AAAAAAAAAAAAAAAAAAAAAAAAAHS', 'Moved post to subforum, subforum title: acab, post title: AAAAAAAAAAAAAAAAAAAAAAAAAHS', '2022-11-02 19:34:25'),
(165, 'xeqtr', 'afa', 'SubForum added, category: Prijava bugova, title of subforum: afa', '2022-11-02 19:36:31'),
(166, 'xeqtr', 'asdf', 'Moved post to subforum, subforum title: afa, post title: asdf', '2022-11-02 19:36:36'),
(167, 'xeqtr', 'fafaafafafafa', 'Moved post to subforum, subforum title: acab, post title: fafaafafafafa', '2022-11-02 19:38:42'),
(168, 'xeqtr', 'hahahahahah', 'Moved post to subforum, subforum title: acab, post title: hahahahahah', '2022-11-02 20:14:03'),
(169, 'xeqtr', '', 'Added post per theme, category: Zahtev za vracanje statsa', '2022-11-02 20:15:27'),
(170, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-11-02 20:15:29'),
(171, 'xeqtr', '', 'Added post per theme, category: Predlozi za server', '2022-11-02 20:15:43'),
(172, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-11-02 20:15:44'),
(173, 'xeqtr', 'hahahahahah', 'Removed subforum', '2022-11-02 20:15:45'),
(174, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-11-02 20:15:45'),
(175, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-11-02 20:15:46'),
(176, 'xeqtr', '', 'Added post per theme, category: Prijava bugova', '2022-11-02 20:15:53'),
(177, 'xeqtr', 'asdf', 'Removed subforum', '2022-11-02 20:15:54'),
(178, 'xeqtr', '', 'Added post per theme, category: Konkursi', '2022-11-02 20:16:05'),
(179, 'xeqtr', 'There wasn\'t any post in this suboforum', 'Removed subforum', '2022-11-02 20:16:07'),
(180, 'xeqtr', 'acab', 'SubForum added, category: Zalbe, title of subforum: acab', '2022-11-02 20:16:21'),
(181, 'xeqtr', 'acabTESTACAB', 'Moved post to subforum, subforum title: acab, post title: acabTESTACAB', '2022-11-02 20:16:28'),
(182, 'xeqtr', 'TEST', 'SubForum added, category: Pravila, title of subforum: TEST', '2022-11-02 20:18:02'),
(183, 'xeqtr', 'aesss', 'Moved post to subforum, subforum title: TEST, post title: aesss', '2022-11-02 20:18:08'),
(184, 'xeqtr', 'acabhesheshsehs', 'Moved post to subforum, subforum title: TEST, post title: acabhesheshsehs', '2022-11-02 20:18:27'),
(185, 'xeqtr', 'acabbbbb', 'Moved post to subforum, subforum title: acab, post title: acabbbbb', '2022-11-02 20:18:40'),
(186, 'xeqtr', 'acabbbbb', 'Moved post to subforum, subforum title: TEST, post title: acabbbbb', '2022-11-03 01:08:36'),
(187, 'xeqtr', 'acabhesheshsehs', 'Moved post to subforum, subforum title: acab, post title: acabhesheshsehs', '2022-11-03 01:08:51'),
(188, 'xeqtr', '5252TEST', 'Moved post to subforum, subforum title: acab, post title: 5252TEST', '2022-11-03 01:14:59'),
(189, 'xeqtr', '5252TEST', 'Moved post to subforum, subforum title: TEST, post title: 5252TEST', '2022-11-03 01:17:00'),
(190, 'xeqtr', '5252TEST', 'Moved post to subforum, subforum title: acab, post title: 5252TEST', '2022-11-03 01:17:08'),
(191, 'xeqtr', 'aesss', 'Moved post to subforum, subforum title: acab, post title: aesss', '2022-11-03 01:33:51'),
(192, 'xeqtr', 'aesss', 'Moved post to subforum, subforum title: acab, post title: aesss', '2022-11-03 01:34:06'),
(193, 'xeqtr', 'acabbbbb', 'Moved post to subforum, subforum title: acab, post title: acabbbbb', '2022-11-03 01:40:09'),
(194, 'xeqtr', '5252TEST', 'Moved post to subforum, subforum title: TEST, post title: 5252TEST', '2022-11-03 01:58:32'),
(195, 'xeqtr', '', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:31:45'),
(196, 'xeqtr', 'aha', 'Removed theme, category: Predlozi za server', '2022-11-05 14:31:47'),
(197, 'xeqtr', 'ahgs', 'Added theme per category, category: Predlozi za server, theme title: ahgs, theme name: ahs', '2022-11-05 14:31:54'),
(198, 'xeqtr', 'fasfa', 'SubForum added, category: Predlozi za server, title of subforum: fasfa', '2022-11-05 14:32:01'),
(199, 'xeqtr', 'ahs', 'Moved post to subforum, subforum title: fasfa, post title: ahs', '2022-11-05 14:32:27'),
(200, 'xeqtr', 'ahs', 'Moved post to subforum, subforum title: acab, post title: ahs', '2022-11-05 14:32:42'),
(201, 'xeqtr', 'ahs', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:40:15'),
(202, 'xeqtr', 'afs', 'SubForum added, category: Predlozi za server, title of subforum: afs', '2022-11-05 14:43:20'),
(203, 'xeqtr', 'ahs', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:44:05'),
(204, 'xeqtr', '', 'Added theme per category, category: Predlozi za server, theme title: , theme name: ', '2022-11-05 14:44:09'),
(205, 'xeqtr', '', 'Added theme per category, category: Predlozi za server, theme title: , theme name: ', '2022-11-05 14:44:24'),
(206, 'xeqtr', 'ahs', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:44:33'),
(207, 'xeqtr', 'ahs', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:44:39'),
(208, 'xeqtr', '', 'Removed theme, category: Predlozi za server', '2022-11-05 14:44:40'),
(209, 'xeqtr', 'ahs', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:44:51'),
(210, 'xeqtr', 'ahs', 'Removed theme, category: Predlozi za server', '2022-11-05 14:44:52'),
(211, 'xeqtr', '', 'Added theme per category, category: Predlozi za server, theme title: , theme name: ', '2022-11-05 14:46:06'),
(212, 'xeqtr', '', 'Added theme per category, category: Predlozi za server, theme title: , theme name: ', '2022-11-05 14:47:42'),
(213, 'xeqtr', '', 'Added theme per category, category: Predlozi za server, theme title: , theme name: ', '2022-11-05 14:48:08'),
(214, 'xeqtr', '', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:48:12'),
(215, 'xeqtr', 'fasf', 'Added theme per category, category: Predlozi za server, theme title: fasf, theme name: afs', '2022-11-05 14:50:50'),
(216, 'xeqtr', '', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:50:54'),
(217, 'xeqtr', '', 'Removed theme, category: Predlozi za server', '2022-11-05 14:50:55'),
(218, 'xeqtr', 'afs', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:54:23'),
(219, 'xeqtr', 'afs', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:58:11'),
(220, 'xeqtr', 'afs', 'Removed theme, category: Predlozi za server', '2022-11-05 14:58:22'),
(221, 'xeqtr', 'ACAB', 'Added theme per category, category: Predlozi za server, theme title: ACAB, theme name: test', '2022-11-05 14:59:32'),
(222, 'xeqtr', 'test', 'Added post per theme, category: Predlozi za server', '2022-11-05 14:59:48'),
(223, 'xeqtr', 'es', 'SubForum added, category: Predlozi za server, title of subforum: es', '2022-11-05 15:07:58'),
(224, 'xeqtr', 'fasfaa', 'SubForum added, category: Predlozi za server, title of subforum: fasfaa', '2022-11-05 15:19:43'),
(225, 'xeqtr', 'afsfs', 'Moved post to subforum, subforum title: fasfaa, post title: afsfs', '2022-11-05 15:19:57'),
(226, 'xeqtr', 'fas', 'Added pinned theme', '2022-11-05 17:00:57'),
(227, 'xeqtr', 'acab', 'Added pinned theme', '2022-11-05 19:53:31'),
(228, 'xeqtr', 'acabEH', 'Added pinned theme', '2022-11-05 21:29:12'),
(229, 'xeqtr', 'fafsafsa', 'Added pinned theme', '2022-11-06 00:01:00'),
(230, 'xeqtr', '', 'Added pinned theme', '2022-11-06 18:34:18'),
(231, 'xeqtr', 'fasfafsa', 'Added pinned theme', '2022-11-06 18:35:15'),
(232, 'xeqtr', 'acabESESES', 'Added pinned theme', '2022-11-06 18:36:11'),
(233, 'xeqtr', 'fasfasfsa', 'Added pinned theme', '2022-11-06 18:37:22'),
(234, 'xeqtr', 'fasfas', 'Added pinned theme', '2022-11-06 18:41:36'),
(235, 'xeqtr', 'fasfsa', 'Added pinned theme', '2022-11-06 18:49:33'),
(236, 'xeqtr', 'HAHAHAH', 'Added pinned theme', '2022-11-06 18:49:47'),
(237, 'xeqtr', 'fasfasf', 'Added pinned theme', '2022-11-10 13:41:53'),
(238, 'xeqtr', 'fasfasf', 'Added pinned theme', '2022-11-10 13:42:37'),
(239, 'xeqtr', 'fasfafasf', 'Added pinned theme', '2022-11-10 13:44:11'),
(240, 'xeqtr', 'fafsafas', 'Added pinned theme', '2022-11-10 13:44:22'),
(241, 'xeqtr', 'faesfaes', 'Added pinned theme', '2022-11-10 13:48:31'),
(242, 'xeqtr', 'fasfa', 'Added pinned theme', '2022-11-10 13:53:25'),
(243, 'xeqtr', 'test', 'Added post per theme, category: Predlozi za server', '2022-11-10 14:08:06'),
(244, 'xeqtr', 'faefasfeafeas', 'Added theme per category, category: Predlozi za server, theme title: faefasfeafeas, theme name: afeasfe', '2022-11-10 16:36:16'),
(245, 'xeqtr', 'test', 'Added theme per category, category: Firme Biznisi, theme title: test, theme name: acabtest', '2022-11-11 11:14:38'),
(246, 'xeqtr', 'test', 'Added post per theme, category: Predlozi za server', '2022-11-11 12:20:00'),
(247, 'xeqtr', 'acabtest', 'Added post per theme, category: Firme Biznisi', '2022-11-11 14:57:54'),
(248, 'xeqtr', 'fasfsa', 'Added theme per category, category: Firme Biznisi, theme title: fasfsa, theme name: acabtest', '2022-11-11 15:00:16'),
(249, 'xeqtr', 'acabtest', 'Removed theme, category: Firme Biznisi', '2022-11-11 15:43:43'),
(250, 'xeqtr', 'aehs', 'Removed theme, category: Firme Biznisi', '2022-11-11 15:43:45'),
(251, 'xeqtr', 'fasfsa', 'SubForum added, category: Firme Biznisi, title of subforum: fasfsa', '2022-11-11 15:43:51'),
(252, 'xeqtr', 'fasf', 'Added theme per category, category: Firme Biznisi, theme title: fasf, theme name: fas', '2022-11-11 15:45:08'),
(253, 'xeqtr', 'fasffafafaAHEASHEAS', 'Added theme per category, category: Firme Biznisi, theme title: fasffafafaAHEASHEAS, theme name: AAAAAAAAHES', '2022-11-11 15:47:50'),
(254, 'xeqtr', 'fasfafafa', 'Removed theme, category: Firme Biznisi', '2022-11-11 15:48:02'),
(255, 'xeqtr', 'fasefe', 'Added theme per category, category: Zalbe, theme title: fasefe, theme name: faefeas', '2022-11-11 17:13:17'),
(256, 'xeqtr', 'fsafsa', 'Added theme per category, category: Zalbe, theme title: fsafsa, theme name: fasfsa', '2022-11-11 17:14:47'),
(257, 'xeqtr', 'fsafas', 'Added theme per category, category: Zalbe, theme title: fsafas, theme name: fasfasafafa', '2022-11-11 17:14:57'),
(258, 'xeqtr', 'asd', 'Removed theme, category: Pravila', '2022-11-11 17:16:09'),
(259, 'xeqtr', 'afeasfe', 'Removed theme, category: Predlozi za server', '2022-11-12 11:32:13'),
(260, 'xeqtr', 'test', 'Removed theme, category: Predlozi za server', '2022-11-12 11:32:14'),
(261, 'xeqtr', 'fsafsaf', 'Added theme per category, category: Predlozi za server, theme title: fsafsaf, theme name: fasfsa', '2022-11-12 11:32:20'),
(262, 'xeqtr', 'fasfsa', 'Added post per theme, category: Predlozi za server', '2022-11-12 11:32:30'),
(263, 'xeqtr', 'fafa', 'Added theme per category, category: Predlozi za server, theme title: fafa, theme name: fafa', '2022-11-12 11:35:16'),
(264, 'xeqtr', 'fafa', 'Added post per theme, category: Predlozi za server', '2022-11-12 11:35:25'),
(265, 'xeqtr', 'fafa', 'SubForum added, category: Predlozi za server, title of subforum: fafa', '2022-11-12 11:36:25'),
(266, 'xeqtr', 'Acaba12', 'SubForum added, category: Predlozi za server, title of subforum: Acaba12', '2022-11-12 11:39:08'),
(267, 'xeqtr', 'hahassssssssssssss', 'Moved post to subforum, subforum title: TEST, post title: hahassssssssssssss', '2022-11-12 11:39:34'),
(268, 'xeqtr', 'hahassssssssssssss', 'Locked thread, post title: hahassssssssssssss ', '2022-11-12 11:39:52'),
(269, 'xeqtr', 'hahassssssssssssss', 'Unlocked thread, post title: hahassssssssssssss ', '2022-11-12 11:39:56'),
(270, 'xeqtr', 'fafa', 'Added theme per category, category: Pravila, theme title: fafa, theme name: fasf', '2022-11-12 11:44:28'),
(271, 'xeqtr', 'fafa', 'Added theme per category, category: Pravila, theme title: fafa, theme name: eseses', '2022-11-12 11:44:38'),
(272, 'xeqtr', '330', 'Updated reply', '2022-11-12 13:34:17'),
(273, 'xeqtr', '330', 'Updated reply', '2022-11-12 13:34:33'),
(274, 'xeqtr', '330', 'Updated reply', '2022-11-12 13:34:57'),
(275, 'xeqtr', '330', 'Updated reply', '2022-11-12 13:35:04'),
(276, 'xeqtr', '330', 'Updated reply', '2022-11-12 13:35:07'),
(277, 'test123', 'acabehehe', 'Added post per theme, category: Pravila', '2022-11-12 13:48:19'),
(278, 'test123', 'FEASFEASF', 'Deleted reply, there wasn\'t any posts in current theme so theme is auto-deleted FEASFEASF', '2022-11-12 13:48:26'),
(279, 'test123', 'adadadadadadadada', 'Locked thread, post title: adadadadadadadada ', '2022-11-12 13:49:31'),
(280, 'test123', 'adadadadadadadada', 'Unlocked thread, post title: adadadadadadadada ', '2022-11-12 13:49:35'),
(281, 'test123', 'adadadadadadadada', 'Moved topic to category, category: Predlozi za server, post title: adadadadadadadada ', '2022-11-12 13:49:41'),
(282, 'xeqtr', 'hahassssssssssssss', 'Deleted post', '2022-11-12 13:55:06'),
(283, 'xeqtr', 'acab', 'Removed theme, category: Pravila', '2022-11-12 18:32:52'),
(284, 'xeqtr', 'bres', 'Moved post to subforum, subforum title: Acaba12, post title: bres', '2022-11-12 18:58:05'),
(285, 'xeqtr', '489', 'Delete reply by an admin', '2022-11-12 18:58:29'),
(286, 'xeqtr', '490', 'Delete reply by an admin', '2022-11-12 18:58:30'),
(287, 'xeqtr', '452', 'Delete reply by an admin', '2022-11-12 18:58:32'),
(288, 'xeqtr', 'adadadadadadadada', 'Moved post to subforum, subforum title: Acaba12, post title: adadadadadadadada', '2022-11-12 18:58:47'),
(289, 'xeqtr', 'adadadadadadadada', 'Moved post to subforum, subforum title: Acaba12, post title: adadadadadadadada', '2022-11-12 19:02:36'),
(290, 'xeqtr', 'acabAHSHSHS', 'Moved post to subforum, subforum title: Acaba12, post title: acabAHSHSHS', '2022-11-12 19:03:48'),
(291, 'xeqtr', 'fafaf', 'SubForum added, category: Zahtev za vracanje statsa, title of subforum: fafaf', '2022-11-12 23:22:06'),
(292, 'xeqtr', 'hasehashasehasehase', 'Moved post to subforum, subforum title: fafaf, post title: hasehashasehasehase', '2022-11-12 23:22:14'),
(293, 'xeqtr', 'aaaaaaaaaaaaaaaafs', 'Moved post to subforum, subforum title: Acaba12, post title: aaaaaaaaaaaaaaaafs', '2022-11-12 23:22:30'),
(294, 'xeqtr', 'AAAAAAAAHES', 'Removed theme, category: Firme Biznisi', '2022-11-21 02:27:32'),
(295, 'xeqtr', '611', 'Updated reply, reply id = 611', '2022-11-21 02:27:42'),
(296, 'xeqtr', '611', 'Updated reply, reply id = 611', '2022-11-21 02:30:11'),
(297, 'xeqtr', '606', 'Delete reply by an admin', '2022-11-21 14:09:00'),
(298, 'xeqtr', '605', 'Delete reply by an admin', '2022-11-21 14:09:02'),
(299, 'xeqtr', '587', 'Delete reply by an admin', '2022-11-21 14:09:07'),
(300, 'xeqtr', 'aHESTTEST', 'Moved post to subforum, subforum title: TEST, post title: aHESTTEST', '2022-11-21 15:35:52'),
(301, 'xeqtr', 'acabbbbbasf', 'Locked thread, post title: acabbbbbasf ', '2022-11-21 17:53:34'),
(302, 'xeqtr', 'acabbbbbasf', 'Unlocked thread, post title: acabbbbbasf ', '2022-11-21 17:53:39'),
(303, 'xeqtr', '461', 'Updated reply, reply id = 461', '2022-11-21 17:54:23'),
(304, 'xeqtr', 'aes', 'Moved post to subforum, subforum title: Acaba12, post title: aes', '2022-11-21 17:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `overwatchusers`
--

CREATE TABLE `overwatchusers` (
  `ow_id` int(11) NOT NULL,
  `ow_username` varchar(100) NOT NULL,
  `ow_updatedusername` varchar(100) NOT NULL,
  `ow_sectionupdated` varchar(100) NOT NULL,
  `ow_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `overwatchusers`
--

INSERT INTO `overwatchusers` (`ow_id`, `ow_username`, `ow_updatedusername`, `ow_sectionupdated`, `ow_date`) VALUES
(1, 'xeqtr', 'test123', 'Helper Added', '2022-10-13 00:29:10'),
(2, 'xeqtr', 'test123', 'Added role, Director', '2022-10-16 02:01:10'),
(3, 'test123', 'test123', 'User has been auto-unbanned', '2022-10-19 02:35:41'),
(4, 'xeqtr', 'test123', 'Banned user', '2022-10-19 03:34:18'),
(5, 'xeqtr', 'test123', 'Banned user', '2022-10-19 03:53:10'),
(6, 'xeqtr', 'test123', 'Banned user', '2022-10-19 04:07:44'),
(7, 'xeqtr', 'test123', 'Unbanned user', '2022-10-19 23:32:21'),
(8, 'xeqtr', 'test123', 'Banned user', '2022-10-19 23:39:50'),
(9, 'xeqtr', 'test123', 'Unbanned user', '2022-10-19 23:40:57'),
(10, 'xeqtr', 'test123', 'Banned user', '2022-10-19 23:41:02'),
(11, 'xeqtr', 'test123', 'Unbanned user', '2022-10-19 23:51:47'),
(12, 'xeqtr', 'test123', 'Banned user', '2022-10-19 23:51:52'),
(13, 'xeqtr', 'test123', 'Unbanned user', '2022-10-19 23:58:26'),
(14, 'xeqtr', 'test123', 'Banned user', '2022-10-20 00:12:18'),
(15, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 00:25:23'),
(16, 'xeqtr', 'test123', 'Banned user', '2022-10-20 00:25:30'),
(17, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 00:48:52'),
(18, 'xeqtr', 'test123', 'Banned user', '2022-10-20 00:49:02'),
(19, 'xeqtr', 'test123', 'Banned user', '2022-10-20 01:21:53'),
(20, 'xeqtr', 'test123', 'Banned user', '2022-10-20 01:39:05'),
(21, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 01:40:06'),
(22, 'xeqtr', 'test123', 'Banned user', '2022-10-20 01:40:41'),
(23, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 01:40:52'),
(24, 'xeqtr', 'test123', 'Banned user', '2022-10-20 02:05:00'),
(25, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 03:38:09'),
(26, 'xeqtr', 'test123', 'Banned user', '2022-10-20 03:38:33'),
(27, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 03:46:14'),
(28, 'xeqtr', 'test123', 'Banned user', '2022-10-20 03:46:22'),
(29, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 03:47:56'),
(30, 'xeqtr', 'test123', 'Banned user', '2022-10-20 03:48:17'),
(31, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 14:58:18'),
(32, 'xeqtr', 'test123', 'Banned user', '2022-10-20 15:01:45'),
(33, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 15:06:50'),
(34, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 15:12:24'),
(35, 'xeqtr', 'test123', 'Banned user', '2022-10-20 15:12:30'),
(36, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 15:14:58'),
(37, 'xeqtr', 'test123', 'Banned user', '2022-10-20 15:15:52'),
(38, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 15:17:18'),
(39, 'xeqtr', 'test123', 'Banned user', '2022-10-20 15:17:24'),
(40, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 15:18:26'),
(41, 'xeqtr', 'test123', 'Banned user', '2022-10-20 15:18:31'),
(42, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 15:19:29'),
(43, 'xeqtr', 'test123', 'Banned user', '2022-10-20 15:19:38'),
(44, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 15:40:22'),
(45, 'xeqtr', 'test123', 'Banned user', '2022-10-20 23:19:33'),
(46, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 23:19:40'),
(47, 'xeqtr', 'test123', 'Banned user', '2022-10-20 23:20:27'),
(48, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 23:20:40'),
(49, 'xeqtr', 'test123', 'Banned user', '2022-10-20 23:22:28'),
(50, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 23:22:30'),
(51, 'xeqtr', 'test123', 'Banned user', '2022-10-20 23:26:14'),
(52, 'xeqtr', 'test123', 'Unbanned user', '2022-10-20 23:26:23'),
(53, 'xeqtr', 'test123', 'Banned user', '2022-10-20 23:27:23'),
(54, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-21 00:03:08'),
(55, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-21 00:03:15'),
(56, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-21 00:05:57'),
(57, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-21 00:19:35'),
(58, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-21 00:34:22'),
(59, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-21 00:38:49'),
(60, 'xeqtr', 'xeqtr', 'Updated location or steamtag, by USER', '2022-10-21 00:45:38'),
(61, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-26 23:10:30'),
(62, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-26 23:33:51'),
(63, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-26 23:34:00'),
(64, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-26 23:34:37'),
(65, 'xeqtr', 'xeqtr', 'Updated password, by USER', '2022-10-26 23:51:45'),
(66, 'xeqtr', 'test123', 'Unbanned user', '2022-10-29 20:58:03'),
(67, 'xeqtr', 'test123', 'Remove role, Director', '2022-10-29 20:58:17'),
(68, 'xeqtr', 'test123', 'Added role, Community Manager', '2022-10-31 23:48:42'),
(69, 'xeqtr', 'fasf', 'Added news', '2022-11-21 17:26:48'),
(70, 'xeqtr', 'Acab1312', 'Verificated user by Admin', '2022-11-21 17:55:48'),
(71, 'xeqtr', 'test123', 'Remove role, Community Manager', '2022-11-21 18:00:05');

-- --------------------------------------------------------

--
-- Table structure for table `pinnedthemes`
--

CREATE TABLE `pinnedthemes` (
  `pinned_id` int(11) NOT NULL,
  `pinned_title` varchar(100) NOT NULL,
  `pinned_username` varchar(100) NOT NULL,
  `pinned_image` varchar(100) NOT NULL,
  `pinned_content` text NOT NULL,
  `pinned_subforum` varchar(100) NOT NULL,
  `pinned_userip` varchar(100) NOT NULL,
  `pinned_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pinnedthemes_replies`
--

CREATE TABLE `pinnedthemes_replies` (
  `pinnedtheme_r_id` int(255) NOT NULL,
  `pinnedtheme_pinned_title` varchar(100) NOT NULL,
  `pinnedtheme_username` varchar(100) NOT NULL,
  `pinnedtheme_content` text NOT NULL,
  `pinnedtheme_userip` varchar(100) NOT NULL,
  `pinnedtheme_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pinnedthemes_replies`
--

INSERT INTO `pinnedthemes_replies` (`pinnedtheme_r_id`, `pinnedtheme_pinned_title`, `pinnedtheme_username`, `pinnedtheme_content`, `pinnedtheme_userip`, `pinnedtheme_date`) VALUES
(9, 'acabESESES', 'xeqtr', '<p></p>\n', '::1', '2022-11-06 18:36:11'),
(34, '', 'xeqtr', '<p>a</p>', '::1', '2022-11-10 13:48:53'),
(35, '', 'xeqtr', '<p>asfeasfeasfeasfeas</p>', '::1', '2022-11-10 13:49:04');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postid` int(100) NOT NULL,
  `postusername` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `idsubcategory` int(10) NOT NULL,
  `posttitle` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `isLocked` tinyint(1) NOT NULL,
  `postdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postid`, `postusername`, `category`, `idsubcategory`, `posttitle`, `content`, `isLocked`, `postdate`) VALUES
(88, 'xeqtr', 'Zalbe', 55, 'ahs', '<p></p>\n<iframe width=\"auto\" height=\"auto\" src=\"https://www.youtube.com/embed/EQiCQghDRi4&ab_channel=BalkatonGang\" frameBorder=\"0\"></iframe>\n<p></p>\n', 0, '2022-11-05 14:32:42'),
(89, 'xeqtr', 'Predlozi za server', 60, 'afsfs', '<blockquote>fasfsafsafasfas</blockquote>\n', 0, '2022-11-05 15:19:57'),
(93, 'test123', 'Prijava bugova', 0, 'hahahahaha', '<p>acab</p>\n', 0, '2022-10-02 23:19:33'),
(97, 'xeqtr', 'Zahtev za vracanje statsa', 64, 'hasehashasehasehase', '<p style=\"margin-left:0px;\"></p>\n<pre style=\"margin-left:0px;\"><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: var(--fs-body1);font-family: var(--ff-mono);\"><code>&lt;p&gt;&lt;</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>/p&gt;&lt;blockquote&gt;tweet tweet tweet&lt;/</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: var(--fs-body1);font-family: var(--ff-mono);\"><code>blockquote&gt;</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>&lt;</code></span><span style=\"color: var(--highlight-namespace);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>p</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>&gt;&lt;/</code></span><span style=\"color: var(--highlight-namespace);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>p</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>&gt;</code></span></pre>\n<p style=\"margin-left:0px;\"></p>\n<img src=\"https://imgur.com/oy430xV\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n<p style=\"margin-left:0px;\"></p>\n<p style=\"text-align:left;\"></p>\n<p style=\"margin-left:0px;\"></p>\n<p><br>&nbsp;</p>\n', 0, '2022-11-12 23:22:14'),
(98, 'xeqtr', 'Predlozi za server', 63, 'aaaaaaaaaaaaaaaafs', '<p></p>\n<iframe width=\"auto\" height=\"auto\" src=\"https://imgur.com/oy430xV\" frameBorder=\"0\"></iframe>\n<p></p>\n<div style=\"text-align:right;\"><img src=\"https://imgur.com/oy430xV\" alt=\"undefined\" style=\"height: auto;width: auto\"/></div>\n<p></p>\n<img src=\"[img]https://i.imgur.com/oy430xV.jpg[/img]\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n<img src=\"<blockquote class=\"imgur-embed-pub\" lang=\"en\" data-id=\"oy430xV\"><a href=\"https://imgur.com/oy430xV\">View post on imgur.com</a></blockquote><script async src=\"//s.imgur.com/min/embed.js\" charset=\"utf-8\"></script>\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n<img src=\"[Imgur](https://imgur.com/oy430xV)\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n', 0, '2022-11-12 23:22:30'),
(101, 'xeqtr', 'Zahtevi', 0, 'hahahahahahahahhaahhaha', '<iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.youtube.com/embed/GG_PlVm1Cyk?showinfo=0\"></iframe><p><br></p>', 0, '2022-10-29 01:32:09'),
(107, 'xeqtr', 'Predlozi za server', 63, 'aes', '<h1><strong><em><s>fasssssssssssssss</s></em></strong></h1>', 0, '2022-11-21 17:56:27'),
(108, 'xeqtr', 'Zalbe', 55, 'aesss', '<p>AS<span style=\"background-color: rgb(0, 0, 0);\">E</span><span style=\"background-color: rgb(230, 0, 0);\">HASEAHESAHSEAHES</span></p>', 0, '2022-11-03 01:33:51'),
(109, 'xeqtr', 'Predlozi za server', 63, 'bres', '<h1><a href=\"https://i.imgur.com/g5jwPPE.jpeg\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(230, 0, 0);\"><em>acabbbbbb</em></a></h1><p><br></p>', 0, '2022-11-12 18:58:05'),
(110, 'test123', 'Konkursi', 0, 'ehs', '<p>pa e</p>', 0, '2022-10-12 01:30:43'),
(112, 'xeqtr', 'Pravila', 0, 'ehsahs', '<blockquote>acab</blockquote>', 0, '2022-10-14 22:08:02'),
(116, 'xeqtr', 'Zalbe', 55, 'acabbbbb', '<p>acab</p>', 0, '2022-11-03 01:40:09'),
(117, 'xeqtr', 'Konkursi', 0, 'acaaaaaaaaaab', '<p>acabbbbb</p>', 0, '2022-10-29 01:33:38'),
(118, 'xeqtr', 'Zahtev za vracanje statsa', 0, 'acabbbbbasf', '<p>bbbb</p>', 0, '2022-11-21 17:53:39'),
(119, 'xeqtr', 'Prijava bugova', 0, 'ahahaes', '<p>aheasheasheahaha</p>', 0, '2022-10-15 00:20:26'),
(120, 'xeqtr', 'Prijava bugova', 0, 'acabheshes', '<p>aheasheashea</p>', 0, '2022-10-15 00:37:30'),
(121, 'xeqtr', 'Pravila', 0, 'ehsaseafease', '<p>acab</p>', 0, '2022-10-15 00:56:53'),
(122, 'xeqtr', 'Firme Biznisi', 0, 'gsgsgsgs', '<p>ahga</p>', 0, '2022-10-15 01:09:24'),
(123, 'xeqtr', 'Zalbe', 55, 'acabhesheshsehs', '<p>hehehes</p>', 0, '2022-11-03 01:08:51'),
(124, 'xeqtr', 'Prijava bugova', 0, 'ahes', '<p>acab</p>', 0, '2022-10-25 19:17:34'),
(125, 'xeqtr', 'Prijava bugova', 0, 'ahses', '<p>ahseeeeeeeees</p>', 0, '2022-10-25 19:17:45'),
(127, 'xeqtr', 'Firme Biznisi', 0, 'acab', '<p>test</p>', 0, '2022-10-29 01:33:02'),
(129, 'xeqtr', 'Pravila', 56, '5252TEST', '<p>TESTACAB</p>', 0, '2022-11-03 01:58:32'),
(130, 'xeqtr', 'Konkursi', 0, 'TYEST', '<p>acab</p>', 0, '2022-10-29 01:32:22'),
(131, 'xeqtr', 'Prijava bugova', 0, 'TESACAB', '<p>acab</p>', 0, '2022-10-25 19:52:56'),
(132, 'xeqtr', 'Zalbe', 55, 'acabTESTACAB', '<p>acab</p>', 0, '2022-11-02 20:16:28'),
(134, 'xeqtr', 'Predlozi za server', 63, 'acabAHSHSHS', '<p>TESTACAB</p>', 0, '2022-11-12 19:03:48'),
(135, 'xeqtr', 'Pravila', 56, 'aHESTTEST', '<p>acab131222</p>', 0, '2022-11-21 15:35:52'),
(136, 'xeqtr', 'Pravila', 0, 'paes', '<p>ap radiesejs</p>', 0, '2022-10-25 19:58:21'),
(141, 'xeqtr', 'Zahtev za vracanje statsa', 0, 'tesesaea', '<p>easesaesaasesaesa</p>', 0, '2022-10-28 18:08:33'),
(142, 'xeqtr', 'Zahtev za vracanje statsa', 0, 'aadsasaaa', '<p>fasfa</p>', 0, '2022-10-28 18:08:37'),
(143, 'xeqtr', 'Zahtev za vracanje statsa', 0, 'fafafafafa', '<p>faafa</p>', 0, '2022-10-28 18:08:40'),
(144, 'xeqtr', 'Zahtev za vracanje statsa', 0, 'fafafa', '<p>fafa</p>', 0, '2022-10-28 18:08:43'),
(146, 'xeqtr', 'Firme Biznisi', 0, 'aaaaaaaaaaaaahs', '<blockquote>faseafse</blockquote><blockquote>fasfsafas</blockquote><blockquote>fsa</blockquote><blockquote>fas</blockquote><blockquote>fsa</blockquote><blockquote>f</blockquote><blockquote>as</blockquote><blockquote><br></blockquote>', 0, '2022-10-28 21:04:55'),
(147, 'xeqtr', 'Predlozi za server', 63, 'adadadadadadadada', '<blockquote>fasfasfasfasfas</blockquote><pre class=\"ql-syntax\" spellcheck=\"false\">adadsadsadasdasdasdasdasdsad\nasdas\ndasd\nasd\nas\nd\nsad\nas\n\n</pre><blockquote><br></blockquote><blockquote><br></blockquote>', 0, '2022-11-12 18:58:47'),
(150, 'xeqtr', 'Zahtev za vracanje statsa', 0, 'hehehehehe', '<p>aaaaahes</p>', 0, '2022-11-21 01:30:59');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `q_id` int(255) NOT NULL,
  `q_category` varchar(100) NOT NULL,
  `q_posttitle` varchar(100) NOT NULL,
  `q_whowrote` varchar(100) NOT NULL,
  `q_time` varchar(100) NOT NULL,
  `q_content` text NOT NULL,
  `q_repliedcontent` text NOT NULL,
  `q_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `replyid` int(11) NOT NULL,
  `reply_username` varchar(100) NOT NULL,
  `reply_category` varchar(100) NOT NULL,
  `reply_content` varchar(10000) NOT NULL,
  `reply_post` varchar(100) NOT NULL,
  `e_whoedited` varchar(100) NOT NULL,
  `e_hwtedited` int(255) NOT NULL,
  `e_date` varchar(100) NOT NULL,
  `reply_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`replyid`, `reply_username`, `reply_category`, `reply_content`, `reply_post`, `e_whoedited`, `e_hwtedited`, `e_date`, `reply_date`) VALUES
(360, 'xeqtr', 'Predlozi za server', '<p></p>\n<iframe width=\"auto\" height=\"auto\" src=\"https://www.youtube.com/embed/EQiCQghDRi4&ab_channel=BalkatonGang\" frameBorder=\"0\"></iframe>\n<p></p>\n', 'ahs', '', 0, '', '2022-09-26 18:33:08'),
(361, 'xeqtr', 'Firme Biznisi', '<blockquote>fasfsafsafasfas</blockquote>\n', 'afsfs', '', 0, '', '2022-09-26 22:17:32'),
(368, 'test123', 'Prijava bugova', '<p>acab</p>\n', 'hahahahaha', '', 0, '', '2022-10-02 23:19:33'),
(369, 'xeqtr', 'Firme Biznisi', 'aha', 'afsfs', '', 0, '', '2022-10-03 02:36:03'),
(370, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 02:36:05'),
(371, 'xeqtr', 'Firme Biznisi', 'asd', 'afsfs', '', 0, '', '2022-10-03 02:39:37'),
(372, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 02:39:39'),
(373, 'xeqtr', 'Firme Biznisi', 'hahaha', 'afsfs', '', 0, '', '2022-10-03 02:39:41'),
(374, 'xeqtr', 'Firme Biznisi', 'hahahaha', 'afsfs', '', 0, '', '2022-10-03 02:39:42'),
(375, 'xeqtr', 'Firme Biznisi', 'hahah', 'afsfs', '', 0, '', '2022-10-03 02:39:45'),
(376, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 02:39:47'),
(377, 'xeqtr', 'Firme Biznisi', 'asasdsa', 'afsfs', '', 0, '', '2022-10-03 02:39:49'),
(378, 'xeqtr', 'Firme Biznisi', 'adssasadasdasdasd', 'afsfs', '', 0, '', '2022-10-03 02:39:51'),
(379, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 02:39:52'),
(380, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 02:39:53'),
(381, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 02:39:55'),
(382, 'xeqtr', 'Firme Biznisi', 'aha', 'afsfs', '', 0, '', '2022-10-03 02:41:20'),
(383, 'xeqtr', 'Firme Biznisi', 'hahaha', 'afsfs', '', 0, '', '2022-10-03 02:41:22'),
(384, 'xeqtr', 'Firme Biznisi', 'hahaha', 'afsfs', '', 0, '', '2022-10-03 02:41:23'),
(385, 'xeqtr', 'Firme Biznisi', 'haha', 'afsfs', '', 0, '', '2022-10-03 02:43:12'),
(386, 'xeqtr', 'Firme Biznisi', 'feasfesa', 'afsfs', '', 0, '', '2022-10-03 03:03:11'),
(387, 'xeqtr', 'Firme Biznisi', 'fasefsa', 'afsfs', '', 0, '', '2022-10-03 03:03:12'),
(388, 'xeqtr', 'Firme Biznisi', 'fasefsa', 'afsfs', '', 0, '', '2022-10-03 03:03:14'),
(389, 'xeqtr', 'Firme Biznisi', 'fasefsae', 'afsfs', '', 0, '', '2022-10-03 03:03:15'),
(390, 'xeqtr', 'Firme Biznisi', 'fasefase', 'afsfs', '', 0, '', '2022-10-03 03:03:16'),
(391, 'xeqtr', 'Firme Biznisi', 'fasefasef', 'afsfs', '', 0, '', '2022-10-03 03:03:17'),
(392, 'xeqtr', 'Firme Biznisi', 'fasefsae', 'afsfs', '', 0, '', '2022-10-03 03:03:18'),
(393, 'xeqtr', 'Firme Biznisi', 'fasefsa', 'afsfs', '', 0, '', '2022-10-03 03:03:19'),
(394, 'xeqtr', 'Firme Biznisi', 'feasfeasf', 'afsfs', '', 0, '', '2022-10-03 03:03:20'),
(395, 'xeqtr', 'Firme Biznisi', 'fasefasef', 'afsfs', '', 0, '', '2022-10-03 03:03:26'),
(396, 'xeqtr', 'Firme Biznisi', 'fasefase', 'afsfs', '', 0, '', '2022-10-03 03:03:28'),
(397, 'xeqtr', 'Firme Biznisi', 'fasefasefa', 'afsfs', '', 0, '', '2022-10-03 03:03:29'),
(398, 'xeqtr', 'Firme Biznisi', 'fasefasfesa', 'afsfs', '', 0, '', '2022-10-03 03:03:31'),
(399, 'xeqtr', 'Firme Biznisi', 'fasefasf', 'afsfs', '', 0, '', '2022-10-03 03:03:33'),
(400, 'xeqtr', 'Firme Biznisi', 'fasefasef', 'afsfs', '', 0, '', '2022-10-03 03:03:34'),
(401, 'xeqtr', 'Firme Biznisi', 'fasefasefas', 'afsfs', '', 0, '', '2022-10-03 03:03:35'),
(402, 'xeqtr', 'Firme Biznisi', 'afsdfasdf', 'afsfs', '', 0, '', '2022-10-03 03:03:39'),
(403, 'xeqtr', 'Firme Biznisi', 'fasdfas', 'afsfs', '', 0, '', '2022-10-03 03:03:40'),
(404, 'xeqtr', 'Firme Biznisi', 'fasdfsafd', 'afsfs', '', 0, '', '2022-10-03 03:03:41'),
(405, 'xeqtr', 'Firme Biznisi', 'aa', 'afsfs', '', 0, '', '2022-10-03 03:03:42'),
(406, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 03:03:43'),
(407, 'xeqtr', 'Firme Biznisi', 'aaaaaaaaaaa', 'afsfs', '', 0, '', '2022-10-03 03:03:45'),
(408, 'xeqtr', 'Firme Biznisi', 'aaaaaaaaaa', 'afsfs', '', 0, '', '2022-10-03 03:03:46'),
(409, 'xeqtr', 'Firme Biznisi', 'afsefase', 'afsfs', '', 0, '', '2022-10-03 03:03:51'),
(410, 'xeqtr', 'Firme Biznisi', 'fasefas', 'afsfs', '', 0, '', '2022-10-03 03:03:52'),
(411, 'xeqtr', 'Firme Biznisi', 'hahaha', 'afsfs', '', 0, '', '2022-10-03 03:03:54'),
(412, 'xeqtr', 'Firme Biznisi', 'faesfasefas', 'afsfs', '', 0, '', '2022-10-03 03:03:56'),
(413, 'xeqtr', 'Firme Biznisi', 'fasefasefas', 'afsfs', '', 0, '', '2022-10-03 03:03:58'),
(414, 'xeqtr', 'Firme Biznisi', 'fafafa', 'afsfs', '', 0, '', '2022-10-03 03:03:59'),
(415, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 03:04:01'),
(416, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 03:04:03'),
(417, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 03:04:05'),
(418, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 03:04:07'),
(419, 'xeqtr', 'Firme Biznisi', '', 'afsfs', '', 0, '', '2022-10-03 03:04:07'),
(420, 'xeqtr', 'Firme Biznisi', 'a', 'afsfs', '', 0, '', '2022-10-03 03:04:09'),
(421, 'xeqtr', 'Firme Biznisi', 'asaese', 'afsfs', '', 0, '', '2022-10-03 03:04:11'),
(422, 'xeqtr', 'Firme Biznisi', 'eses', 'afsfs', '', 0, '', '2022-10-03 03:04:12'),
(423, 'xeqtr', 'Firme Biznisi', 'esese', 'afsfs', '', 0, '', '2022-10-03 03:04:14'),
(424, 'xeqtr', 'Firme Biznisi', 'eseses', 'afsfs', '', 0, '', '2022-10-03 03:04:15'),
(425, 'xeqtr', 'Firme Biznisi', 'hahaha', 'afsfs', '', 0, '', '2022-10-03 03:06:57'),
(426, 'xeqtr', 'Firme Biznisi', 'afseafeasfe', 'afsfs', '', 0, '', '2022-10-03 03:06:58'),
(427, 'xeqtr', 'Firme Biznisi', 'fasefasefasef', 'afsfs', '', 0, '', '2022-10-03 03:06:59'),
(428, 'xeqtr', 'Firme Biznisi', 'fasefasefasfeas', 'afsfs', '', 0, '', '2022-10-03 03:07:00'),
(429, 'xeqtr', 'Prijava bugova', '[b]acab[/b]', 'hahahahaha', '', 0, '', '2022-10-03 03:12:49'),
(430, 'xeqtr', 'Prijava bugova', '[bold]bold[/bold]', 'hahahahaha', '', 0, '', '2022-10-03 03:13:07'),
(433, 'xeqtr', 'Predlozi za server', 'dsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsadsa', 'afsfs', '', 0, '', '2022-10-03 14:55:47'),
(434, 'xeqtr', 'Predlozi za server', 'dsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsaddsadsasadsad', 'afsfs', '', 0, '', '2022-10-03 14:55:59'),
(438, 'xeqtr', 'Zahtev za vracanje statsa', '<p style=\"margin-left:0px;\"></p>\n<pre style=\"margin-left:0px;\"><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: var(--fs-body1);font-family: var(--ff-mono);\"><code>&lt;p&gt;&lt;</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>/p&gt;&lt;blockquote&gt;tweet tweet tweet&lt;/</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: var(--fs-body1);font-family: var(--ff-mono);\"><code>blockquote&gt;</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>&lt;</code></span><span style=\"color: var(--highlight-namespace);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>p</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>&gt;&lt;/</code></span><span style=\"color: var(--highlight-namespace);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>p</code></span><span style=\"color: var(--highlight-color);background-color: var(--highlight-bg);font-size: 13px;font-family: var(--ff-mono);\"><code>&gt;</code></span></pre>\n<p style=\"margin-left:0px;\"></p>\n<img src=\"https://imgur.com/oy430xV\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n<p style=\"margin-left:0px;\"></p>\n<p style=\"text-align:left;\"></p>\n<p style=\"margin-left:0px;\"></p>\n<p><br>&nbsp;</p>\n', 'hasehashasehasehase', '', 0, '', '2022-10-03 20:58:49'),
(439, 'xeqtr', 'Zahtev za vracanje statsa', '<p></p>\n<iframe width=\"auto\" height=\"auto\" src=\"https://imgur.com/oy430xV\" frameBorder=\"0\"></iframe>\n<p></p>\n<div style=\"text-align:right;\"><img src=\"https://imgur.com/oy430xV\" alt=\"undefined\" style=\"height: auto;width: auto\"/></div>\n<p></p>\n<img src=\"[img]https://i.imgur.com/oy430xV.jpg[/img]\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n<img src=\"<blockquote class=\"imgur-embed-pub\" lang=\"en\" data-id=\"oy430xV\"><a href=\"https://imgur.com/oy430xV\">View post on imgur.com</a></blockquote><script async src=\"//s.imgur.com/min/embed.js\" charset=\"utf-8\"></script>\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n<img src=\"[Imgur](https://imgur.com/oy430xV)\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n', 'aaaaaaaaaaaaaaaafs', '', 0, '', '2022-10-03 21:00:05'),
(442, 'xeqtr', 'Pravila', '<iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.youtube.com/embed/GG_PlVm1Cyk?showinfo=0\"></iframe><p><br></p>', 'hahahahahahahahhaahhaha', '', 0, '', '2022-10-03 22:43:34'),
(448, 'xeqtr', 'Predlozi za server', '<h1><strong><em><s>fasssssssssssssss</s></em></strong></h1>', 'aes', '', 0, '', '2022-10-05 00:54:09'),
(449, 'xeqtr', 'Pravila', '<p>AS<span style=\"background-color: rgb(0, 0, 0);\">E</span><span style=\"background-color: rgb(230, 0, 0);\">HASEAHESAHSEAHES</span></p>', 'aesss', '', 0, '', '2022-10-05 01:06:19'),
(453, 'test123', 'Konkursi', '<p>pa e</p>', 'ehs', '', 0, '', '2022-10-12 01:30:43'),
(455, 'xeqtr', 'Pravila', '<blockquote>acab</blockquote>', 'ehsahs', '', 0, '', '2022-10-14 22:08:02'),
(459, 'xeqtr', 'Pravila', '<p>acab</p>', 'acabbbbb', '', 0, '', '2022-10-15 00:00:59'),
(460, 'xeqtr', 'Firme Biznisi', '<p>acabbbbb</p>', 'acaaaaaaaaaab', '', 0, '', '2022-10-15 00:17:21'),
(461, 'xeqtr', 'Zahtev za vracanje statsa', '<p>bbbb33</p>', 'acabbbbbasf', 'xeqtr', 1, '2022-11-21 18:54:23.810', '2022-11-21 17:54:23'),
(462, 'xeqtr', 'Prijava bugova', '<p>aheasheasheahaha</p>', 'ahahaes', '', 0, '', '2022-10-15 02:20:26'),
(463, 'xeqtr', 'Prijava bugova', '<p>aheasheashea</p>', 'acabheshes', '', 0, '', '2022-10-15 02:37:30'),
(464, 'xeqtr', 'Pravila', '<p>acab</p>', 'ehsaseafease', '', 0, '', '2022-10-15 02:56:53'),
(465, 'xeqtr', 'Firme Biznisi', '<p>ahga</p>', 'gsgsgsgs', '', 0, '', '2022-10-15 03:09:24'),
(466, 'xeqtr', 'Pravila', '<p>hehehes</p>', 'acabhesheshsehs', '', 0, '', '2022-10-16 00:53:02'),
(467, 'xeqtr', 'Prijava bugova', '<p>acab</p>', 'ahes', '', 0, '', '2022-10-25 21:17:34'),
(468, 'xeqtr', 'Prijava bugova', '<p>ahseeeeeeeees</p>', 'ahses', '', 0, '', '2022-10-25 21:17:45'),
(470, 'xeqtr', 'Konkursi', '<p>test</p>', 'acab', '', 0, '', '2022-10-25 21:24:41'),
(472, 'xeqtr', 'Pravila', '<p>TESTACAB</p>', '5252TEST', '', 0, '', '2022-10-25 21:27:49'),
(473, 'xeqtr', 'Zahtevi', '<p>acab</p>', 'TYEST', '', 0, '', '2022-10-25 21:31:40'),
(474, 'xeqtr', 'Prijava bugova', '<p>acab</p>', 'TESACAB', '', 0, '', '2022-10-25 21:52:56'),
(475, 'xeqtr', 'Zalbe', '<p>acab</p>', 'acabTESTACAB', '', 0, '', '2022-10-25 21:55:35'),
(477, 'xeqtr', 'Predlozi za server', '<p>TESTACAB</p>', 'acabAHSHSHS', '', 0, '', '2022-10-25 21:57:10'),
(478, 'xeqtr', 'Pravila', '<p>acab131222</p>', 'aHESTTEST', '', 0, '', '2022-10-25 21:58:04'),
(479, 'xeqtr', 'Pravila', '<p>ap radiesejs</p>', 'paes', '', 0, '', '2022-10-25 21:58:21'),
(484, 'xeqtr', 'Zahtev za vracanje statsa', '<p>easesaesaasesaesa</p>', 'tesesaea', '', 0, '', '2022-10-28 20:08:33'),
(486, 'xeqtr', 'Zahtev za vracanje statsa', '<p>faafa</p>', 'fafafafafa', '', 0, '', '2022-10-28 20:08:40'),
(487, 'xeqtr', 'Zahtev za vracanje statsa', '<p>fafa</p>', 'fafafa', '', 0, '', '2022-10-28 20:08:43'),
(491, 'xeqtr', 'Predlozi za server', '<p>fasfasfas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:11'),
(492, 'xeqtr', 'Predlozi za server', '<p>acab</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:14'),
(493, 'xeqtr', 'Predlozi za server', '<p>fafa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:45'),
(494, 'xeqtr', 'Predlozi za server', '<p>fafa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:46'),
(495, 'xeqtr', 'Predlozi za server', '<p>fafa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:47'),
(496, 'xeqtr', 'Predlozi za server', '<p>fafa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:49'),
(497, 'xeqtr', 'Predlozi za server', '<p>sss</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:53'),
(498, 'xeqtr', 'Predlozi za server', '<p>sss</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:54'),
(499, 'xeqtr', 'Predlozi za server', '<p>ssss</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:36:56'),
(500, 'xeqtr', 'Predlozi za server', '<p>fafa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:37:58'),
(501, 'xeqtr', 'Predlozi za server', '<p>a</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:38:00'),
(502, 'xeqtr', 'Predlozi za server', '<p>a</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:38:01'),
(503, 'xeqtr', 'Predlozi za server', '<p>f</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:38:02'),
(504, 'xeqtr', 'Predlozi za server', '<p>g</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:38:04'),
(505, 'xeqtr', 'Predlozi za server', '<p>fafa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:48:13'),
(506, 'xeqtr', 'Predlozi za server', '<p>a</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:48:15'),
(507, 'xeqtr', 'Predlozi za server', '<p>g</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:48:16'),
(508, 'xeqtr', 'Predlozi za server', '<p>h</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:48:18'),
(509, 'xeqtr', 'Predlozi za server', '<p>j</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:48:19'),
(510, 'xeqtr', 'Predlozi za server', '<p>fasfasfsa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:49:19'),
(511, 'xeqtr', 'Predlozi za server', '<p>a</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:49:20'),
(512, 'xeqtr', 'Predlozi za server', '<p>fasfas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:49:21'),
(513, 'xeqtr', 'Predlozi za server', '<p>fsfs</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:49:22'),
(514, 'xeqtr', 'Predlozi za server', '<p>fsfsf</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:49:23'),
(515, 'xeqtr', 'Predlozi za server', '<p>fasfas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:56:09'),
(516, 'xeqtr', 'Predlozi za server', '<p>acab</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:57:50'),
(517, 'xeqtr', 'Predlozi za server', '<p>adsadsa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:57:56'),
(518, 'xeqtr', 'Predlozi za server', '<p>acab</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:58:05'),
(519, 'xeqtr', 'Predlozi za server', '<p>ehs</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:58:08'),
(520, 'xeqtr', 'Predlozi za server', '<p>ahashas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:58:11'),
(521, 'xeqtr', 'Predlozi za server', '<p>hasehae</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 20:58:43'),
(522, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">ehs\n</pre><p>acab</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:00:49'),
(523, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">acab\n</pre><p><br></p><p>asehasehasehasehashea</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:01:19'),
(524, 'xeqtr', 'Predlozi za server', '<p>fasfasfsafsa</p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">hasehae\n</pre><p>fasfsafsa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:01:35'),
(525, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">\n\n\nacab\n\nasehasehasehasehashea\n</pre><p><br></p><p><br></p><p>asfafasfsa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:05:06'),
(526, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">ahashas\n</pre><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>fasfasfsa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:22:35'),
(527, 'xeqtr', 'Predlozi za server', '<p>fafasfas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:24:47'),
(528, 'xeqtr', 'Predlozi za server', '<p>fasssssssssssss</p><p>afsafsaffasafsfsaafs</p><p>afs</p><p>fasf</p><p>asfa</p><p>afs</p><p>fa</p><p>s</p><p>fas</p><p>afs</p><p>fsa</p><pre class=\"ql-syntax\" spellcheck=\"false\">fafasfas\n</pre>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:24:58'),
(529, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">fasssssssssssss\nafsafsaffasafsfsaafs\nafs\nfasf\nasfa\nafs\nfa\ns\nfas\nafs\nfsa\n\nfafasfas\n</pre><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>fasfsfsafafasfsa</p><p>afs</p><p>fsa</p><p>asf</p><p>afs</p><p>afs</p><p>saf</p><p>fsa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:25:09'),
(530, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">\n\n\nfasssssssssssss\nafsafsaffasafsfsaafs\nafs\nfasf\nasfa\nafs\nfa\ns\nfas\nafs\nfsa\n\nfafasfas\n\n\n\n\n\n\n\n\nfasfsfsafafasfsa\nafs\nfsa\nasf\nafs\nafs\nsaf\n\nfsa\n</pre><p><br></p><p>acaaaaaaaaaaabaease</p><p>aes</p><p>ase</p><p>aes</p><p>aes</p><p>ase</p><p>ase</p><p>aes</p><p>ase</p><p>ea</p><p>as</p><p>eeas</p><p><br></p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:31:13'),
(531, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">\n\nfasssssssssssss\nafsafsaffasafsfsaafs\nafs\nfasf\nasfa\nafs\nfa\ns\nfas\nafs\nfsa\n\nfafasfas\n\n\n\n\n\n\n\n\nfasfsfsafafasfsa\nafs\nfsa\nasf\nafs\nafs\nsaf\n\nfsa\n</pre><p><br></p><p>acaaaaaaaaaaabaease</p><p>aes</p><p>ase</p><p>aes</p><p>aes</p><p>ase</p><p>ase</p><p>aes</p><p>ase</p><p>ea</p><p>as</p><p>eeas</p><p><br></p><p>fasfasfsa</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:35:14'),
(532, 'xeqtr', 'Predlozi za server', '<p><br></p><p><br></p><p><br></p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">\n\nfasssssssssssss\nafsafsaffasafsfsaafs\nafs\nfasf\nasfa\nafs\nfa\ns\nfas\nafs\nfsa\n\nfafasfas\n\n\n\n\n\n\n\n\nfasfsfsafafasfsa\nafs\nfsa\nasf\nafs\nafs\nsaf\n\nfsa\n</pre><p><br></p><p>acaaaaaaaaaaabaease</p><p>aes</p><p>ase</p><p>aes</p><p>aes</p><p>ase</p><p>ase</p><p>aes</p><p>ase</p><p>ea</p><p>as</p><p>eeas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:38:07'),
(533, 'xeqtr', 'Predlozi za server', '<p>TESTACAB</p><p><br></p><p>acab</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:38:29'),
(534, 'xeqtr', 'Predlozi za server', '<blockquote><br></blockquote><blockquote>TESTACAB</blockquote><p><br></p><p>acab</p><p>fasfasfasfasfas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:41:04'),
(535, 'xeqtr', 'Predlozi za server', '<blockquote>TESTACAB</blockquote><blockquote><br></blockquote><blockquote>acab.</blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><p>asdasdas</p>', 'acabAHSHSHS', '', 0, '', '2022-10-28 21:43:38'),
(537, 'xeqtr', 'Firme Biznisi', '<blockquote>faseafse</blockquote><blockquote>fasfsafas</blockquote><blockquote>fsa</blockquote><blockquote>fas</blockquote><blockquote>fsa</blockquote><blockquote>f</blockquote><blockquote>as</blockquote><blockquote><br></blockquote>', 'aaaaaaaaaaaaahs', '', 0, '', '2022-10-28 23:04:55'),
(541, 'xeqtr', 'Firme Biznisi', '<p>fafafafasfafsa</p><p>fasfasfasfasfsa</p><p><br></p><p><br></p><blockquote>faseafse</blockquote><blockquote>fasfsafas</blockquote><blockquote>fsa</blockquote><blockquote>fas</blockquote><blockquote>fsa</blockquote><blockquote>f</blockquote><blockquote>as</blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote><br></blockquote><blockquote>acabbbb</blockquote>', 'aaaaaaaaaaaaahs', '', 0, '', '2022-10-29 18:48:02'),
(544, 'xeqtr', 'Pravila', '<blockquote>fasfasfasfasfas</blockquote><pre class=\"ql-syntax\" spellcheck=\"false\">adadsadsadasdasdasdasdasdsad\nasdas\ndasd\nasd\nas\nd\nsad\nas\n\n</pre><blockquote><br></blockquote><blockquote><br></blockquote>', 'adadadadadadadada', '', 0, '', '2022-10-28 23:19:11'),
(554, 'test123', 'Prijava bugova', '<p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">[b]acab[/b]\n</pre><p>yyeee</p>', 'hahahahaha', '', 0, '', '2022-10-29 21:06:15'),
(555, 'test123', 'Prijava bugova', '<p>yeeeee</p><pre class=\"ql-syntax\" spellcheck=\"false\">acab\n</pre>', 'ahes', '', 0, '', '2022-10-29 21:06:34'),
(557, 'test123', 'Predlozi za server', '<p>HEHEHE</p>', 'afsfs', 'test123', 1, '2022-10-30 02:46:55.840', '2022-10-30 01:46:55'),
(558, 'test123', 'Zahtevi', '<p><br></p><iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.youtube.com/embed/GG_PlVm1Cyk?showinfo=0\"></iframe><pre class=\"ql-syntax\" spellcheck=\"false\">\n</pre><p>dadadadada</p>', 'hahahahahahahahhaahhaha', '', 0, '', '2022-10-30 01:57:58'),
(563, 'xeqtr', 'Pravila', '<p>acabTEST</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:22'),
(564, 'xeqtr', 'Pravila', '<p><br></p><p>HEHEHEHE</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:25'),
(565, 'xeqtr', 'Pravila', '<p>AAA</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:28'),
(566, 'xeqtr', 'Pravila', '<p>FESFESF</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:29'),
(567, 'xeqtr', 'Pravila', '<p>FESFEFS</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:31'),
(568, 'xeqtr', 'Pravila', '<p>FESFESF</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:32'),
(569, 'xeqtr', 'Pravila', '<p>FSAFFAFAFA</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:34'),
(570, 'xeqtr', 'Pravila', '<p>fafafafa</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:36'),
(571, 'xeqtr', 'Pravila', '<p>AAAAAAAAAAAAAAAAES</p>', '5252TEST', '', 0, '', '2022-11-12 18:53:39'),
(572, 'xeqtr', 'Pravila', '<p>afs</p>', '5252TEST', '', 0, '', '2022-11-12 18:55:35'),
(573, 'xeqtr', 'Pravila', '<p>A</p>', '5252TEST', '', 0, '', '2022-11-12 18:55:39'),
(574, 'xeqtr', 'Pravila', '<p>a</p>', '5252TEST', '', 0, '', '2022-11-12 18:55:41'),
(575, 'xeqtr', 'Pravila', '<p>a</p>', '5252TEST', '', 0, '', '2022-11-12 18:55:42'),
(576, 'xeqtr', 'Pravila', '<p>aFF</p>', '5252TEST', '', 0, '', '2022-11-12 18:55:45'),
(577, 'xeqtr', 'Pravila', '<p>AF</p>', '5252TEST', '', 0, '', '2022-11-12 18:57:30'),
(578, 'xeqtr', 'Pravila', '<p>A</p>', '5252TEST', '', 0, '', '2022-11-12 18:57:32'),
(579, 'xeqtr', 'Pravila', '<p>E</p>', '5252TEST', '', 0, '', '2022-11-12 18:57:33'),
(580, 'xeqtr', 'Pravila', '<p>S</p>', '5252TEST', '', 0, '', '2022-11-12 18:57:34'),
(581, 'xeqtr', 'Pravila', '<p>F</p>', '5252TEST', '', 0, '', '2022-11-12 18:57:35'),
(582, 'xeqtr', 'Predlozi za server', '<p>afs</p>', 'aes', '', 0, '', '2022-11-12 19:12:51'),
(583, 'xeqtr', 'Firme Biznisi', '<p>fsafsafa</p>', 'acab', '', 0, '', '2022-11-12 19:25:31'),
(584, 'xeqtr', 'Predlozi za server', '<p>a</p>', 'aes', '', 0, '', '2022-11-12 19:25:46'),
(585, 'xeqtr', 'Zahtevi', '<p>ahs</p>', 'hahahahahahahahhaahhaha', '', 0, '', '2022-11-12 19:26:01'),
(586, 'xeqtr', 'Prijava bugova', '<p>afs</p>', 'TESACAB', '', 0, '', '2022-11-12 19:30:49'),
(588, 'xeqtr', 'Zahtev za vracanje statsa', '<p>afafa</p>', 'fafafafafa', '', 0, '', '2022-11-12 19:31:14'),
(589, 'xeqtr', 'Pravila', '<p>fafafafa</p>', 'aHESTTEST', '', 0, '', '2022-11-12 19:32:04'),
(590, 'xeqtr', 'Prijava bugova', '<p>afes</p>', 'ahses', '', 0, '', '2022-11-12 19:33:12'),
(591, 'xeqtr', 'Prijava bugova', '<p>afes</p>', 'ahses', '', 0, '', '2022-11-12 19:33:14'),
(592, 'xeqtr', 'Prijava bugova', '<p>afs</p>', 'ahses', '', 0, '', '2022-11-12 19:33:22'),
(593, 'xeqtr', 'Prijava bugova', '<p>afsfafa</p>', 'ahses', '', 0, '', '2022-11-12 19:34:36'),
(594, 'xeqtr', 'Prijava bugova', '<p>ahs</p>', 'ahses', '', 0, '', '2022-11-12 19:34:42'),
(595, 'xeqtr', 'Zahtev za vracanje statsa', '<p>fafa</p>', 'fafafafafa', '', 0, '', '2022-11-12 19:49:50'),
(596, 'xeqtr', 'Zahtev za vracanje statsa', '<p>fafafaaa</p>', 'fafafafafa', '', 0, '', '2022-11-12 19:50:04'),
(597, 'xeqtr', 'Firme Biznisi', '<p>fafa</p>', 'aaaaaaaaaaaaahs', '', 0, '', '2022-11-12 19:56:12'),
(598, 'xeqtr', 'Konkursi', '<p>ff</p>', 'TYEST', '', 0, '', '2022-11-12 19:59:14'),
(599, 'xeqtr', 'Konkursi', '<p>AHEASEHASEHAS</p>', 'TYEST', '', 0, '', '2022-11-12 19:59:32'),
(600, 'xeqtr', 'Konkursi', '<p>FAFAFAFA</p>', 'TYEST', '', 0, '', '2022-11-12 19:59:43'),
(601, 'xeqtr', 'Konkursi', '<p>AFAFAFAFA</p>', 'acaaaaaaaaaab', '', 0, '', '2022-11-12 19:59:48'),
(602, 'xeqtr', 'Konkursi', '<p>A</p>', 'acaaaaaaaaaab', '', 0, '', '2022-11-12 20:00:03'),
(603, 'xeqtr', 'Konkursi', '<p>afeasfeasfe</p>', 'acaaaaaaaaaab', '', 0, '', '2022-11-12 20:00:28'),
(604, 'xeqtr', 'Konkursi', '<p>faesfeafse</p>', 'acaaaaaaaaaab', '', 0, '', '2022-11-12 20:00:30'),
(607, 'xeqtr', 'Firme Biznisi', '<p>fafas</p>', 'aaaaaaaaaaaaahs', '', 0, '', '2022-11-12 20:12:53'),
(608, 'xeqtr', 'Firme Biznisi', '<p>fasfasf</p>', 'aaaaaaaaaaaaahs', '', 0, '', '2022-11-12 20:12:54'),
(609, 'xeqtr', 'Zahtev za vracanje statsa', '<p>feasfeasfeasefas</p>', 'hasehashasehasehase', '', 0, '', '2022-11-12 23:22:41'),
(610, 'xeqtr', 'Zalbe', '<p>ahaha</p>', 'acabTESTACAB', '', 0, '', '2022-11-13 14:17:53'),
(611, 'xeqtr', 'Firme Biznisi', '<p>ahaaha</p>', 'gsgsgsgs', 'xeqtr', 2, '2022-11-21 03:30:11.344', '2022-11-21 02:30:11'),
(612, 'xeqtr', 'Zahtev za vracanje statsa', '<p>aaaaahes</p>', 'hehehehehe', '', 0, '', '2022-11-21 02:30:59'),
(613, 'xeqtr', 'Zalbe', '<p>acaaaaaab</p>', 'acabTESTACAB', '', 0, '', '2022-11-21 16:02:09'),
(614, 'xeqtr', 'Zahtev za vracanje statsa', '<p>626</p>', 'acabbbbbasf', '', 0, '', '2022-11-21 17:53:17');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleid` int(11) NOT NULL,
  `roleusername` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `RegisteredUser` tinyint(1) NOT NULL,
  `Administrator` tinyint(1) NOT NULL,
  `CommunityManager` tinyint(1) NOT NULL,
  `Director` tinyint(1) NOT NULL,
  `HeadAdmin` tinyint(1) NOT NULL,
  `Admin` tinyint(1) NOT NULL,
  `VodjaHelpera` tinyint(1) NOT NULL,
  `Helper` tinyint(1) NOT NULL,
  `VodjaPromotera` tinyint(1) NOT NULL,
  `Promoter` tinyint(1) NOT NULL,
  `org1lider` tinyint(1) NOT NULL,
  `org2lider` tinyint(1) NOT NULL,
  `org3lider` tinyint(1) NOT NULL,
  `org4lider` tinyint(1) NOT NULL,
  `org5lider` tinyint(1) NOT NULL,
  `org6lider` tinyint(1) NOT NULL,
  `org7lider` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleid`, `roleusername`, `RegisteredUser`, `Administrator`, `CommunityManager`, `Director`, `HeadAdmin`, `Admin`, `VodjaHelpera`, `Helper`, `VodjaPromotera`, `Promoter`, `org1lider`, `org2lider`, `org3lider`, `org4lider`, `org5lider`, `org6lider`, `org7lider`) VALUES
(2, 'xeqtr', 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(3, 'test123', 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'testChatacab', 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 'Acab1312', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Uer1m8RBCHjBEB7IQifTGIqgK347qAti', 1672654098, '{\"cookie\":{\"originalMaxAge\":3600000000,\"expires\":\"2023-01-02T09:59:50.976Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":87}}'),
('bVLMCUsRLkMO9-mHz8WoTaqMGNTVuvCR', 1672654533, '{\"cookie\":{\"originalMaxAge\":3600000000,\"expires\":\"2023-01-02T09:59:35.798Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":86}}');

-- --------------------------------------------------------

--
-- Table structure for table `sessiontracks`
--

CREATE TABLE `sessiontracks` (
  `s_id` int(30) NOT NULL,
  `s_sessionID` varchar(300) NOT NULL,
  `s_username` varchar(100) NOT NULL,
  `s_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessiontracks`
--

INSERT INTO `sessiontracks` (`s_id`, `s_sessionID`, `s_username`, `s_date`) VALUES
(17, 'AEAreTEJhBPqO95oPbmKRX46iWgRLG9_', 'test123', '2022-10-29 20:58:07'),
(18, '8nI27lLRsrKVHkEFNwrpoHUgiqBjHnXc', 'test123', '2022-10-31 23:48:32'),
(19, 'UnJdJ0O5DJNxJjH-3bDEwukuJpX0zSqT', 'xeqtr', '2022-11-11 11:09:23'),
(20, 'edo48iPnmip8z6juwlBLvStE4zaHxY9H', 'test123', '2022-11-12 13:46:18'),
(24, 'bVLMCUsRLkMO9-mHz8WoTaqMGNTVuvCR', 'xeqtr', '2022-11-21 17:59:35'),
(25, 'Uer1m8RBCHjBEB7IQifTGIqgK347qAti', 'test123', '2022-11-21 17:59:50');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `subid` int(10) NOT NULL,
  `idcategory` int(10) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `subdescription` varchar(100) NOT NULL,
  `subuser` varchar(100) NOT NULL,
  `sub_userip` varchar(30) NOT NULL,
  `subdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`subid`, `idcategory`, `subtitle`, `subdescription`, `subuser`, `sub_userip`, `subdate`) VALUES
(55, 9, 'acab', '', 'xeqtr', '::1', '2022-11-02 20:16:21'),
(56, 2, 'TEST', '', 'xeqtr', '::1', '2022-11-02 20:18:02'),
(57, 4, 'fasfa', 'fasfsa', 'xeqtr', '::1', '2022-11-05 14:32:01'),
(58, 4, 'afs', 'afs', 'xeqtr', '::1', '2022-11-05 14:43:20'),
(59, 4, 'es', 's', 'xeqtr', '::1', '2022-11-05 15:07:58'),
(60, 4, 'fasfaa', 'acab', 'xeqtr', '::1', '2022-11-05 15:19:43'),
(61, 3, 'fasfsa', 'fasfsa', 'xeqtr', '::1', '2022-11-11 15:43:51'),
(62, 4, 'fafa', 'fafafafa', 'xeqtr', '::1', '2022-11-12 11:36:25'),
(63, 4, 'Acaba12', 'Here you need to put something', 'xeqtr', '::1', '2022-11-12 11:39:08'),
(64, 6, 'fafaf', 'afafaf', 'xeqtr', '::1', '2022-11-12 23:22:06');

-- --------------------------------------------------------

--
-- Table structure for table `themeposts`
--

CREATE TABLE `themeposts` (
  `theme_postid` int(11) NOT NULL,
  `theme_postusername` varchar(100) NOT NULL,
  `theme_postcategory` varchar(100) NOT NULL,
  `theme_name` varchar(100) NOT NULL,
  `theme_posttitle` varchar(100) NOT NULL,
  `theme_postisLocked` tinyint(1) NOT NULL,
  `theme_ipuser` varchar(40) NOT NULL,
  `theme_postdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `themeposts`
--

INSERT INTO `themeposts` (`theme_postid`, `theme_postusername`, `theme_postcategory`, `theme_name`, `theme_posttitle`, `theme_postisLocked`, `theme_ipuser`, `theme_postdate`) VALUES
(177, 'xeqtr', 'General Talk', 'ah', 'ah', 0, '::1', '2022-09-12 00:32:25'),
(178, 'xeqtr', 'General Talk', 'ah', 'test', 0, '::1', '2022-09-12 00:32:38'),
(184, 'xeqtr', 'General Talk', '', '', 0, '::1', '2022-09-12 13:07:23'),
(185, 'xeqtr', 'General Talk', '', '', 0, '::1', '2022-09-12 13:08:00'),
(186, 'xeqtr', 'Meet the Staff', '', '', 0, '::1', '2022-09-12 13:14:34'),
(187, 'xeqtr', 'Meet the Staff', '', '', 0, '::1', '2022-09-12 13:20:44'),
(188, 'xeqtr', 'Meet the Staff', '', '', 0, '::1', '2022-09-12 13:30:52'),
(189, 'xeqtr', 'Meet the Staff', '', '', 0, '::1', '2022-09-12 13:31:18'),
(190, 'xeqtr', 'Meet the Staff', '', '', 0, '::1', '2022-09-12 13:40:20'),
(191, 'xeqtr', 'Help & Questions', 'afasfasfas', 'asfsafasafa', 0, '::1', '2022-09-23 01:38:29'),
(193, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-03 01:08:07'),
(194, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-03 01:08:08'),
(202, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-05 00:06:10'),
(203, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-05 00:06:10'),
(204, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-05 00:06:11'),
(205, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-05 00:06:12'),
(206, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-05 00:06:13'),
(207, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-05 00:06:19'),
(208, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-05 00:06:20'),
(217, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:05:57'),
(218, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:09:25'),
(221, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:14:10'),
(223, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:31:12'),
(224, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:32:10'),
(225, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:32:41'),
(226, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:33:33'),
(227, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:34:32'),
(228, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:35:45'),
(229, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:37:38'),
(230, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:39:43'),
(231, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:40:37'),
(232, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:43:41'),
(233, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 21:49:38'),
(234, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 22:25:24'),
(235, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 22:29:36'),
(236, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 22:29:46'),
(237, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 22:31:43'),
(238, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-10-26 22:34:46'),
(239, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-27 00:11:20'),
(240, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-27 00:11:25'),
(241, 'xeqtr', 'Pravila', '', '', 0, '::1', '2022-10-31 17:41:49'),
(242, 'xeqtr', 'Firme Biznisi', '', '', 0, '::1', '2022-10-31 17:43:17'),
(243, 'xeqtr', 'Konkursi', '', '', 0, '::1', '2022-10-31 17:43:45'),
(244, 'xeqtr', 'Konkursi', '', '', 0, '::1', '2022-10-31 17:46:30'),
(245, 'xeqtr', 'Konkursi', '', '', 0, '::1', '2022-10-31 17:47:40'),
(246, 'xeqtr', 'Konkursi', '', '', 0, '::1', '2022-10-31 17:48:33'),
(247, 'xeqtr', 'Zalbe', '', '', 0, '::1', '2022-10-31 17:51:22'),
(248, 'xeqtr', 'Zalbe', '', '', 0, '::1', '2022-10-31 17:57:19'),
(249, 'xeqtr', 'Zalbe', '', '', 0, '::1', '2022-10-31 17:57:37'),
(251, 'xeqtr', 'Zalbe', '', '', 0, '::1', '2022-10-31 18:05:28'),
(263, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:29'),
(264, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:30'),
(266, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:43'),
(267, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:44'),
(268, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:45'),
(269, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:46'),
(271, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:56'),
(272, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:58'),
(273, 'xeqtr', 'Zalbe', 'fafafas', '', 0, '::1', '2022-10-31 18:06:59'),
(274, 'xeqtr', 'Zahtev za vracanje statsa', '', '', 0, '::1', '2022-11-02 20:15:27'),
(276, 'xeqtr', 'Prijava bugova', '', '', 0, '::1', '2022-11-02 20:15:53'),
(277, 'xeqtr', 'Konkursi', '', '', 0, '::1', '2022-11-02 20:16:05'),
(316, 'xeqtr', 'Pravila', 'eseses', 'fafa', 0, '::1', '2022-11-12 11:44:38');

-- --------------------------------------------------------

--
-- Table structure for table `themereplies`
--

CREATE TABLE `themereplies` (
  `theme_replyid` int(11) NOT NULL,
  `theme_replyusername` varchar(100) NOT NULL,
  `theme_postname` varchar(100) NOT NULL,
  `theme_category` varchar(100) NOT NULL,
  `theme_title` varchar(100) NOT NULL,
  `theme_content` text NOT NULL,
  `theme_userip` varchar(100) NOT NULL,
  `theme_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `themereplies`
--

INSERT INTO `themereplies` (`theme_replyid`, `theme_replyusername`, `theme_postname`, `theme_category`, `theme_title`, `theme_content`, `theme_userip`, `theme_date`) VALUES
(175, 'xeqtr', 'ah', 'General Talk', 'ah', '<p>ah</p>\n', '0', '2022-09-12 00:32:25'),
(176, 'xeqtr', 'ah', 'General Talk', 'test', '<p>test</p>\n', '0', '2022-09-12 00:32:38'),
(177, 'xeqtr', 'ah', 'General Talk', '', '<p></p>\n', '0', '2022-09-12 00:41:37'),
(178, 'xeqtr', 'ah', 'General Talk', '', '<p></p>\n', '0', '2022-09-12 00:41:37'),
(179, 'xeqtr', 'ah', 'General Talk', '', '<p></p>\n', '0', '2022-09-12 00:42:20'),
(180, 'xeqtr', '', 'General Talk', '', '<p></p>\n', '0', '2022-09-12 12:58:54'),
(181, 'xeqtr', '', 'General Talk', '', '<p></p>\n', '0', '2022-09-12 13:06:33'),
(182, 'xeqtr', '', 'General Talk', '', '<p></p>\n', '0', '2022-09-12 13:07:23'),
(183, 'xeqtr', '', 'General Talk', '', '<p></p>\n', '0', '2022-09-12 13:08:00'),
(184, 'xeqtr', '', 'Meet the Staff', '', '<p></p>\n', '0', '2022-09-12 13:14:34'),
(185, 'xeqtr', '', 'Meet the Staff', '', '<p></p>\n', '0', '2022-09-12 13:20:44'),
(186, 'xeqtr', '', 'Meet the Staff', '', '<p></p>\n', '0', '2022-09-12 13:30:52'),
(187, 'xeqtr', '', 'Meet the Staff', '', '<p></p>\n', '0', '2022-09-12 13:31:18'),
(188, 'xeqtr', '', 'Meet the Staff', '', '<p></p>\n', '0', '2022-09-12 13:40:20'),
(189, 'xeqtr', 'afasfasfas', 'Help & Questions', 'asfsafasafa', '<p>acab</p>\n', '0', '2022-09-23 01:38:29'),
(191, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-03 01:08:07'),
(192, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-03 01:08:08'),
(193, 'xeqtr', 'ahah', 'Firme Biznisi', 'aaaaaaa', '<p></p>\n', '0', '2022-10-04 23:28:37'),
(194, 'xeqtr', 'ahah', 'Firme Biznisi', 'acab', '<p></p>\n', '0', '2022-10-04 23:29:02'),
(195, 'xeqtr', 'ahah', 'Firme Biznisi', 'aaaaaaaaaafs', '<p></p>\n', '0', '2022-10-04 23:29:10'),
(196, 'xeqtr', 'ahah', 'Firme Biznisi', 'afsfsfsfsfsfsfsfsafsssssssssssssss', '<p></p>\n', '0', '2022-10-04 23:29:42'),
(197, 'xeqtr', 'ahah', 'Firme Biznisi', 'heeeeeeeeeeeeeeehs', '<p></p>\n', '0', '2022-10-04 23:30:55'),
(198, 'xeqtr', 'ahah', 'Firme Biznisi', 'afsfs', '<p></p>\n', '0', '2022-10-04 23:32:04'),
(199, 'xeqtr', 'ahah', 'Firme Biznisi', 'aaaaaaaaaaaahshshshs', '<p></p>\n', '0', '2022-10-04 23:34:52'),
(200, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:06:10'),
(201, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:06:10'),
(202, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:06:11'),
(203, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:06:12'),
(204, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:06:13'),
(205, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:06:19'),
(206, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:06:20'),
(207, 'xeqtr', 'ahah', 'Firme Biznisi', 'ahes', '<p></p>\n', '0', '2022-10-05 00:21:40'),
(208, 'xeqtr', 'ahah', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-05 00:23:52'),
(210, 'xeqtr', 'aha', 'Predlozi za server', 'acab', '<p></p>\n', '0', '2022-10-26 02:14:42'),
(211, 'xeqtr', 'aha', 'Predlozi za server', 'testacab', '<p></p>\n', '0', '2022-10-26 02:18:07'),
(212, 'xeqtr', 'acab', 'Zahtev za vracanje statsa', 'test', '<p></p>\n', '0', '2022-10-26 20:26:44'),
(213, 'xeqtr', 'acab', 'Zahtev za vracanje statsa', 'aha', '<p></p>\n', '0', '2022-10-26 20:26:49'),
(214, 'xeqtr', 'acab', 'Zahtev za vracanje statsa', 'ahaes', '<p></p>\n', '0', '2022-10-26 20:26:58'),
(215, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:05:57'),
(216, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:09:25'),
(217, 'xeqtr', 'acab', 'Zahtev za vracanje statsa', 'test', '<p></p>\n', '0', '2022-10-26 21:09:37'),
(218, 'xeqtr', 'acab', 'Zahtev za vracanje statsa', 'acab', '<p></p>\n', '0', '2022-10-26 21:09:44'),
(219, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:14:10'),
(220, 'xeqtr', 'acab', 'Zahtev za vracanje statsa', 'es', '<p></p>\n', '0', '2022-10-26 21:14:19'),
(221, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:31:12'),
(222, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:32:10'),
(223, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:32:41'),
(224, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:33:33'),
(225, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:34:32'),
(226, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:35:45'),
(227, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:37:38'),
(228, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:39:43'),
(229, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:40:37'),
(230, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:43:41'),
(231, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 21:49:38'),
(232, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 22:25:24'),
(233, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 22:29:36'),
(234, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 22:29:46'),
(235, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 22:31:43'),
(236, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-10-26 22:34:46'),
(237, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-27 00:11:20'),
(238, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-27 00:11:25'),
(239, 'xeqtr', '', 'Pravila', '', '<p></p>\n', '0', '2022-10-31 17:41:49'),
(240, 'xeqtr', '', 'Firme Biznisi', '', '<p></p>\n', '0', '2022-10-31 17:43:17'),
(241, 'xeqtr', '', 'Konkursi', '', '<p></p>\n', '0', '2022-10-31 17:43:45'),
(242, 'xeqtr', '', 'Konkursi', '', '<p></p>\n', '0', '2022-10-31 17:46:30'),
(243, 'xeqtr', '', 'Konkursi', '', '<p></p>\n', '0', '2022-10-31 17:47:40'),
(244, 'xeqtr', '', 'Konkursi', '', '<p></p>\n', '0', '2022-10-31 17:48:33'),
(245, 'xeqtr', '', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 17:51:22'),
(246, 'xeqtr', '', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 17:57:19'),
(247, 'xeqtr', '', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 17:57:37'),
(248, 'xeqtr', 'fasfa', 'Zalbe', 'afafaf', '<p></p>\n', '0', '2022-10-31 18:05:22'),
(249, 'xeqtr', '', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:05:28'),
(250, 'xeqtr', 'a', 'Zalbe', 'a', '<p></p>\n', '0', '2022-10-31 18:05:33'),
(251, 'xeqtr', 'a', 'Zalbe', 'a', '<p></p>\n', '0', '2022-10-31 18:05:38'),
(253, 'xeqtr', 'a', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:05:53'),
(254, 'xeqtr', 'fafafas', 'Zalbe', 'fasfsa', '<p></p>\n', '0', '2022-10-31 18:06:02'),
(255, 'xeqtr', 'fafafas', 'Zalbe', 'fasfasfasf', '<p></p>\n', '0', '2022-10-31 18:06:13'),
(256, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:16'),
(257, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:20'),
(258, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:21'),
(259, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:23'),
(260, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:24'),
(261, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:29'),
(262, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:30'),
(263, 'xeqtr', 'fafa', 'Zalbe', 'fasfsa', '<p></p>\n', '0', '2022-10-31 18:06:40'),
(264, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:43'),
(265, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:44'),
(266, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:45'),
(267, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:46'),
(268, 'xeqtr', 'aa', 'Zalbe', 'aaa', '<p></p>\n', '0', '2022-10-31 18:06:52'),
(269, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:56'),
(270, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:58'),
(271, 'xeqtr', 'fafafas', 'Zalbe', '', '<p></p>\n', '0', '2022-10-31 18:06:59'),
(272, 'xeqtr', '', 'Zahtev za vracanje statsa', '', '<p></p>\n', '0', '2022-11-02 20:15:27'),
(273, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-02 20:15:43'),
(274, 'xeqtr', '', 'Prijava bugova', '', '<p></p>\n', '0', '2022-11-02 20:15:53'),
(275, 'xeqtr', '', 'Konkursi', '', '<p></p>\n', '0', '2022-11-02 20:16:05'),
(276, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:31:45'),
(277, 'xeqtr', 'ahs', 'Predlozi za server', 'ahgs', '<p></p>\n', '0', '2022-11-05 14:31:54'),
(278, 'xeqtr', 'ahs', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:40:15'),
(279, 'xeqtr', 'ahs', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:44:05'),
(280, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:44:09'),
(281, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:44:24'),
(282, 'xeqtr', 'ahs', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:44:33'),
(283, 'xeqtr', 'ahs', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:44:39'),
(284, 'xeqtr', 'ahs', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:44:51'),
(285, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:46:06'),
(286, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:47:42'),
(287, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:48:08'),
(288, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:48:12'),
(290, 'xeqtr', '', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:50:54'),
(291, 'xeqtr', 'afs', 'Predlozi za server', '', '<p></p>\n', '0', '2022-11-05 14:54:23'),
(292, 'xeqtr', 'afs', 'Predlozi za server', 'acab', '<p>HEHEHE</p>', '0', '2022-11-05 14:58:11'),
(293, 'xeqtr', 'test', 'Predlozi za server', 'ACAB', '<p>lepo je ovo</p>', '0', '2022-11-05 14:59:32'),
(295, 'xeqtr', 'test', 'Predlozi za server', '', '<p>asfeasfeasfeasfesfeasfeas</p>', '0', '2022-11-10 14:08:06'),
(297, 'xeqtr', 'acabtest', 'Firme Biznisi', 'test', '<p><br></p><p><br></p><p><br></p><p><br></p><p>test</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>', '0', '2022-11-11 11:14:38'),
(299, 'xeqtr', 'lepo je ovo', 'Predlozi za server', 'test', '<p>fasfsafasfasfa</p>', '0', '2022-11-11 12:37:29'),
(300, 'xeqtr', 'ACAB', 'Predlozi za server', 'test', '<p>afseafseafsefesafse</p>', '0', '2022-11-11 12:38:36'),
(301, 'xeqtr', 'test', 'Predlozi za server', 'ACAB', '<p>fasfasfsa</p>', '::1', '2022-11-11 12:49:43'),
(316, 'xeqtr', 'acabtest', 'Firme Biznisi', 'test', '<p>afsfsa</p>', '::1', '2022-11-11 14:57:54'),
(317, 'xeqtr', 'acabtest', 'Firme Biznisi', 'fasfsa', '<p>fsafsa</p>', '::1', '2022-11-11 15:00:16'),
(330, 'xeqtr', 'eseses', 'Pravila', 'fafa', '<p>esesesAFSAFSESAAAAAAAAAAFSACABEHEHE</p>', '::1', '2022-11-12 13:35:07');

-- --------------------------------------------------------

--
-- Table structure for table `themes`
--

CREATE TABLE `themes` (
  `themeid` int(11) NOT NULL,
  `theme_name` varchar(100) NOT NULL,
  `theme_category` varchar(100) NOT NULL,
  `theme_user` varchar(100) NOT NULL,
  `theme_user_ip` varchar(100) NOT NULL,
  `theme_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `themes`
--

INSERT INTO `themes` (`themeid`, `theme_name`, `theme_category`, `theme_user`, `theme_user_ip`, `theme_date`) VALUES
(14, 'ah', 'General Talk', 'xeqtr', '::1', '2022-09-12 00:32:25'),
(15, 'afasfasfas', 'Help & Questions', 'xeqtr', '::1', '2022-09-23 01:38:29'),
(16, 'ahs', 'Zahtevi', 'xeqtr', '::1', '2022-10-02 14:40:53'),
(41, 'fas', 'Firme Biznisi', 'xeqtr', '::1', '2022-11-11 15:45:08'),
(50, 'eseses', 'Pravila', 'xeqtr', '::1', '2022-11-12 11:44:38');

-- --------------------------------------------------------

--
-- Table structure for table `ucp_users`
--

CREATE TABLE `ucp_users` (
  `ucp_uid` int(255) NOT NULL,
  `ucp_username` varchar(100) NOT NULL,
  `ucp_email` varchar(100) NOT NULL,
  `ucp_password` varchar(100) NOT NULL,
  `ucp_ipaddress` varchar(100) NOT NULL,
  `ucp_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ucp_users`
--

INSERT INTO `ucp_users` (`ucp_uid`, `ucp_username`, `ucp_email`, `ucp_password`, `ucp_ipaddress`, `ucp_date`) VALUES
(3, 'Nemanja_Be', 'anunnakifoxtgtb2@gmail.com', '$2a$12$3U9qO4nOvos0yQSOWZHoCe3BBPJPKU4fWpw2wvIMCLKQChqPllNky', '::1', '2022-11-20 02:07:26'),
(4, 'Bosko_Bez', 'anunn123akifoxtgtb2@gmail.com', '$2a$12$rK07JhkiHyg.2fwk1YGJ3.SOfvjKEJUmMlJwIg/zBSz33zdJBCgd2', '::1', '2022-11-20 02:08:53'),
(5, 'Ron_Tattaglia', 'anunnakifoxtgtb2222@gmail.com', '$2a$12$OmV1kL3zhG0HPTHISZjvEe7taD8SA.EU/wbogxBMmNBWAIqCO4Y2G', '::1', '2022-11-20 18:18:06'),
(6, 'Bosko_Bezarevic', 'anunnakifoxt22gtb2@gmail.com', '$2a$12$B.RqI.KE/ya9UOEy2pTU0OQHv67FeP9pffJ6nATQ7bNTgVX7QyoPe', '::1', '2022-11-20 18:20:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(10) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `steamtag` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `ipaddress` varchar(30) NOT NULL,
  `isbanned` tinyint(1) NOT NULL,
  `isVerificated` tinyint(1) NOT NULL,
  `isVerificatedByAdmin` int(1) NOT NULL DEFAULT 0,
  `postnumber` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `email`, `password`, `location`, `steamtag`, `image`, `ipaddress`, `isbanned`, `isVerificated`, `isVerificatedByAdmin`, `postnumber`, `date`) VALUES
(1, '', '', '$2a$10$0GsxPJ3Xa5ig0gLf6AXLzutB0ep4beBIcoGj6rq0dyF.5bThMVKYC', '', '', '', '0', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(2, 'asdas', 'asdas', '$2a$10$Z9xEjT0w9BcoWYZaMRFYgevtmtwDL5GqYJ3.ZoGXh46JemgQ4O6Fi', '', '', '', '0', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(4, 'roulette', 'xeqtrxxx', '$2a$10$3V1N6EoybHOGDUimr20DreEIWKiSf7hu/65tlmU8MJtFiyq8saUwy', '', '', '', '0', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(5, 'rr1312', 'boleta', '$2a$10$s7K3jQP0MzYbcllAIH4bZuNFcAi0VItfMNrrwBvJd0GUxbfHm9/ta', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(6, 'TEst', 'tase@', '$2a$10$njn.GxOHF7DtjeUbFpAMNutezppzQ7cIGydsfC68tcud6ss9sAC/e', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(7, 'easaea', 'asdf', '$2a$10$C3iyvXXQV9kBM9P3.avy3O5SDlW3oLcz.wSfXeBPlBqTCv//qUIBK', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(8, 'asdfg', 'aseaseas', '$2a$10$TakLdYAElRdNvDYrErduf.RDHKyspm.ByGUBJ94yLXKLfiEAHhFEi', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(9, 'asdfff', 'asdfff', '$2a$10$C6UGOvPss0.JJ8br4uR9bOcgTIJT2yNEQo5XQ.At1yCIapbjUFOo2', '', '', '', '::1', 1, 0, 0, 0, '2022-10-05 22:48:06'),
(10, 'acab', 'asdsad', '$2a$10$v9p7/4wTyPtaufbQeirj0Os.Q/ladd5AhfwZnYVfAsdrAM2YloUsG', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(11, 'asdasdasda', 'asdasdas', '$2a$10$mRCVO3HhTlnb5uJmmWvCKuhnu5ly8oEPy9El43gyE.cG08EuunfSW', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(12, 'asdafasfasfasf', 'afssafasfas', '$2a$10$/tIPFfP6FiZytjmslfTDS.oevYnrPe3T.luBn3zNem2D4AXs20m0m', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(13, 'aaaaaaaaaaaaaaaaa', 'adsddd', '$2a$10$sqPzBL8vs2EFii7Kn4FZIeOjR7wfS3ccmTF5.jedBjtIuIFgDv2WW', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(14, 'aseasefa', 'asdffffffffff', '$2a$10$293WsvR1IjnlinQcnQUARONkZGYc5AImmMT8FSgOtJI4TAO0jhCES', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(15, 'aseasefaddddddddddddddddddd', 'asdffffffffffdddddddddddddddddd', '$2a$10$yRw61BZPyXOlJvY37RajXe2j8oXJn6iPf1qeGEbTNVvkRmwdBsBcm', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(16, 'asdddddddd', 'xeqtrffff', '$2a$10$9UDtSSLjrXoCNdSzbAhsw.ISA7PAvidogX7P1f4cq9cB8mnJaKUkG', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(17, 'xeqtrasdasdasd', 'adadada', '$2a$10$Y6QcxoSWM0SfeFJ1FNd.iuneFOHQygs4t4MugtlULRojUYOR7WRwG', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(19, 'xeqtrasdfa', 'anunnakasdasdasifoxtgtb2@gmail.com', '$2a$10$NkKrdF6BqCcPk0QPegRWWO/EQk5EOTSzfDkBoFnnUb61aHscnA6pa', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(20, 'acab13111', 'anunnakifaafoxtgtb2@gmail.com', '$2a$10$.3kQOne52WrUsq/ysugHC.Q59fCfGIaSDHaQmgvAx0bmGP2sJ0jdi', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(21, 'asdf', 'acab@gmail.com', '$2a$10$W0Pv/qeWag0cQxYKZAVX2OmF3urjyqyqj6RHie1LigURyp487EuvO', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(22, 'asefasfaa', 'anunnaaasdfkifoxtgtb2@gmail.com', '$2a$10$pisfgXb3dnXEV/ggusIwDuNrVPW.JH4Id9Z4K9danBtAxjJGh3Pgi', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(23, 'xeqtr1312', 'anuaaaannakifoxtgtb2@gmail.com', '$2a$10$1lV4DyBJmoi15Uf4dELp0.o72sGJFHge8bUZgJwOiqhci2i.Qtqge', '', '', '', '::1', 0, 1, 0, 4, '2022-10-05 22:48:06'),
(71, 'boskobsafasfsa', 'boskeaaaaa.cs123@gmail.com', '$2a$12$.bSj95Hwck91QUykNMoRVeE/vsRPJRR23jwD4SXKGSi7g50UDSdkG', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(72, 'xeqtrfasfsa', 'anunfasfsafanakifoxtgtb2@gmail.com', '$2a$12$Jr8rcgmKqykLpFwFUKjf9ebgkXWKF5r7bHTU1/Rr00Nuc7Rvg6EYy', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(73, 'xeqtrfsafsa', 'fsafsafanunnakifoxtgtb2@gmail.com', '$2a$12$x292CPGwo76g.bbZ1QiU7eOhy0xsw09edrvkcrDN6GNzo/TJ6CKUG', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(74, 'xeqtrfaesfase', 'anufaesfeannakifoxtgtb2@gmail.com', '$2a$12$a6PhtGTYB2wnybh19UempurejRKHB1Gvie7jIesIE4NDDGxHzYRfy', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(75, 'xeqtraseaefa', 'anufasefasefsafannakifoxtgtb2@gmail.com', '$2a$12$353ymHQI7iaALSE7.aqmYujb8JM2/lFfKYKuok5ujJ7lC0r7uTChq', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(76, 'xeqtrasesae', 'anunnaasesaekifoxtgtb2@gmail.com', '$2a$12$agqEAVIb.gaXkqm.6EM9Le/hHOsuRWetkoazlOs2O9EEQM3RFFuoa', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(77, 'xeqtreasea', 'anunnakifoxtaseaegtb2@gmail.com', '$2a$12$zrnGFJrBcTanjzeZ3Ogkr.EuMXjvps/smc8lZyXp2Q7dPB.muno2m', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(78, 'xeqtraseaea', 'anunnaseaseasakifoxtgtb2@gmail.com', '$2a$12$WA0vuAR8EIhTrpCvnlPYgunPJhFIM9VQ4fmjtGPVW3u/P2bykmFei', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(84, 'testChat', 'anuaseaseasnnakifoxtgtb2@gmail.com', '$2a$12$W8r6TMSTA2ct3936R0lkQ.KJU/6KFoXOFkWP885LKrZb.WH2bSNGO', '', '', '', '::1', 0, 0, 0, 0, '2022-10-05 22:48:06'),
(86, 'xeqtr', 'aaaanunnakifoxtgtb2@gmail.com', '$2a$12$3YLTXE1GXpHdSWGSnTK1P.jG0RcSDSXn0d0o0XPszON3oOXeT0PPy', 'web', '#xeqtr1312', 'qhsvhbc9vslicus0sk8n', '::1', 0, 1, 1, 267, '2022-11-21 17:53:17'),
(87, 'test123', 'aaseaesanunnakifoxtgtb2@gmail.com', '$2a$12$GmjgCv7oeQWmHrHvZgFjI.fRyY0.q2a2VdipeQbfboqvUegXTyW6W', 'acab', 'acab', 'kgkbimjbljywzqmnavol', '::1', 0, 1, 1, 8, '2022-10-30 02:00:48'),
(88, 'testChatacab', 'anunnakifoxtgtb2@gmail.com', '$2a$12$ON60UgIoViidntDr.Nk7b.ztNB5swx4vreDGtwNj8dLquo4bl1.ZW', '', '', '', '::1', 0, 1, 1, 0, '2022-10-09 02:15:05'),
(89, 'Acab1312', 'anunnakifoxtg2222tb2@gmail.com', '$2a$12$T0NwSXvCwTwYqShDGhMFCepSAucEj0Zia3kVgNyfWr5ciLLdpjb5W', '', '', '', '::1', 0, 1, 1, 0, '2022-11-21 17:55:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banned`
--
ALTER TABLE `banned`
  ADD PRIMARY KEY (`b_id`);

--
-- Indexes for table `bannedhistory`
--
ALTER TABLE `bannedhistory`
  ADD PRIMARY KEY (`bh_id`);

--
-- Indexes for table `browserhistory`
--
ALTER TABLE `browserhistory`
  ADD PRIMARY KEY (`browserid`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `title` (`title`);

--
-- Indexes for table `editreply`
--
ALTER TABLE `editreply`
  ADD PRIMARY KEY (`e_id`);

--
-- Indexes for table `messagerooms`
--
ALTER TABLE `messagerooms`
  ADD PRIMARY KEY (`roomid`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messagesid`);

--
-- Indexes for table `messagesfromrooms`
--
ALTER TABLE `messagesfromrooms`
  ADD PRIMARY KEY (`roommessage_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`n_id`);

--
-- Indexes for table `overwatchposts`
--
ALTER TABLE `overwatchposts`
  ADD PRIMARY KEY (`ow_pid`);

--
-- Indexes for table `overwatchusers`
--
ALTER TABLE `overwatchusers`
  ADD PRIMARY KEY (`ow_id`);

--
-- Indexes for table `pinnedthemes`
--
ALTER TABLE `pinnedthemes`
  ADD PRIMARY KEY (`pinned_id`),
  ADD KEY `pinned_title` (`pinned_subforum`);

--
-- Indexes for table `pinnedthemes_replies`
--
ALTER TABLE `pinnedthemes_replies`
  ADD PRIMARY KEY (`pinnedtheme_r_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postid`),
  ADD KEY `postusername` (`postusername`),
  ADD KEY `FK_SUB_TABLE` (`category`),
  ADD KEY `posttitle` (`posttitle`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`q_id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`replyid`),
  ADD KEY `reply_post` (`reply_post`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleid`),
  ADD KEY `roleusername` (`roleusername`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `sessiontracks`
--
ALTER TABLE `sessiontracks`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`subid`),
  ADD KEY `subtitle` (`subtitle`);

--
-- Indexes for table `themeposts`
--
ALTER TABLE `themeposts`
  ADD PRIMARY KEY (`theme_postid`);

--
-- Indexes for table `themereplies`
--
ALTER TABLE `themereplies`
  ADD PRIMARY KEY (`theme_replyid`);

--
-- Indexes for table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`themeid`);

--
-- Indexes for table `ucp_users`
--
ALTER TABLE `ucp_users`
  ADD PRIMARY KEY (`ucp_uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `username` (`username`),
  ADD KEY `fk_roles` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banned`
--
ALTER TABLE `banned`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `bannedhistory`
--
ALTER TABLE `bannedhistory`
  MODIFY `bh_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `browserhistory`
--
ALTER TABLE `browserhistory`
  MODIFY `browserid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `editreply`
--
ALTER TABLE `editreply`
  MODIFY `e_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messagerooms`
--
ALTER TABLE `messagerooms`
  MODIFY `roomid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `messagesid` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=267;

--
-- AUTO_INCREMENT for table `messagesfromrooms`
--
ALTER TABLE `messagesfromrooms`
  MODIFY `roommessage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `n_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `overwatchposts`
--
ALTER TABLE `overwatchposts`
  MODIFY `ow_pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=305;

--
-- AUTO_INCREMENT for table `overwatchusers`
--
ALTER TABLE `overwatchusers`
  MODIFY `ow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `pinnedthemes`
--
ALTER TABLE `pinnedthemes`
  MODIFY `pinned_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `pinnedthemes_replies`
--
ALTER TABLE `pinnedthemes_replies`
  MODIFY `pinnedtheme_r_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `q_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `replyid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=615;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sessiontracks`
--
ALTER TABLE `sessiontracks`
  MODIFY `s_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `subid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `themeposts`
--
ALTER TABLE `themeposts`
  MODIFY `theme_postid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=318;

--
-- AUTO_INCREMENT for table `themereplies`
--
ALTER TABLE `themereplies`
  MODIFY `theme_replyid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=332;

--
-- AUTO_INCREMENT for table `themes`
--
ALTER TABLE `themes`
  MODIFY `themeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `ucp_users`
--
ALTER TABLE `ucp_users`
  MODIFY `ucp_uid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pinnedthemes`
--
ALTER TABLE `pinnedthemes`
  ADD CONSTRAINT `fk_subtitle` FOREIGN KEY (`pinned_subforum`) REFERENCES `subcategories` (`subtitle`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `FK_SUB_TABLE` FOREIGN KEY (`category`) REFERENCES `categories` (`title`);

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `FK_ReplyPost` FOREIGN KEY (`reply_post`) REFERENCES `posts` (`posttitle`) ON DELETE CASCADE;

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `fk_roles` FOREIGN KEY (`roleusername`) REFERENCES `users` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`idcategory`) REFERENCES `categories` (`cid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
