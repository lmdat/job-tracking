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

