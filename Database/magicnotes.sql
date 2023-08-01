-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 20, 2021 at 06:27 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `magicnotes`
--

-- --------------------------------------------------------

--
-- Table structure for table `matin`
--

CREATE TABLE IF NOT EXISTS `matin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `theme` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `matin`
--

INSERT INTO `matin` (`id`, `title`, `content`, `theme`) VALUES
(2, 'Note', 'Chaman\n is Programmer', 'rgb(255, 255, 255)'),
(3, 'Note', 'Pillu is web designer\n', ''),
(4, 'Note', 'Pillu is web designer\n', ''),
(8, 'Note', 'All Submission comple\n', ''),
(9, 'Note', 'MATIn', '');

-- --------------------------------------------------------

--
-- Table structure for table `paju`
--

CREATE TABLE IF NOT EXISTS `paju` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `theme` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `paju`
--

INSERT INTO `paju` (`id`, `title`, `content`, `theme`) VALUES
(1, 'Note', 'ssss', '');

-- --------------------------------------------------------

--
-- Table structure for table `pratham`
--

CREATE TABLE IF NOT EXISTS `pratham` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `theme` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `pratham`
--

INSERT INTO `pratham` (`id`, `title`, `content`, `theme`) VALUES
(7, 'Matin', 'Matin is a designer...', 'rgb(167, 255, 235)'),
(10, 'Paju', 'Paju is a piro player. paju copy the code of HARI BHAU...', 'rgb(174, 203, 250)');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `email`, `password`) VALUES
('Pratham', 'prathameshchaudhary7122@gmail.com', 'pratham@7122'),
('Matin', 'shaikhmatin3230@gmail.com', 'matin@user'),
('paju', 'prajvalgandhi483@gmail.com', 'paju@user');
