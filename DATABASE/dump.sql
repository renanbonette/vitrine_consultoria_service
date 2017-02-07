CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `link_href` varchar(120) NOT NULL,
  `link_rel` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `categories_products` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `category_id` INT NOT NULL COMMENT 'id da tabela categories' ,
  `product_id` INT NOT NULL COMMENT 'SKU do produto' ,
  `year` INT NOT NULL COMMENT 'Ano do ciclo' ,
  `period` INT NOT NULL COMMENT 'Número do ciclo' ,
  PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `categories`
  ADD `createdAt` DATETIME NOT NULL AFTER `link_rel`,
  ADD `updatedAt` DATETIME NOT NULL AFTER `createdAt`;

ALTER TABLE `categories_products`
  ADD `createdAt` DATETIME NOT NULL AFTER `period`,
  ADD `updatedAt` DATETIME NOT NULL AFTER `createdAt`;
