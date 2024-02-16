-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: i10c102.p.ssafy.io    Database: parking_info
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.39-MariaDB-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cross_points`
--

DROP TABLE IF EXISTS `cross_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cross_points` (
  `point_id` int(11) NOT NULL AUTO_INCREMENT,
  `data_id` int(11) NOT NULL,
  `pos_x` varchar(255) DEFAULT NULL,
  `pos_y` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`point_id`),
  KEY `FK_lot_floor_data_TO_cross_points_1` (`data_id`),
  CONSTRAINT `FK_lot_floor_data_TO_cross_points_1` FOREIGN KEY (`data_id`) REFERENCES `lot_floor_data` (`data_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cross_points`
--

LOCK TABLES `cross_points` WRITE;
/*!40000 ALTER TABLE `cross_points` DISABLE KEYS */;
INSERT INTO `cross_points` VALUES (1,84,'163','431'),(2,85,'163','399'),(3,86,'163','378'),(4,87,'163','361'),(5,88,'163','356'),(6,89,'163','340'),(7,90,'163','322'),(8,91,'163','318'),(9,92,'163','301'),(10,93,'163','297'),(11,94,'163','267'),(12,95,'163','253'),(13,96,'163','245'),(14,97,'163','232'),(15,98,'163','224'),(16,99,'163','210'),(17,100,'94','180'),(18,101,'94','159'),(19,102,'94','150'),(20,103,'94','137'),(21,104,'94','94'),(22,105,'94','72'),(23,106,'94','54'),(24,107,'94','51'),(25,108,'328','361'),(26,109,'328','340'),(27,110,'328','318'),(28,111,'328','297'),(29,112,'328','253'),(30,113,'328','232'),(31,114,'328','211'),(32,115,'490','361'),(33,116,'490','342'),(34,117,'490','318'),(35,118,'490','307'),(36,119,'490','297'),(37,120,'490','254'),(38,121,'490','232'),(39,122,'490','211'),(40,123,'543','307'),(41,124,'546','307'),(42,125,'563','307'),(43,126,'568','307'),(44,127,'589','307'),(45,128,'620','307'),(46,129,'620','280'),(47,130,'146','150'),(48,131,'163','150'),(49,132,'168','150'),(50,133,'189','150'),(51,134,'223','150'),(52,135,'237','150'),(53,136,'248','150'),(54,137,'280','150'),(55,138,'302','150'),(56,139,'327','150'),(57,140,'355','150'),(58,141,'376','150'),(59,142,'398','150'),(60,143,'408','150'),(61,144,'433','150'),(62,145,'454','150'),(63,146,'487','150'),(64,147,'490','150'),(65,148,'509','150'),(66,149,'530','150'),(67,150,'546','150'),(68,151,'557','150'),(69,152,'568','150'),(70,153,'589','150'),(71,154,'600','150'),(72,155,'609','150'),(73,156,'633','150'),(74,157,'646','150'),(75,158,'654','150'),(76,159,'667','150'),(77,160,'676','150'),(78,161,'696','130'),(79,162,'696','150'),(80,163,'696','151'),(81,164,'696','171'),(82,165,'706','171'),(83,166,'163','189'),(84,167,'328','189'),(85,168,'490','189');
/*!40000 ALTER TABLE `cross_points` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  9:54:03
