-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2020 a las 11:39:58
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sportify`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exercise`
--

CREATE TABLE `exercise` (
  `exercise_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` enum('calentamiento','principal','estiramientos') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `exercise`
--

INSERT INTO `exercise` (`exercise_id`, `name`, `description`, `url`, `type`) VALUES
(6, 'Tiros a puerta', 'Ejercicio técnico de tiros a puerta con finalización desde el centro del campo', 'https://www.youtube.com/watch?v=i67lUNFrb_U', 'principal'),
(7, 'Tiros a puerta', 'Tiros a puerta desde centro del campo', '', 'principal'),
(8, 'Tiros a puerta', '10 minutos de carrera a ritmo suave y estiramientos de todo el cuerpo', '', 'estiramientos'),
(9, 'Saques de esquina', 'Táctica para practicar el saque de esquina en los partidos', 'https://www.youtube.com/watch?v=HBMB2FXK4tQ', 'principal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `rival` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `matches`
--

INSERT INTO `matches` (`match_id`, `date`, `location`, `comments`, `rival`) VALUES
(13, '2020-09-09', 'https://goo.gl/maps/JaX3GbqFcqx9Uxgc8', 'No olvidéis los tacos de lluvia', 'IronHack'),
(14, '2020-09-01', 'https://goo.gl/maps/JaX3GbqFcqx9Uxgc8', 'Equipación blanca', 'Nodeland'),
(16, '2020-11-11', 'https://goo.gl/maps/JaX3GbqFcqx9Uxgc8', 'Equipación verde', 'Adalab C.F'),
(18, '0000-00-00', '2020-08-13', 'Equipación blanca', 'CodeforAll'),
(19, '0000-00-00', '2020-09-05', 'Equipación verde', 'IronHack'),
(20, '2020-10-15', 'https://goo.gl/maps/JaX3GbqFcqx9Uxgc8', 'Equipación blanca', 'CodeToday'),
(21, '0000-00-00', '2020-09-10', 'Equipación blanca', 'Adalab C.F'),
(22, '2020-09-18', 'Equipación blanca', 'Equipación verde', 'Adalab C.F');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches_teams`
--

CREATE TABLE `matches_teams` (
  `match_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `matches_teams`
--

INSERT INTO `matches_teams` (`match_id`, `team_id`) VALUES
(13, 2),
(14, 2),
(16, 6),
(20, 2),
(22, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `team`
--

CREATE TABLE `team` (
  `team_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `team`
--

INSERT INTO `team` (`team_id`, `name`, `category`) VALUES
(1, 'chamartin club de futbol', ''),
(2, 'Codenotch C.F', 'Primavera 20'),
(3, 'Real Madrid', 'Cadete'),
(6, 'Nodeland C.F', 'Verano 20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tournament`
--

CREATE TABLE `tournament` (
  `tournament_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `category` varchar(60) NOT NULL,
  `description` varchar(60) NOT NULL,
  `location` varchar(60) NOT NULL,
  `sport` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tournament`
--

INSERT INTO `tournament` (`tournament_id`, `date`, `category`, `description`, `location`, `sport`, `name`) VALUES
(6, '2020-10-01', 'Senior-mixto', '¡Gran Torneo Codenotch 5x5!', 'https://g.page/Codenotch?share', 'Futbol', 'Torneo Codenotch'),
(8, '2021-01-15', 'Senior-masc', '¡Torneo Marca equipos senior!', 'https://g.page/Codenotch?share', 'Baloncesto', 'Torneo Marca'),
(9, '2020-10-16', 'Alevines-mixto', '¡Torneo 7x7!', 'https://g.page/Codenotch?share', 'Futbol', 'Torneo Real Madrid'),
(10, '2020-11-07', 'Senior-fem', '¡Torneo para los mejores equipos de empresas!', 'https://g.page/Codenotch?share', 'Baloncesto', 'Torneo empresas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tournament_teams`
--

CREATE TABLE `tournament_teams` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tournament_teams`
--

INSERT INTO `tournament_teams` (`id`, `tournament_id`, `team_id`) VALUES
(5, 10, 2),
(10, 6, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `training`
--

CREATE TABLE `training` (
  `training_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `training`
--

INSERT INTO `training` (`training_id`, `name`, `date`, `location`, `description`) VALUES
(2, 'Preparación partido', '2020-09-04', 'https://goo.gl/maps/1AxGWq8wZcLv1pXW6', 'Traer conos y chalecos'),
(5, 'Resistencia', '2020-09-09', 'https://goo.gl/maps/cbXwtFd1Nri3TjL19', 'Zapatillas de correr'),
(10, 'Preparación semifinal', '2020-09-08', 'https://goo.gl/maps/cbXwtFd1Nri3TjL19', 'Practicar penaltis'),
(11, 'Resistencia ', '2020-09-09', 'https://www.google.com/maps/place/Centro+Deportivo+Tri%C3%A1ngulo+de+Oro/@40.4648815,-3.6925945,15z/data=!4m5!3m4!1s0x0:0x6bb8df2b52224454!8m2!3d40.4648815!4d-3.6925945?sa=X&ved=2ahUKEwiNqOiEmM_rAhXL8uAKHXd3Dw8Q_BIwE3oECBMQCA&shorturl=1', 'Traer agua'),
(15, 'Entrenamiento porteros', '2020-08-03', 'Polideportivo', 'Porteros entrenarán por separado'),
(17, 'Resistencia máxima', '2020-09-18', 'Polideportivo', 'Traer agua');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `training_exercises`
--

CREATE TABLE `training_exercises` (
  `exercise_id` int(11) NOT NULL,
  `training_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `training_exercises`
--

INSERT INTO `training_exercises` (`exercise_id`, `training_id`) VALUES
(6, 2),
(7, 5),
(8, 2),
(9, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `training_team`
--

CREATE TABLE `training_team` (
  `training_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `training_team`
--

INSERT INTO `training_team` (`training_id`, `team_id`) VALUES
(2, 1),
(5, 1),
(2, 2),
(5, 2),
(10, 2),
(11, 6),
(15, 2),
(17, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `rol` enum('coach','player') NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` int(9) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`rol`, `password`, `name`, `lastName`, `email`, `phone`, `user_id`) VALUES
('coach', '123456', 'Pablo', 'Fernandez', 'pablo@gmail.com', 0, 2),
('player', '123456', 'Marta', 'Hernández', 'mail3@mail.com', 123456789, 3),
('player', '123456', 'monica', 'hernandez', 'mail1@mail.com', 123456789, 4),
('coach', '162345', 'Nacho', 'manzanares', 'alex@mail.com', 123456789, 5),
('player', '1234556', 'raquel', 'hernandez', 'mail2@mail.com', 123456789, 6),
('player', '1234556', 'marta', 'hernandez', 'mail4@mail.com', 123456789, 8),
('player', '1234556', 'Pablo', 'Hebenstreit', 'mail5@mail.com', 123456789, 9),
('player', '1234556', 'Alejandro', 'Manzanares', 'mail6@mail.com', 123456789, 10),
('player', '1234556', 'Pablo', 'Canellas', 'mail7@mail.com', 123456789, 11),
('player', '1234556', 'natalia', 'hernandez', 'mail8@mail.com', 123456789, 12),
('player', '1234556', 'marcos', 'hernandez', 'mail9@mail.com', 123456789, 13),
('player', '1234556', 'maria', 'hernandez', 'mail10@mail.com', 123456789, 14),
('player', '', 'roberto', 'hernandez', 'roberto@mail.com', 123456789, 15),
('coach', '123456', 'Elena', 'Martinez', 'entrenadora@mail.com', 655544596, 16),
('player', '1234556', 'alfonso', 'hernandez', 'mail11@mail.com', 123456789, 17),
('player', '123456', 'Miguel', 'Romera', 'jugador@mail.com', 666666666, 18),
('player', '123456', 'Marina', 'Ramirez', 'marina@mail.com', 666666666, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_teams`
--

CREATE TABLE `user_teams` (
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_teams`
--

INSERT INTO `user_teams` (`team_id`, `user_id`) VALUES
(1, 2),
(2, 3),
(2, 16),
(2, 11),
(2, 10),
(2, 13),
(3, 2),
(6, 16);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`exercise_id`);

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`);

--
-- Indices de la tabla `matches_teams`
--
ALTER TABLE `matches_teams`
  ADD KEY `match_id` (`match_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indices de la tabla `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`);

--
-- Indices de la tabla `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`tournament_id`);

--
-- Indices de la tabla `tournament_teams`
--
ALTER TABLE `tournament_teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indices de la tabla `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`training_id`);

--
-- Indices de la tabla `training_exercises`
--
ALTER TABLE `training_exercises`
  ADD KEY `training_id` (`training_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indices de la tabla `training_team`
--
ALTER TABLE `training_team`
  ADD KEY `team_id` (`team_id`),
  ADD KEY `training_id` (`training_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `user_teams`
--
ALTER TABLE `user_teams`
  ADD KEY `team_id` (`team_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `exercise`
--
ALTER TABLE `exercise`
  MODIFY `exercise_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `team`
--
ALTER TABLE `team`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tournament_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tournament_teams`
--
ALTER TABLE `tournament_teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `training`
--
ALTER TABLE `training`
  MODIFY `training_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `matches_teams`
--
ALTER TABLE `matches_teams`
  ADD CONSTRAINT `matches_teams_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `matches_teams_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tournament_teams`
--
ALTER TABLE `tournament_teams`
  ADD CONSTRAINT `tournament_teams_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tournament_teams_ibfk_2` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`tournament_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `training_exercises`
--
ALTER TABLE `training_exercises`
  ADD CONSTRAINT `training_exercises_ibfk_1` FOREIGN KEY (`training_id`) REFERENCES `training` (`training_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `training_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`exercise_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `training_team`
--
ALTER TABLE `training_team`
  ADD CONSTRAINT `training_team_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `training_team_ibfk_2` FOREIGN KEY (`training_id`) REFERENCES `training` (`training_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_teams`
--
ALTER TABLE `user_teams`
  ADD CONSTRAINT `user_teams_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_teams_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
