-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-08-2023 a las 20:06:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pecera1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `ID_Admin` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Ape_Paterno` varchar(50) DEFAULT NULL,
  `Ape_Materno` varchar(50) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Contraseña` varchar(100) DEFAULT NULL,
  `ID_Roles` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`ID_Admin`, `Nombre`, `Ape_Paterno`, `Ape_Materno`, `Correo`, `Contraseña`, `ID_Roles`) VALUES
(1, 'Juan', 'Pérez', 'Gómez', 'juan@example.com', 'password123', 1),
(2, 'María', 'García', 'López', 'maria@example.com', 'securepass', 1),
(3, 'Pedro', 'Martínez', 'Ramírez', 'pedro@example.com', 'p@ssw0rd', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `ID_Inventario` int(11) NOT NULL,
  `ID_Pecera` int(11) DEFAULT NULL,
  `ID_Sensores` int(11) DEFAULT NULL,
  `Cant_Sen_PH` int(11) DEFAULT NULL,
  `Cant_Sen_Temp` int(11) DEFAULT NULL,
  `Cant_Sen_Nivel` int(11) DEFAULT NULL,
  `Cant_Sen_Luz` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`ID_Inventario`, `ID_Pecera`, `ID_Sensores`, `Cant_Sen_PH`, `Cant_Sen_Temp`, `Cant_Sen_Nivel`, `Cant_Sen_Luz`) VALUES
(1, 1, 1, 2, 3, 1, 2),
(2, 2, 2, 1, 2, 1, 1),
(3, 3, 3, 2, 1, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `ID_Log` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Error` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`ID_Log`, `Fecha`, `Error`) VALUES
(1, '2023-07-28', 'Error en el sistema.'),
(2, '2023-07-27', 'Error al cargar datos.'),
(3, '2023-07-26', 'Acceso no autorizado.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pecera`
--

CREATE TABLE `pecera` (
  `ID_Pecera` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Tamaño` varchar(50) DEFAULT NULL,
  `Capacidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pecera`
--

INSERT INTO `pecera` (`ID_Pecera`, `Nombre`, `Tamaño`, `Capacidad`) VALUES
(1, 'Pecera 1', 'Grande', 100),
(2, 'Pecera 2', 'Mediana', 50),
(3, 'Pecera 3', 'Pequeña', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peces`
--

CREATE TABLE `peces` (
  `ID_Pez` int(11) NOT NULL,
  `Raza` varchar(100) DEFAULT NULL,
  `Tamaño` varchar(20) DEFAULT NULL,
  `Color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peces`
--

INSERT INTO `peces` (`ID_Pez`, `Raza`, `Tamaño`, `Color`) VALUES
(1, 'Guppy', 'Pequeño', 'Multicolor'),
(2, 'Betta', 'Pequeño', 'Azul'),
(3, 'Goldfish', 'Mediano', 'Naranja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `ID_Proveedor` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `Producto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`ID_Proveedor`, `Nombre`, `Tipo`, `Producto`) VALUES
(1, 'Proveedor A', 'Electrónica', 'Sensores de temperatura'),
(2, 'Proveedor B', 'Alimentos', 'Alimento para peces'),
(3, 'Proveedor C', 'Decoración', 'Plantas artificiales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `ID_Roles` int(11) NOT NULL,
  `Role_Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID_Roles`, `Role_Name`) VALUES
(1, 'Administrador'),
(2, 'Usuario'),
(3, 'Invitado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensores`
--

CREATE TABLE `sensores` (
  `ID_Sensores` int(11) NOT NULL,
  `Fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `Sen_Temp` float NOT NULL,
  `Sen_Nivel` int(10) NOT NULL,
  `Sen_Luz` int(10) NOT NULL,
  `Sen_PH` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensores`
--

INSERT INTO `sensores` (`ID_Sensores`, `Fecha`, `Sen_Temp`, `Sen_Nivel`, `Sen_Luz`, `Sen_PH`) VALUES
(1, '2023-08-07 09:10:10', 1, 0, 1, 1),
(2, '2023-08-07 09:10:10', 1, 1, 0, 0),
(3, '2023-08-07 09:10:10', 0, 0, 1, 1),
(4, '2023-08-07 09:10:10', 26, 60, 127, 7),
(5, '2023-08-07 09:10:10', 26, 62, 127, 7),
(6, '2023-08-07 09:10:10', 25, 58, 127, 7),
(7, '2023-08-07 09:10:10', 25, 59, 127, 7),
(8, '2023-08-07 09:10:10', 26, 61, 127, 7),
(9, '2023-08-07 09:10:10', 27, 63, 127, 7),
(10, '2023-08-07 09:10:10', 25, 57, 127, 7),
(11, '2023-08-07 09:10:10', 26, 60, 127, 7),
(12, '2023-08-07 09:10:10', 26, 62, 127, 8),
(13, '2023-08-07 09:10:10', 25, 59, 127, 7),
(14, '2023-08-07 09:10:10', 0, 0, 0, 0),
(15, '2023-08-07 10:00:41', 25, 127, 0, 0),
(16, '2023-08-07 10:00:45', 25, 127, 0, 0),
(17, '2023-08-07 10:00:49', 25, 127, 0, 0),
(18, '2023-08-07 10:00:53', 25, 127, 0, 0),
(19, '2023-08-07 10:00:57', 25, 127, 0, 0),
(20, '2023-08-07 10:01:02', 25, 127, 0, 0),
(21, '2023-08-07 10:01:06', 25, 127, 0, 0),
(22, '2023-08-07 10:01:10', 25, 127, 0, 0),
(23, '2023-08-07 10:01:14', 25, 127, 0, 0),
(24, '2023-08-07 10:01:18', 25, 127, 0, 0),
(25, '2023-08-07 10:01:23', 25, 127, 0, 0),
(26, '2023-08-07 10:01:27', 25, 127, 0, 0),
(27, '2023-08-07 10:01:31', 25, 127, 0, 0),
(28, '2023-08-07 10:01:35', 25, 127, 0, 0),
(29, '2023-08-07 10:01:40', 25, 127, 0, 0),
(30, '2023-08-07 10:01:44', 25, 127, 0, 0),
(31, '2023-08-07 10:01:48', 25, 127, 0, 0),
(32, '2023-08-07 10:01:52', 25, 127, 0, 0),
(33, '2023-08-07 10:01:56', 25, 127, 0, 0),
(34, '2023-08-07 10:02:01', 25, 127, 0, 0),
(35, '2023-08-07 10:02:05', 25, 7, 0, 0),
(36, '2023-08-07 10:57:00', 25, 847, 0, 0),
(37, '2023-08-07 10:57:04', 25, 661, 0, 0),
(38, '2023-08-07 10:57:08', 25, 784, 0, 0),
(39, '2023-08-07 10:57:12', 25, 1064, 0, 0),
(40, '2023-08-07 10:57:16', 25, 641, 0, 0),
(41, '2023-08-07 10:57:20', 25, 784, 0, 0),
(42, '2023-08-07 10:57:25', 25, 1071, 0, 0),
(43, '2023-08-07 10:57:29', 25, 626, 0, 0),
(44, '2023-08-07 10:57:33', 25, 686, 0, 0),
(45, '2023-08-07 10:57:39', 25, 1065, 0, 0),
(46, '2023-08-07 10:57:42', 25, 679, 0, 0),
(47, '2023-08-07 10:57:46', 25, 709, 0, 0),
(48, '2023-08-07 10:57:50', 25, 1067, 0, 0),
(49, '2023-08-07 10:57:54', 25, 688, 0, 0),
(50, '2023-08-07 10:57:58', 25, 787, 0, 0),
(51, '2023-08-07 10:58:03', 25, 1078, 0, 0),
(52, '2023-08-07 10:58:07', 25, 957, 0, 0),
(53, '2023-08-07 10:58:11', 25, 937, 0, 0),
(54, '2023-08-07 10:58:15', 25, 947, 0, 0),
(55, '2023-08-07 10:58:19', 25, 673, 0, 0),
(56, '2023-08-07 10:58:24', 25, 972, 0, 0),
(57, '2023-08-07 10:58:28', 25, 889, 0, 0),
(58, '2023-08-07 10:58:32', 25, 657, 0, 0),
(59, '2023-08-07 10:58:36', 25, 986, 0, 0),
(60, '2023-08-07 10:58:41', 25, 946, 0, 0),
(61, '2023-08-07 10:58:45', 25, 690, 0, 0),
(62, '2023-08-07 10:58:49', 25, 1023, 0, 0),
(63, '2023-08-07 10:58:53', 25, 951, 0, 0),
(64, '2023-08-07 10:58:57', 25, 595, 0, 0),
(65, '2023-08-07 10:59:02', 25, 1072, 0, 0),
(66, '2023-08-07 10:59:06', 25, 630, 0, 0),
(67, '2023-08-07 10:59:10', 25, 1008, 0, 0),
(68, '2023-08-07 10:59:14', 25, 909, 0, 0),
(69, '2023-08-07 10:59:18', 25, 647, 0, 0),
(70, '2023-08-07 10:59:23', 25, 1021, 0, 0),
(71, '2023-08-07 10:59:27', 25, 689, 0, 0),
(72, '2023-08-07 10:59:31', 25, 769, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Ape_Paterno` varchar(50) DEFAULT NULL,
  `Ape_Materno` varchar(50) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Contraseña` varchar(100) DEFAULT NULL,
  `Tipo_Pecera` varchar(50) DEFAULT NULL,
  `ID_Roles` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_Usuario`, `Nombre`, `Ape_Paterno`, `Ape_Materno`, `Correo`, `Contraseña`, `Tipo_Pecera`, `ID_Roles`) VALUES
(1, 'Luis', 'Ramírez', 'Gómez', 'luis@example.com', 'luis123', 'Acuario', 2),
(2, 'Ana', 'García', 'Hernández', 'ana@example.com', 'ana321', 'Estanque', 2),
(3, 'Carlos', 'Vargas', 'Mendoza', 'carlos@example.com', 'carlospass', 'Acuario', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`ID_Admin`),
  ADD KEY `ID_Roles` (`ID_Roles`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`ID_Inventario`),
  ADD KEY `ID_Pecera` (`ID_Pecera`),
  ADD KEY `ID_Sensores` (`ID_Sensores`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`ID_Log`);

--
-- Indices de la tabla `pecera`
--
ALTER TABLE `pecera`
  ADD PRIMARY KEY (`ID_Pecera`);

--
-- Indices de la tabla `peces`
--
ALTER TABLE `peces`
  ADD PRIMARY KEY (`ID_Pez`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`ID_Proveedor`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID_Roles`);

--
-- Indices de la tabla `sensores`
--
ALTER TABLE `sensores`
  ADD PRIMARY KEY (`ID_Sensores`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD KEY `ID_Roles` (`ID_Roles`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `ID_Admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `ID_Inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `ID_Log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pecera`
--
ALTER TABLE `pecera`
  MODIFY `ID_Pecera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `peces`
--
ALTER TABLE `peces`
  MODIFY `ID_Pez` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `ID_Proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID_Roles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sensores`
--
ALTER TABLE `sensores`
  MODIFY `ID_Sensores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`ID_Roles`) REFERENCES `roles` (`ID_Roles`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`ID_Pecera`) REFERENCES `pecera` (`ID_Pecera`),
  ADD CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`ID_Sensores`) REFERENCES `sensores` (`ID_Sensores`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ID_Roles`) REFERENCES `roles` (`ID_Roles`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
