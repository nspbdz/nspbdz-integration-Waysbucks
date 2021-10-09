-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Agu 2021 pada 06.30
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alfian_waysbucks_api`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `idTransaction` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `idProduct`, `idTransaction`, `qty`, `createdAt`, `updatedAt`) VALUES
(3, 2, 2, 1, '2021-08-29 10:59:12', '2021-08-29 10:59:12'),
(4, 4, 2, 2, '2021-08-29 10:59:12', '2021-08-29 10:59:12'),
(61, 2, 31, 1, '2021-08-31 01:11:45', '2021-08-31 01:11:45'),
(62, 4, 31, 2, '2021-08-31 01:11:45', '2021-08-31 01:11:45'),
(63, 4, 32, 1, '2021-08-31 03:05:27', '2021-08-31 03:05:27'),
(64, 3, 32, 2, '2021-08-31 03:05:27', '2021-08-31 03:05:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `image`, `idUser`, `createdAt`, `updatedAt`) VALUES
(1, ' Guetamala ', 200000, '1630351776598-CoconutJelly.jpg', 1, '2021-08-29 10:58:05', '2021-08-30 19:29:36'),
(2, 'kopi baru', 200000, '1630234687969-CoconutJelly.jpg', 1, '2021-08-29 10:58:07', '2021-08-29 10:58:07'),
(3, 'kopi baru', 200000, '1630234688828-CoconutJelly.jpg', 1, '2021-08-29 10:58:08', '2021-08-29 10:58:08'),
(4, 'kopi baru', 200000, '1630234689510-CoconutJelly.jpg', 1, '2021-08-29 10:58:09', '2021-08-29 10:58:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210825165455-create-user.js'),
('20210825170014-create-product.js'),
('20210825170053-create-toping.js'),
('20210825171347-create-transactions.js'),
('20210825171723-create-order.js'),
('20210828110629-create-toping-product.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `topingproducts`
--

CREATE TABLE `topingproducts` (
  `id` int(11) NOT NULL,
  `idOrder` int(11) DEFAULT NULL,
  `idToping` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `topingproducts`
--

INSERT INTO `topingproducts` (`id`, `idOrder`, `idToping`, `createdAt`, `updatedAt`) VALUES
(1, 3, 3, '2021-08-29 10:59:12', '2021-08-29 10:59:12'),
(2, 4, 2, '2021-08-29 10:59:12', '2021-08-29 10:59:12'),
(3, 3, 4, '2021-08-29 10:59:12', '2021-08-29 10:59:12'),
(4, 4, 1, '2021-08-29 10:59:12', '2021-08-29 10:59:12'),
(113, 61, 1, '2021-08-31 01:11:45', '2021-08-31 01:11:45'),
(114, 62, 3, '2021-08-31 01:11:45', '2021-08-31 01:11:45'),
(115, 61, 2, '2021-08-31 01:11:45', '2021-08-31 01:11:45'),
(116, 62, 4, '2021-08-31 01:11:45', '2021-08-31 01:11:45'),
(117, 63, 2, '2021-08-31 03:05:27', '2021-08-31 03:05:27'),
(118, 64, 3, '2021-08-31 03:05:27', '2021-08-31 03:05:27'),
(119, 63, 1, '2021-08-31 03:05:27', '2021-08-31 03:05:27'),
(120, 64, 4, '2021-08-31 03:05:27', '2021-08-31 03:05:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `topings`
--

CREATE TABLE `topings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `topings`
--

INSERT INTO `topings` (`id`, `title`, `price`, `image`, `idUser`, `createdAt`, `updatedAt`) VALUES
(1, 'coconut ', 200000, '1630234703985-CoconutJelly.jpg', 1, '2021-08-29 10:58:23', '2021-08-29 10:58:23'),
(2, 'coconut ', 200000, '1630234705595-CoconutJelly.jpg', 1, '2021-08-29 10:58:25', '2021-08-29 10:58:25'),
(3, 'coconut ', 200000, '1630234706263-CoconutJelly.jpg', 1, '2021-08-29 10:58:26', '2021-08-29 10:58:26'),
(4, ' coconut terbaru', 200000, '1630351792810-manggogelatin.jpg', 1, '2021-08-29 10:58:27', '2021-08-30 19:29:52'),
(5, 'coconut ', 200000, '1630234707664-CoconutJelly.jpg', 1, '2021-08-29 10:58:27', '2021-08-29 10:58:27'),
(6, 'coconut ', 200000, '1630351789772-CoconutJelly.jpg', 1, '2021-08-30 19:29:49', '2021-08-30 19:29:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `postCode` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `name`, `email`, `phone`, `postCode`, `status`, `address`, `attachment`, `idUser`, `createdAt`, `updatedAt`) VALUES
(2, NULL, NULL, NULL, NULL, 'success', NULL, NULL, 1, '2021-08-29 10:59:12', '2021-08-29 10:59:12'),
(31, NULL, NULL, NULL, NULL, 'success', NULL, NULL, 1, '2021-08-31 01:11:45', '2021-08-31 01:11:45'),
(32, NULL, NULL, NULL, NULL, 'success', NULL, NULL, 3, '2021-08-31 03:05:27', '2021-08-31 03:05:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `listAs` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `image`, `listAs`, `createdAt`, `updatedAt`) VALUES
(1, 'alfian', 'alfiancobaregister@gmail.com', '$2b$10$M3OdYbVRC.myn8Ac7.tZPOVSv29sN50/Rkc4KH1oZx2a4g4GTfnpy', NULL, 1, '2021-08-29 10:57:46', '2021-08-29 10:57:46'),
(3, 'alfian', 'alfian@gmail.com', '$2b$10$ygun8p76QDCuiwk.0TTPhOsEt.cBrHjXHUQ3hibRQulP4Ow9Ee76y', NULL, 1, '2021-08-31 03:00:18', '2021-08-31 03:00:18');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProduct` (`idProduct`),
  ADD KEY `idTransaction` (`idTransaction`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `topingproducts`
--
ALTER TABLE `topingproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idOrder` (`idOrder`),
  ADD KEY `idToping` (`idToping`);

--
-- Indeks untuk tabel `topings`
--
ALTER TABLE `topings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `topingproducts`
--
ALTER TABLE `topingproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT untuk tabel `topings`
--
ALTER TABLE `topings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`idTransaction`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `topingproducts`
--
ALTER TABLE `topingproducts`
  ADD CONSTRAINT `topingproducts_ibfk_1` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topingproducts_ibfk_2` FOREIGN KEY (`idToping`) REFERENCES `topings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `topings`
--
ALTER TABLE `topings`
  ADD CONSTRAINT `topings_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
