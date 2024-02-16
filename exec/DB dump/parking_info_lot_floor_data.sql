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
-- Table structure for table `lot_floor_data`
--

DROP TABLE IF EXISTS `lot_floor_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lot_floor_data` (
  `data_id` int(11) NOT NULL AUTO_INCREMENT,
  `lot_id` int(11) NOT NULL,
  `floor` int(11) DEFAULT NULL,
  `point_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`data_id`),
  KEY `FK_parking_lots_TO_lot_floor_data_1` (`lot_id`),
  CONSTRAINT `FK_parking_lots_TO_lot_floor_data_1` FOREIGN KEY (`lot_id`) REFERENCES `parking_lots` (`lot_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lot_floor_data`
--

LOCK TABLES `lot_floor_data` WRITE;
/*!40000 ALTER TABLE `lot_floor_data` DISABLE KEYS */;
INSERT INTO `lot_floor_data` VALUES (1,1,-1,'section'),(2,1,-1,'section'),(3,1,-1,'section'),(4,1,-1,'section'),(5,1,-1,'section'),(6,1,-1,'section'),(7,1,-1,'section'),(8,1,-1,'section'),(9,1,-1,'section'),(10,1,-1,'section'),(11,1,-1,'section'),(12,1,-1,'section'),(13,1,-1,'section'),(14,1,-1,'section'),(15,1,-1,'section'),(16,1,-1,'section'),(17,1,-1,'section'),(18,1,-1,'section'),(19,1,-1,'section'),(20,1,-1,'section'),(21,1,-1,'section'),(22,1,-1,'section'),(23,1,-1,'section'),(24,1,-1,'section'),(25,1,-1,'section'),(26,1,-1,'section'),(27,1,-1,'section'),(28,1,-1,'section'),(29,1,-1,'section'),(30,1,-1,'section'),(31,1,-1,'section'),(32,1,-1,'section'),(33,1,-1,'section'),(34,1,-1,'section'),(35,1,-1,'section'),(36,1,-1,'section'),(37,1,-1,'section'),(38,1,-1,'section'),(39,1,-1,'section'),(40,1,-1,'section'),(41,1,-1,'section'),(42,1,-1,'section'),(43,1,-1,'section'),(44,1,-1,'section'),(45,1,-1,'section'),(46,1,-1,'section'),(47,1,-1,'section'),(48,1,-1,'section'),(49,1,-1,'section'),(50,1,-1,'section'),(51,1,-1,'section'),(52,1,-1,'section'),(53,1,-1,'section'),(54,1,-1,'section'),(55,1,-1,'section'),(56,1,-1,'section'),(57,1,-1,'section'),(58,1,-1,'section'),(59,1,-1,'section'),(60,1,-1,'section'),(61,1,-1,'section'),(62,1,-1,'section'),(63,1,-1,'section'),(64,1,-1,'section'),(65,1,-1,'section'),(66,1,-1,'section'),(67,1,-1,'section'),(68,1,-1,'section'),(69,1,-1,'section'),(70,1,-1,'section'),(71,1,-1,'section'),(72,1,-1,'section'),(73,1,-1,'section'),(74,1,-1,'section'),(75,1,-1,'section'),(76,1,-1,'section'),(77,1,-1,'section'),(78,1,-1,'section'),(79,1,-1,'section'),(80,1,-1,'section'),(81,1,-1,'section'),(82,1,-1,'section'),(83,1,-1,'section'),(84,1,-1,'road'),(85,1,-1,'road'),(86,1,-1,'road'),(87,1,-1,'road'),(88,1,-1,'road'),(89,1,-1,'road'),(90,1,-1,'road'),(91,1,-1,'road'),(92,1,-1,'road'),(93,1,-1,'road'),(94,1,-1,'road'),(95,1,-1,'road'),(96,1,-1,'road'),(97,1,-1,'road'),(98,1,-1,'road'),(99,1,-1,'road'),(100,1,-1,'road'),(101,1,-1,'road'),(102,1,-1,'road'),(103,1,-1,'road'),(104,1,-1,'road'),(105,1,-1,'road'),(106,1,-1,'road'),(107,1,-1,'road'),(108,1,-1,'road'),(109,1,-1,'road'),(110,1,-1,'road'),(111,1,-1,'road'),(112,1,-1,'road'),(113,1,-1,'road'),(114,1,-1,'road'),(115,1,-1,'road'),(116,1,-1,'road'),(117,1,-1,'road'),(118,1,-1,'road'),(119,1,-1,'road'),(120,1,-1,'road'),(121,1,-1,'road'),(122,1,-1,'road'),(123,1,-1,'road'),(124,1,-1,'road'),(125,1,-1,'road'),(126,1,-1,'road'),(127,1,-1,'road'),(128,1,-1,'road'),(129,1,-1,'road'),(130,1,-1,'road'),(131,1,-1,'road'),(132,1,-1,'road'),(133,1,-1,'road'),(134,1,-1,'road'),(135,1,-1,'road'),(136,1,-1,'road'),(137,1,-1,'road'),(138,1,-1,'road'),(139,1,-1,'road'),(140,1,-1,'road'),(141,1,-1,'road'),(142,1,-1,'road'),(143,1,-1,'road'),(144,1,-1,'road'),(145,1,-1,'road'),(146,1,-1,'road'),(147,1,-1,'road'),(148,1,-1,'road'),(149,1,-1,'road'),(150,1,-1,'road'),(151,1,-1,'road'),(152,1,-1,'road'),(153,1,-1,'road'),(154,1,-1,'road'),(155,1,-1,'road'),(156,1,-1,'road'),(157,1,-1,'road'),(158,1,-1,'road'),(159,1,-1,'road'),(160,1,-1,'road'),(161,1,-1,'road'),(162,1,-1,'road'),(163,1,-1,'road'),(164,1,-1,'road'),(165,1,-1,'road'),(166,1,-1,'road'),(167,1,-1,'road'),(168,1,-1,'road');
/*!40000 ALTER TABLE `lot_floor_data` ENABLE KEYS */;
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
