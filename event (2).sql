-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2023 at 04:11 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `event_img` longtext DEFAULT NULL,
  `event_description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `phone`, `created_at`) VALUES
(4, 'ali', 'ali@gmail.com', '$2y$10$3bYIHrsS0yK9GMdcJFU7CeMGkxwqmEGZ2vbYtUT8pBiBgpBzbaHee', '123456789', '2023-12-12 19:35:54'),
(5, 'alimazen', 'ma@gmail.com', '$2y$10$SIje75DbVXB0aqizL5xgUOmtO9VNWwXktN7kVNgqgxLKFDUL9SMqG', '123456789', '2023-12-12 19:49:50'),
(6, 'kk', 'kk@gmail.com', '$2y$10$hHu47GygFTTw17GStkBMJ.YxFNTJrjCnd6yeyi3AnJrqd2FaV75wC', '123456789', '2023-12-12 20:02:25'),
(7, 'kkkk', 'kkk@gmail.com', '$2y$10$KoebPIUCJx3sk2glc4ubouc2zQItp15BdsRoMBdHSg.L5WZl/i9WK', '123456789', '2023-12-12 20:05:00'),
(8, 'ii', 'i@gmail.com', '$2y$10$FdtaYW1cDkQJAy/nKV.Cn.IZaUhk253M..piTRbu9ebyZyGN5GILu', '123456789', '2023-12-12 20:14:21'),
(9, 'anaj', 'aa@gmail.com', '$2y$10$oe.ysV5603JxUuCBRr8q/eKxAuxknANzbth4b0a13UPq7stp3e.My', '123456789', '2023-12-12 20:15:02'),
(10, 'llll', 'll@gmail.com', '$2y$10$VkjRwcc560ADOcHxSkQYJe1lw5pg2NeOAO6/bkmff4Td8vMRL6oj2', '123456789', '2023-12-12 20:17:08'),
(11, 'aa', 'aa@gmail.xom', '$2y$10$feGe2EZMoY3A.wJlfwreY.KdICpfxNT2BjC0Ds.m67T1eG4LuXjKS', '01120848475', '2023-12-13 03:19:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
