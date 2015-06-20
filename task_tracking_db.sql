-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2015 at 12:12 PM
-- Server version: 5.6.15-log
-- PHP Version: 5.5.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `task_tracking_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tt_comment`
--

CREATE TABLE IF NOT EXISTS `tt_comment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `task_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `progress_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment_by` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=23 ;

--
-- Dumping data for table `tt_comment`
--

INSERT INTO `tt_comment` (`id`, `task_id`, `progress_id`, `comment_by`, `content`, `created`, `modified`) VALUES
(3, '1', '867e1eef-336b-8ef1-a157-d32847161082', '2', 'dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd dgdgdfgd ', '2015-06-05 15:52:06', NULL),
(4, '1', '867e1eef-336b-8ef1-a157-d32847161082', '1', 'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ', '2015-06-05 17:06:02', NULL),
(5, '1', '867e1eef-336b-8ef1-a157-d32847161082', '2', 'sdfdsfsdfsfs', '2015-06-05 17:06:51', NULL),
(6, '1', '867e1eef-336b-8ef1-a157-d32847161082', '2', 'test refresh', '2015-06-07 12:21:14', NULL),
(7, '1', 'af92764f-0fb7-fea5-ef88-7e60d1f893cb', '2', 'done', '2015-06-07 13:44:05', NULL),
(8, '979553cd-b8d3-8fec-0847-2dfbcec65f31', '3a93b8a5-dd7b-81e4-825b-d05710370d3c', '2', 'no comments', '2015-06-08 20:30:26', NULL),
(9, '979553cd-b8d3-8fec-0847-2dfbcec65f31', 'd874e448-dba6-3d08-2a8f-d07a266566cc', '2', 'kara madesuta', '2015-06-08 20:34:51', NULL),
(10, '3184ff2a-cfdc-f278-6460-7647e6ccf0d3', '5e533263-e441-e199-407f-b5f12b3ca173', '2', 'hello moto', '2015-06-12 20:33:49', NULL),
(11, '3184ff2a-cfdc-f278-6460-7647e6ccf0d3', '5e533263-e441-e199-407f-b5f12b3ca173', '2', 'catalina', '2015-06-12 20:37:28', NULL),
(15, '3184ff2a-cfdc-f278-6460-7647e6ccf0d3', '5e533263-e441-e199-407f-b5f12b3ca173', '1', 'ddddd', '2015-06-12 20:53:22', NULL),
(16, '3184ff2a-cfdc-f278-6460-7647e6ccf0d3', '24cdb53e-96c4-ac76-b48e-cb0b395eb878', '2', 'ghty', '2015-06-12 21:11:10', NULL),
(17, '3184ff2a-cfdc-f278-6460-7647e6ccf0d3', '5e533263-e441-e199-407f-b5f12b3ca173', '2', 'salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd salalf dlkjsld lkjfd', '2015-06-12 22:08:42', NULL),
(18, '5cdd1d42-a08b-dcac-1d0d-41f3388a4b5c', 'fa931fd1-7fc8-c504-0138-67572fcc3931', '2', 'heroku made sukarate yamaheka', '2015-06-17 15:15:45', NULL),
(21, '5cdd1d42-a08b-dcac-1d0d-41f3388a4b5c', 'fa931fd1-7fc8-c504-0138-67572fcc3931', '10', 'helo moto', '2015-06-17 16:04:52', NULL),
(22, '5cdd1d42-a08b-dcac-1d0d-41f3388a4b5c', 'fa931fd1-7fc8-c504-0138-67572fcc3931', '10', 'fghfghfgh', '2015-06-17 16:05:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tt_otp`
--

CREATE TABLE IF NOT EXISTS `tt_otp` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `otp_key` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `otp_hash` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `expired_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=34 ;

--
-- Dumping data for table `tt_otp`
--

INSERT INTO `tt_otp` (`id`, `user_id`, `otp_key`, `otp_hash`, `expired_at`) VALUES
(25, '1', '995738824', '749881756f9fa685b9332f776f148a555c543c99', '2015-06-18 17:21:40'),
(26, '1', '229287742', '64fc50e58ca08e1b466612153f91b787e81685b3', '2015-06-18 17:22:30'),
(27, '1', '633948187', '4d0ebe9fa1eae15516089c8a2bb1305a594c5f02', '2015-06-18 17:22:46'),
(28, '1', '939416238', 'd23d9c7d5daaa9339b1aecef97c50fab1bfba79e', '2015-06-18 17:23:01'),
(29, '1', '951875453', '2d3549125e14e818bfd8b3263b1a57d05e95655f', '2015-06-18 17:23:32'),
(30, '1', '225725837', '7ec8dd23dfa384ef22bf4bd6d7b465ebfa4b34ad', '2015-06-18 17:56:30'),
(32, '1', '590488931', 'f715af03567d05658e8e83899886dbe85545c525', '2015-06-18 18:53:38'),
(33, '1', '655973725', '745421e4327df1dd1e38d33adff4acc7770f889b', '2015-06-18 18:55:42');

-- --------------------------------------------------------

--
-- Table structure for table `tt_priority`
--

CREATE TABLE IF NOT EXISTS `tt_priority` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `priority_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alias` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` smallint(5) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tt_priority`
--

INSERT INTO `tt_priority` (`id`, `priority_name`, `alias`, `level`) VALUES
(1, 'Urgent', 'urgent', 100),
(2, 'Immediate', 'immediate', 50),
(3, 'Normal', 'normal', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tt_progress`
--

CREATE TABLE IF NOT EXISTS `tt_progress` (
  `id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `task_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` datetime NOT NULL,
  `modified` datetime DEFAULT NULL,
  `rate` smallint(5) unsigned NOT NULL DEFAULT '5',
  `note` text COLLATE utf8_unicode_ci,
  `created_by` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modified_by` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tt_progress`
--

INSERT INTO `tt_progress` (`id`, `task_id`, `created`, `modified`, `rate`, `note`, `created_by`, `modified_by`) VALUES
('125578ca-bc07-5cfe-43f9-4003ec116348', '3', '2015-06-08 20:20:54', NULL, 20, 'belami deto sika', '2', NULL),
('24cdb53e-96c4-ac76-b48e-cb0b395eb878', '3184ff2a-cfdc-f278-6460-7647e6ccf0d3', '2015-06-09 13:52:01', NULL, 20, 'kala madetasu', '2', NULL),
('321078e6-ebce-fdab-c35f-cb25c19bcda9', '1', '2015-06-07 16:54:39', NULL, 100, 'xong rồi', '2', NULL),
('3a93b8a5-dd7b-81e4-825b-d05710370d3c', '979553cd-b8d3-8fec-0847-2dfbcec65f31', '2015-06-08 20:24:53', NULL, 25, 'hikotami densutaki ketamustu', '2', NULL),
('404262db-f90d-7f82-92d8-4b214a52b8bc', '979553cd-b8d3-8fec-0847-2dfbcec65f31', '2015-06-09 11:34:13', '2015-06-09 18:58:29', 30, 'hông có à nha', '2', '2'),
('47650303-b378-89e0-c09a-a0b729950aa3', '3', '2015-06-08 20:21:35', NULL, 25, 'saka milato koromi nedosuta', '2', NULL),
('5e533263-e441-e199-407f-b5f12b3ca173', '3184ff2a-cfdc-f278-6460-7647e6ccf0d3', '2015-06-10 18:47:01', NULL, 25, 'Chán như con gián! Đói như con sói!', '2', NULL),
('8090ba53-62bc-dc8e-8ed9-bfd5a63ae776', '3393899e-f5d2-1492-688c-9bd09ce59b9c', '2015-06-10 13:34:47', NULL, 10, 'helo moto', '2', NULL),
('867e1eef-336b-8ef1-a157-d32847161082', '1', '2015-06-04 16:00:27', NULL, 80, 'xong', '2', NULL),
('af92764f-0fb7-fea5-ef88-7e60d1f893cb', '1', '2015-06-03 22:17:25', NULL, 40, 'hic', '2', NULL),
('b23a21e1-6b8b-1c19-a9ea-408d6a99a41c', '3393899e-f5d2-1492-688c-9bd09ce59b9c', '2015-06-10 22:12:04', NULL, 100, 'xong! hehehe', '2', NULL),
('bd9381f1-4f4f-8cb7-8ceb-2f3ee07b1627', '3', '2015-06-09 15:08:37', NULL, 40, 'hohohahako lo flkg', '2', NULL),
('cd24e169-40cb-969f-51e4-9489d23d3b2c', '3', '2015-06-09 14:18:45', NULL, 35, 'horokudasande to no koramadestu', '2', NULL),
('d874e448-dba6-3d08-2a8f-d07a266566cc', '979553cd-b8d3-8fec-0847-2dfbcec65f31', '2015-06-08 20:23:36', NULL, 20, 'babla koca sika melato gohotuki', '2', NULL),
('ded4619f-5ba7-3337-b69b-c680f3fd011b', '1', '2015-06-03 22:01:30', NULL, 35, 'hahaha', '2', NULL),
('fa386228-cbce-c4c8-39c7-d545143f6ce1', '3', '2015-06-08 20:12:13', NULL, 15, 'helo moto', '2', NULL),
('fa931fd1-7fc8-c504-0138-67572fcc3931', '5cdd1d42-a08b-dcac-1d0d-41f3388a4b5c', '2015-06-17 15:09:03', NULL, 15, 'heroku takana sewa', '10', NULL),
('fd3485b9-64a0-0e9b-4621-d68c419930e9', '979553cd-b8d3-8fec-0847-2dfbcec65f31', '2015-06-09 11:36:25', NULL, 40, 'sdfsfs', '2', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tt_role`
--

CREATE TABLE IF NOT EXISTS `tt_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `alias` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `powering` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tt_role`
--

INSERT INTO `tt_role` (`id`, `role_name`, `alias`, `powering`) VALUES
(1, 'Manager', 'M', 900),
(2, 'Supervisor', 'S', 500),
(3, 'Executive', 'E', 100);

-- --------------------------------------------------------

--
-- Table structure for table `tt_setting`
--

CREATE TABLE IF NOT EXISTS `tt_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_data` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tt_setting`
--

INSERT INTO `tt_setting` (`id`, `setting_data`) VALUES
(1, '{"smtp":{"secure":"none","port":25,"username":"dat.le@songminhasia.com","password":"lmD@t3107","host_name":"mail.songminhasia.com","email_sender":"dat.le@songminhasia.com","sender_name":"Vincent Le"}}');

-- --------------------------------------------------------

--
-- Table structure for table `tt_task`
--

CREATE TABLE IF NOT EXISTS `tt_task` (
  `id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `task_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `user_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modified_by` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `priority_id` smallint(5) unsigned NOT NULL DEFAULT '1',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tt_task`
--

INSERT INTO `tt_task` (`id`, `parent`, `task_name`, `start_date`, `end_date`, `description`, `created`, `modified`, `user_id`, `created_by`, `modified_by`, `priority_id`, `status`) VALUES
('1', 0, 'Task 0001: làm phần my tasks, giao hóa đơn', '2015-05-24', '2015-05-28', 'Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 Demo 001 ', '2015-05-24 21:21:33', NULL, '2', '1', NULL, 100, 2),
('2', 0, 'Task 0002', '2015-05-23', '2015-05-29', 'Demo 0002', '2015-05-24 22:44:58', NULL, '6', '1', NULL, 1, 0),
('3', 0, 'Task 0003', '2015-05-25', '2015-05-27', 'Demo 0003', '2015-05-25 11:14:46', NULL, '2', '1', NULL, 1, 1),
('3184ff2a-cfdc-f278-6460-7647e6ccf0d3', 0, 'Task 10008: làm gấp làm gấp làm gấp làm gấp làm gấp', '2015-06-07', '2015-06-15', 'none none none none none none none none none none none none none none none none none none none none none none none none none none none none none none none none none none none none ', '2015-06-07 14:58:40', NULL, '2', '1', NULL, 100, 1),
('3393899e-f5d2-1492-688c-9bd09ce59b9c', 0, 'task 0009: từ từ làm thôi', '2015-06-10', '2015-06-18', 'none', '2015-06-07 15:00:17', NULL, '2', '1', NULL, 1, 2),
('5cdd1d42-a08b-dcac-1d0d-41f3388a4b5c', 0, 'Hoàn thành chức năng quản lý Task', '2015-06-14', '2015-06-19', 'Xem demo', '2015-06-14 16:39:06', NULL, '10', '2', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tt_token`
--

CREATE TABLE IF NOT EXISTS `tt_token` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_token` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=7 ;

--
-- Dumping data for table `tt_token`
--

INSERT INTO `tt_token` (`id`, `user_id`, `access_token`, `expired_at`) VALUES
(4, '1', 'c63c2d8a59473365521f9296468c56ea155581aaa8e2661c4cc03db6d96142ed', '2015-06-19 17:39:23'),
(5, '10', '506c40d8ccdae486e81bb426329ec0487277032b2bf2da8ddc345d5880080512', '2015-06-19 18:07:01'),
(6, '2', 'bb6ac2179088701c4df698eed9076c4980a2bde780dbc3b77ab3c344d4b0db40', '2015-06-19 17:40:13');

-- --------------------------------------------------------

--
-- Table structure for table `tt_user`
--

CREATE TABLE IF NOT EXISTS `tt_user` (
  `id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `surname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `salt` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `main_user` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `expired_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ref_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `role_id` smallint(5) unsigned NOT NULL DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tt_user`
--

INSERT INTO `tt_user` (`id`, `first_name`, `surname`, `title`, `email`, `password`, `salt`, `main_user`, `expired_key`, `ref_id`, `active`, `role_id`) VALUES
('1', 'Dat', 'Le', 'Manager', 'sirminhdat@gmail.com', '$2y$12$OZVWYsvTRhib4cEGsAw7aOqX4F1dDFEEoRE2HXWttQND45PdXAmvu', 'efe2e4ae14a011dbf854b17e05ea99ac', 1, '', '0', 1, 900),
('10', 'Vincent', 'Le', 'Web Developer', 'minh_dat_le@yahoo.com', '$2y$12$eyqFkgwJHjuHOJcLOwJ4i.tbWqdB6aSJBxDRPf2F2VqzJm9Nyyhzy', '5c7b084c360ecc8d1d454cf7bb8e1f8c', 0, '', '1', 1, 100),
('2', 'Vicko', 'Sanzi', 'Marketing Manager', 'vicko@gmail.com', '$2y$12$DKZdLBIIiLhx/pD6FaHufebCSq9yH4kj.hyB.yis6O7zMRPp1RREi', '7f73c5d3381fecae95535a77be126fa1', 0, '', '1', 1, 500),
('3', 'Helen', 'Zeng', 'Designer', 'helen@gmail.com', '$2y$12$Io7OP2sap6J88Fj4O0PFWuOv8PYcSI15m8dIDB5Ea8WwXpG9OFNNK', 'ef936da32cf2b91299d865a18c2efba2', 0, '', '1', 1, 100),
('4', 'Jimy', 'Fury', 'Developer', 'jimy@gmail.com', '$2y$12$KfxZjtnZH.AVzD0SlVrlAejnQU8c7rIuDZ7Im.utABIk1O7vIaH4i', '9a83011c5a30c7be01934d40a9129b13', 0, '', '1', 1, 100),
('5', 'Mika', 'Parem', 'Admin', 'mika@gmail.com', '$2y$12$8xvZR2YzKcj6Iy4kX1JvPOBGUcLwlXyLgH.doljoeOxX9d5fOGdlC', '94a1c5cf4864527a77dffb2136bf5f86', 0, '', '1', 1, 100),
('6', 'Peter', 'Slim', 'Accounting', 'peter@gmail.com', '$2y$12$qucRkQUUMrxVCwwTzM4CI.MHE8wwEkuszVmn0fOilDdGeR1SRLxUG', '4fbf3f520c074bf242b41bd36aa8defe', 0, '', '1', 1, 100),
('760149a2-f9b4-6e37-cc34-7c4607f77bc3', 'Talaha', 'Muose', 'Sercurity', 'talaha@gmail.com', '$2y$12$Lg02LfMyxdCJdeN6duIETeSLwGIHNgb.urs/MQwgS/RE7rGMyltH.', 'c15b026b010ee418093d37c83554ce44', 0, NULL, '1', 1, 100),
('88b0c33f-87f0-59a3-8e9f-8441ccb9b622', 'SEDA', 'sdfsd567', 'sdfsdf567', 'rty67yuh@gmail.com', '$2y$12$8gkCjc5sRAldpitOp56taOnMGDyK.ofxUuwswQRd5b9.3yrzbgmOy', '634d05ea5117260e43e4b7c10c2d55c0', 0, NULL, '1', 1, 100);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
