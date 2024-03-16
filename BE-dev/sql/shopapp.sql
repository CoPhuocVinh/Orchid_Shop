-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_orchid
-- ------------------------------------------------------
-- Server version	8.0.34
use db_orchid;
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
-- Dumping data for table `tbl_auctions`
--

LOCK TABLES tbl_auctions WRITE;
/*!40000 ALTER TABLE tbl_auctions DISABLE KEYS */;
/*!40000 ALTER TABLE tbl_auctions ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_bidding`
--

LOCK TABLES tbl_bidding WRITE;
/*!40000 ALTER TABLE tbl_bidding DISABLE KEYS */;
/*!40000 ALTER TABLE tbl_bidding ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_categories`
--

LOCK TABLES tbl_categories WRITE;
/*!40000 ALTER TABLE tbl_categories DISABLE KEYS */;
INSERT INTO tbl_categories VALUES (1,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','phong_lan_1','#FFFFFF','hoa phong lan'),(2,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','phong_lan_2','#CCCCCC','hoa phong lan'),(3,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','phong_lan_3','#AAAAAA','hoa phong lan'),(4,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','phong_lan_4','#888888','hoa phong lan'),(5,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','phong_lan_5','#666666','hoa phong lan');
/*!40000 ALTER TABLE tbl_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_feedback`
--

LOCK TABLES tbl_feedback WRITE;
/*!40000 ALTER TABLE tbl_feedback DISABLE KEYS */;
INSERT INTO tbl_feedback VALUES (1,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','Good product, but could be better with faster delivery.','OPEN',1,1),(2,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','I found a defect in the product. It needs to be fixed urgently.','OPEN',2,2),(3,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','This product exceeded my expectations. Highly recommended!','OPEN',3,3),(4,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','I have some suggestions for improving the product features.','OPEN',4,4),(5,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','The product is good, but the packaging was damaged during shipping.','OPEN',5,5),(6,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','The customer service was excellent in handling my product-related queries.','OPEN',6,6),(7,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','The product is not as described. I want to return it for a refund.','OPEN',7,7),(8,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','I am satisfied with the product quality and performance.','OPEN',8,8),(9,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','The product is of great quality. Highly satisfied!','OPEN',1,1),(10,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','I received the wrong item. Please rectify this issue.','OPEN',2,2),(11,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','The product arrived late. Disappointed with the delivery service.','OPEN',3,3),(12,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','Excellent customer service. Quick response and resolution.','OPEN',4,4),(13,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','The product is not as described. I want to return it.','OPEN',5,5);
/*!40000 ALTER TABLE tbl_feedback ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_notifications`
--

LOCK TABLES tbl_notifications WRITE;
/*!40000 ALTER TABLE tbl_notifications DISABLE KEYS */;
/*!40000 ALTER TABLE tbl_notifications ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_orders`
--

LOCK TABLES tbl_orders WRITE;
/*!40000 ALTER TABLE tbl_orders DISABLE KEYS */;
/*!40000 ALTER TABLE tbl_orders ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_product_img`
--

LOCK TABLES tbl_product_img WRITE;
/*!40000 ALTER TABLE tbl_product_img DISABLE KEYS */;
/*!40000 ALTER TABLE tbl_product_img ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_products`
--

LOCK TABLES tbl_products WRITE;
/*!40000 ALTER TABLE tbl_products DISABLE KEYS */;
INSERT INTO tbl_products VALUES (1,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 1',NULL,'PROD001','Product 1',100,1,1),(2,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 2',NULL,'PROD002','Product 2',150,1,1),(3,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 3',NULL,'PROD003','Product 3',120,1,2),(4,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 4',NULL,'PROD004','Product 4',80,1,2),(5,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 5',NULL,'PROD005','Product 5',200,1,3),(6,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 6',NULL,'PROD006','Product 6',90,1,3),(7,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 7',NULL,'PROD007','Product 7',180,1,4),(8,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 8',NULL,'PROD008','Product 8',230,1,4),(9,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 9',NULL,'PROD009','Product 9',110,1,5),(10,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '','Admin','Description of Product 10',NULL,'PROD010','Product 10',170,1,5);
/*!40000 ALTER TABLE tbl_products ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_replys`
--

LOCK TABLES tbl_replys WRITE;
/*!40000 ALTER TABLE tbl_replys DISABLE KEYS */;
INSERT INTO tbl_replys VALUES (1,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','Thank you for your feedback. We are working on improving our delivery speed.',5,'OPEN',1,1),(2,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','We apologize for the inconvenience. Please provide more details about the defect so we can address it promptly.',3,'OPEN',2,2),(3,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','We are glad to hear that you are satisfied with our product. Thank you for recommending us!',5,'OPEN',3,3),(4,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','Thank you for your suggestions. We will consider them for future product updates.',4,'OPEN',4,4),(5,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','We apologize for the inconvenience caused. Please contact our support team for assistance with the damaged packaging.',2,'OPEN',5,5),(6,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','We are delighted to hear that you had a positive experience with our customer service.',5,'OPEN',6,6),(7,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','We apologize for the discrepancy. Please initiate a return request for further assistance.',2,'OPEN',7,7),(8,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','Thank you for your feedback. We are pleased to know that you are satisfied with our product.',5,'OPEN',8,8);
/*!40000 ALTER TABLE tbl_replys ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_transaction`
--

LOCK TABLES tbl_transaction WRITE;
/*!40000 ALTER TABLE tbl_transaction DISABLE KEYS */;
/*!40000 ALTER TABLE tbl_transaction ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_user_info`
--

LOCK TABLES tbl_user_info WRITE;
/*!40000 ALTER TABLE tbl_user_info DISABLE KEYS */;
INSERT INTO tbl_user_info VALUES (1,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','123 Admin Street',_binary '\0','123456789',1),(2,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','456 Staff Street',_binary '\0','987654321',2),(3,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','789 Staff Street',_binary '\0','654987321',3),(4,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','012 Staff Street',_binary '\0','321654987',4),(5,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','345 Staff Street',_binary '\0','789321654',5),(6,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','678 Staff Street',_binary '\0','456123789',6),(7,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','123 Customer Street',_binary '\0','123456789',7),(8,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','456 Customer Street',_binary '\0','987654321',8),(9,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','789 Customer Street',_binary '\0','654987321',9),(10,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','012 Customer Street',_binary '\0','321654987',10),(11,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000','345 Customer Street',_binary '\0','789321654',11);
/*!40000 ALTER TABLE tbl_user_info ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES tbl_users WRITE;
/*!40000 ALTER TABLE tbl_users DISABLE KEYS */;
INSERT INTO tbl_users VALUES (1,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Admin1','1990-01-01 00:00:00.000000','admin1@example.com',NULL,'MALE',NULL,NULL,'Admin User','admin_password','ADMIN',1),(2,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Staff1','1990-01-01 00:00:00.000000','staff1@example.com',NULL,'MALE',NULL,NULL,'Staff User 1','staff_password','STAFF',1),(3,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Staff2','1990-01-01 00:00:00.000000','staff2@example.com',NULL,'FEMALE',NULL,NULL,'Staff User 2','staff_password','STAFF',1),(4,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Staff3','1990-01-01 00:00:00.000000','staff3@example.com',NULL,'OTHER',NULL,NULL,'Staff User 3','staff_password','STAFF',1),(5,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Staff4','1990-01-01 00:00:00.000000','staff4@example.com',NULL,'MALE',NULL,NULL,'Staff User 4','staff_password','STAFF',1),(6,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Staff5','1990-01-01 00:00:00.000000','staff5@example.com',NULL,'FEMALE',NULL,NULL,'Staff User 5','staff_password','STAFF',1),(7,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Customer1','1990-01-01 00:00:00.000000','customer1@example.com',NULL,'MALE',NULL,NULL,'Customer User 1','customer_password','CUSTOMER',1),(8,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Customer2','1990-01-01 00:00:00.000000','customer2@example.com',NULL,'FEMALE',NULL,NULL,'Customer User 2','customer_password','CUSTOMER',1),(9,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Customer3','1990-01-01 00:00:00.000000','customer3@example.com',NULL,'OTHER',NULL,NULL,'Customer User 3','customer_password','CUSTOMER',1),(10,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Customer4','1990-01-01 00:00:00.000000','customer4@example.com',NULL,'MALE',NULL,NULL,'Customer User 4','customer_password','CUSTOMER',1),(11,'2024-03-02 16:53:27.000000',_binary '\0','2024-03-02 16:53:27.000000',_binary '\0','Customer5','1990-01-01 00:00:00.000000','customer5@example.com',NULL,'FEMALE',NULL,NULL,'Customer User 5','customer_password','CUSTOMER',1);
/*!40000 ALTER TABLE tbl_users ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_wallets`
--

LOCK TABLES tbl_wallets WRITE;
/*!40000 ALTER TABLE tbl_wallets DISABLE KEYS */;
/*!40000 ALTER TABLE tbl_wallets ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tokens`
--

LOCK TABLES tokens WRITE;
/*!40000 ALTER TABLE tokens DISABLE KEYS */;
/*!40000 ALTER TABLE tokens ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02 16:56:38
