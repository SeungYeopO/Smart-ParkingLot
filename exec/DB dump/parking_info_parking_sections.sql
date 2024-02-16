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
-- Table structure for table `parking_sections`
--

DROP TABLE IF EXISTS `parking_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking_sections` (
  `data_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `pos_x` varchar(255) DEFAULT NULL,
  `pos_y` varchar(255) DEFAULT NULL,
  `angle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`data_id`),
  CONSTRAINT `FK_lot_floor_data_TO_parking_sections_1` FOREIGN KEY (`data_id`) REFERENCES `lot_floor_data` (`data_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_sections`
--

LOCK TABLES `parking_sections` WRITE;
/*!40000 ALTER TABLE `parking_sections` DISABLE KEYS */;
INSERT INTO `parking_sections` VALUES (1,1,'88','431','0'),(2,1,'90','399','0'),(3,1,'90','378','0'),(4,1,'90','356','0'),(5,1,'90','322','0'),(6,1,'90','301','0'),(7,1,'90','267','0'),(8,1,'90','245','0'),(9,1,'90','224','0'),(10,1,'38','180','0'),(11,1,'38','159','0'),(12,1,'38','137','0'),(13,1,'38','94','0'),(14,1,'38','72','0'),(15,1,'38','51','0'),(16,1,'224','361','0'),(17,1,'271','361','0'),(18,1,'224','340','0'),(19,1,'271','340','0'),(20,1,'224','318','0'),(21,1,'271','318','0'),(22,1,'224','297','0'),(23,1,'271','297','0'),(24,1,'224','253','0'),(25,1,'271','253','0'),(26,1,'224','232','0'),(27,1,'271','232','0'),(28,1,'224','210','0'),(29,1,'271','210','0'),(30,1,'248','189','0'),(31,1,'384','361','0'),(32,1,'431','361','0'),(33,1,'384','340','0'),(34,1,'431','340','0'),(35,1,'384','318','0'),(36,1,'431','318','0'),(37,1,'384','297','0'),(38,1,'431','297','0'),(39,1,'384','254','0'),(40,1,'431','254','0'),(41,1,'384','232','0'),(42,1,'431','232','0'),(43,1,'384','211','0'),(44,1,'431','211','0'),(45,1,'408','189','0'),(46,1,'543','361','90'),(47,2,'563','354','90'),(48,1,'546','253','90'),(49,1,'568','253','90'),(50,1,'589','253','90'),(51,1,'546','206','90'),(52,1,'568','206','90'),(53,1,'589','206','90'),(54,2,'609','199','90'),(55,2,'642','256','45'),(56,2,'656','269','45'),(57,3,'646','207','90'),(58,3,'667','207','90'),(59,2,'706','202','90'),(60,2,'143','54','0'),(61,1,'146','91','90'),(62,1,'168','91','90'),(63,1,'189','91','90'),(64,1,'223','91','90'),(65,1,'245','91','90'),(66,1,'280','91','90'),(67,1,'302','91','90'),(68,1,'355','91','90'),(69,1,'377','91','90'),(70,1,'398','91','90'),(71,1,'433','91','90'),(72,1,'454','91','90'),(73,1,'487','91','90'),(74,1,'509','91','90'),(75,1,'530','91','90'),(76,1,'557','91','90'),(77,1,'600','91','90'),(78,4,'633','91','90'),(79,1,'654','91','90'),(80,1,'676','91','90'),(81,1,'730','131','0'),(82,1,'730','151','0'),(83,2,'737','171','0');
/*!40000 ALTER TABLE `parking_sections` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  9:54:05
