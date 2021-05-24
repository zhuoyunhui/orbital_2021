CREATE SCHEMA `PYPR`;
USE `PYPR`;

SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE TABLE `User` (
		`userID` VARCHAR(45) UNIQUE NOT NULL,
	`password` VARCHAR(15) NOT NULL
			CHECK (LENGTH(`passWord`) >= 6 AND LENGTH(`passWord`) <= 15),
	`unrealisedBalance` FLOAT NOT NULL 
			CHECK (`unrealisedBalance` > 0),
    `availBalance` FLOAT NOT NULL 
			CHECK (`availBalance` > 0),        
	PRIMARY KEY(`userID`) 
);
    
CREATE TABLE `Trades` (
		`tradeID` CHAR(10) UNIQUE NOT NULL,
	`userID` VARCHAR(45) UNIQUE NOT NULL,
	`transactionTime` DATETIME NOT NULL,
    `ticker` VARCHAR(45) NOT NULL,
    `quantity` INT NOT NULL
			CHECK(`quantity` > 0),
	`currPrice` FLOAT NOT NULL,
    `entPrice` FLOAT NOT NULL,
	PRIMARY KEY (`tradeID`)
);

ALTER TABLE `Trades`
ADD CONSTRAINT t FOREIGN KEY (`userID`) REFERENCES `User` (`userID`);




    
