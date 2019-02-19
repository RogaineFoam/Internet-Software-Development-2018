-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: cs3320
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientinformation`
--

DROP TABLE IF EXISTS `clientinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clientinformation` (
  `clientId` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zipCode` varchar(10) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientinformation`
--

LOCK TABLES `clientinformation` WRITE;
/*!40000 ALTER TABLE `clientinformation` DISABLE KEYS */;
INSERT INTO `clientinformation` VALUES (1,'Alex Fallin','123 Main Street','Austin','TX','78759','5128675309','waf13@txstate.edu'),(2,'Sam Pugh','234 Side Street','Buda','TX','78610','4443332222','sap163@txstate.edu');
/*!40000 ALTER TABLE `clientinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fuelquote`
--

DROP TABLE IF EXISTS `fuelquote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fuelquote` (
  `quoteId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `gallonsRequested` double DEFAULT NULL,
  `requestDate` datetime DEFAULT NULL,
  `deliveryDate` datetime DEFAULT NULL,
  `deliveryAddress` varchar(255) NOT NULL,
  `deliveryCity` varchar(100) NOT NULL,
  `deliveryState` varchar(2) NOT NULL,
  `deliveryZipCode` varchar(10) NOT NULL,
  `deliveryContactName` varchar(255) NOT NULL,
  `deliveryContactPhone` varchar(10) NOT NULL,
  `deliveryContactEmail` varchar(255) NOT NULL,
  `suggestedPrice` double DEFAULT NULL,
  `totalAmountDue` double DEFAULT NULL,
  PRIMARY KEY (`quoteId`),
  KEY `FK_clientId` (`clientId`),
  CONSTRAINT `FK_clientId` FOREIGN KEY (`clientId`) REFERENCES `clientinformation` (`clientid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fuelquote`
--

LOCK TABLES `fuelquote` WRITE;
/*!40000 ALTER TABLE `fuelquote` DISABLE KEYS */;
INSERT INTO `fuelquote` VALUES (1,1,1000,'2018-10-20 00:00:00','2018-11-15 00:00:00','69 South Congress','Austin','TX','78745','Alex Fallin','5128675309','waf13@txstate.edu',2.59,2590),(2,1,2000,'2018-11-20 00:00:00','2018-12-05 00:00:00','420 Burnett','Austin','TX','78745','Mike Litoris','2101234567','badname@mailserver.com',2.69,5380),(3,2,3000,'2018-12-20 00:00:00','2018-10-25 00:00:00','85 I-35 Svc Rd','Buda','TX','78666','Sam Pugh','4443332222','sap163@txstate.edu',2.79,8370),(4,2,4000,'2018-12-21 00:00:00','2018-11-30 00:00:00','8000 Kyle Pkwy','Kyle','TX','78701','Samuel Poo','1235558899','exmachina@rocketmail.net',2.89,11560),(5,1,42,'2018-11-04 00:00:00','1996-08-04 00:00:00','San Marcos, TX','City','TX','78666','Alex','5555555555','waf13@txstate.edu',34.52,696.42);
/*!40000 ALTER TABLE `fuelquote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cs3320'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-04 23:44:07
