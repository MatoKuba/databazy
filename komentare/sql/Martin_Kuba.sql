-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: localhost
-- Čas generovania: So 28.Jan 2023, 12:17
-- Verzia serveru: 10.3.31-MariaDB-0+deb10u1
-- Verzia PHP: 7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `Martin_Kuba`
--

DELIMITER $$
--

--
-- Štruktúra tabuľky pre tabuľku `autor`
--

CREATE TABLE `autor` (
  `ID_autor` int(10) DEFAULT NULL,
  `meno` varchar(10) DEFAULT NULL,
  `priezvisko` varchar(10) DEFAULT NULL,
  `rok_nar` int(5) DEFAULT NULL,
  `krajina_pôvodu` varchar(15) DEFAULT NULL,
  `ID_ocenenie` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `kraj`
--

CREATE TABLE `kraj` (
  `id` int(11) NOT NULL,
  `kraj` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Sťahujem dáta pre tabuľku `kraj`
--

INSERT INTO `kraj` (`id`, `kraj`) VALUES
(2, 'Banskobystrický kraj'),
(1, 'Bratislavský kraj'),
(3, 'Nitriansky kraj');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `ocenenie`
--

CREATE TABLE `ocenenie` (
  `ID_ocenenie` int(5) DEFAULT NULL,
  `názov` varchar(10) DEFAULT NULL,
  `krajina_pôvodu` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------


--
-- Štruktúra tabuľky pre tabuľku `podujatia`
--

CREATE TABLE `podujatia` (
  `id` int(11) NOT NULL,
  `meno` varchar(100) NOT NULL,
  `opis` varchar(100) NOT NULL,
  `dátum` date NOT NULL,
  `ID_typ` int(11) NOT NULL,
  `miesto` varchar(100) NOT NULL,
  `ID_kraj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Sťahujem dáta pre tabuľku `podujatia`
--

INSERT INTO `podujatia` (`id`, `meno`, `opis`, `dátum`, `ID_typ`, `miesto`, `ID_kraj`) VALUES
(1, 'Podujatie 1', 'prve podujatie', '2023-01-04', 1, 'Slatina', 2);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Sťahujem dáta pre tabuľku `posts`
--

INSERT INTO `posts` (`id`, `userId`, `rating`, `created_at`, `message`) VALUES
(1, 1, 39, '2022-12-10 12:34:21', 'Testovacia sprava'),
(10, 1, 0, '2023-01-12 18:51:40', 'sssa');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `typPodujati`
--

CREATE TABLE `typPodujati` (
  `id` int(11) NOT NULL,
  `typ` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Sťahujem dáta pre tabuľku `typPodujati`
--

INSERT INTO `typPodujati` (`id`, `typ`) VALUES
(2, 'Divadlo'),
(3, 'Festival'),
(1, 'Film'),
(4, 'Koncert');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roles` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Sťahujem dáta pre tabuľku `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `roles`) VALUES
(1, 'user', '56b1db8133d9eb398aabd376f07bf8ab5fc584ea0b8bd6a1770200cb613ca005', 'user'),
(2, 'admin', '56b1db8133d9eb398aabd376f07bf8ab5fc584ea0b8bd6a1770200cb613ca005', 'user,admin'),
(3, 'marian', '90368baa40bf453d6453be58e9adfc0a198d7ceb84f313bde3d3f05800cac7b5', 'user');

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `kraj`
--
ALTER TABLE `kraj`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kraj` (`kraj`);

-- Indexy pre tabuľku `podujatia`
--
ALTER TABLE `podujatia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `meno` (`meno`),
  ADD KEY `opis` (`opis`),
  ADD KEY `miesto` (`miesto`),
  ADD KEY `dátum` (`dátum`),
  ADD KEY `podujatia_ibfk_1` (`ID_typ`),
  ADD KEY `podujatia_ibfk_2` (`ID_kraj`);

--
-- Indexy pre tabuľku `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`userId`),
  ADD KEY `rating` (`rating`),
  ADD KEY `created_at` (`created_at`);

--
-- Indexy pre tabuľku `typPodujati`
--
ALTER TABLE `typPodujati`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `typ` (`typ`);

--
-- Indexy pre tabuľku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pre tabuľku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Obmedzenie pre exportované tabuľky
--

--
-- Obmedzenie pre tabuľku `podujatia`
--
ALTER TABLE `podujatia`
  ADD CONSTRAINT `podujatia_ibfk_1` FOREIGN KEY (`ID_typ`) REFERENCES `typPodujati` (`id`),
  ADD CONSTRAINT `podujatia_ibfk_2` FOREIGN KEY (`ID_kraj`) REFERENCES `kraj` (`id`);

--
-- Obmedzenie pre tabuľku `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
