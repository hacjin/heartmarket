## DB 

### **user(유저)**

- 유저번호(PK) : user_no
- 프로필 이미지 : profile_img
- 닉네임 : nickname
- 전화번호 : phone
- 권한(직책) : user_permission

### **trade(거래)**

- 거래번호(PK) : trade_no
- 카테고리 : trade_category
- 거래글제목 : trade_title
- 유저번호(FK) : user_no
- 카트번호(FK): cart_no          // 필요없음
- 상품명 : product_name
- 상품설명 : product_info
- 상품 가격 : product_price
- 거래시간 : trade_date

### 구매자

- 구매번호(PK) : buyer_no
- 유저번호(FK) : user_no
- 거래번호(FK) : trade_no

#### trade_img(거래이미지)

- 이미지번호(PK) : img_no
- 거래번호(FK) : trdae_no
- 거래상품이미지: product_img

### **manner (매너)**

- 매너번호(PK) : manner_no
- 유저번호(FK) : user_no
- 거래번호 (FK) : trade_no
- 심쿵지수 (점수) : manner_point
- 유저분류 ( 1: 판매자 / 2: 구매자 ) : user_type
- 매너분류 ( ENUM : 1-시간약속 / 2-친절.예의 / 3-가격이 착해요 / 4-품질 ) : manner_type

### **area (동네)**

사용자별 주소 정보를 담는 테이블

사용자별 주소를 받아 count가 2개일 경우 동네 추가 버튼 비활성화

- 동네 번호(PK) : area_no
- 유저번호 ( FK ) : user_no
- 주소정보 : address

### **cart (찜)**

- 찜번호 (PK) : cart_no
- 유저번호(FK) : user_no 
- 거래번호 (FK) : trade_no

### **Chatt (채팅)**

- 진행 사항으로 인한 보류



## EERD 캡처 이미지

![](document_img/EERD.PNG)

## EERD to Query 문 

```
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema heartmarket
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema heartmarket
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heartmarket` DEFAULT CHARACTER SET utf8 ;
USE `heartmarket` ;

-- -----------------------------------------------------
-- Table `heartmarket`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heartmarket`.`user` (
  `user_no` INT not null auto_increment,
 `profile_img` varchar(255),
 `nickname` varchar(50),
 `phone` varchar(13),
 `user_permission` varchar(15),
  PRIMARY KEY (`user_no`))
engine = InnoDB default character set = utf8;


-- -----------------------------------------------------
-- Table `heartmarket`.`trade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heartmarket`.`trade` (
   `trade_no` INT NOT NULL AUTO_INCREMENT,
  `trade_category` VARCHAR(45) NULL,
  `trade_title` VARCHAR(255) NULL,
  `user_no` INT not NULL,
  `user_type` VARCHAR(45) NULL,
  `product_name` VARCHAR(255) NULL,
  `product_info` VARCHAR(255) NULL,
  `product_price` VARCHAR(255) NULL,
  `trade_date` datetime NULL,
  PRIMARY KEY (`trade_no`),
  INDEX `user_no_idx` (`user_no` ASC),
  CONSTRAINT `trade.user_no_FK`
    FOREIGN KEY (`user_no`)
    REFERENCES `user`(`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB default character set = utf8;


-- -----------------------------------------------------
-- Table `heartmarket`.`manner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heartmarket`.`manner` (
  `manner_no` INT NOT NULL AUTO_INCREMENT,
  `user_no` INT NULL,
  `trade_no` INT NULL,
  `manner_point` INT NULL,
  `user_type` VARCHAR(45) NULL,
  `manner_type` VARCHAR(45) NULL,
  PRIMARY KEY (`manner_no`),
  INDEX `Manner.user_no_FK_idx` (`user_no` ASC) ,
  INDEX `Manner.trade_no_FK_idx` (`trade_no` ASC) ,
  CONSTRAINT `manner.user_no_FK`
    FOREIGN KEY (`user_no`)
    REFERENCES `heartmarket`.`user` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Manner.trade_no_FK`
    FOREIGN KEY (`trade_no`)
    REFERENCES `heartmarket`.`trade` (`trade_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB default character set = utf8;


-- -----------------------------------------------------
-- Table `heartmarket`.`area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heartmarket`.`area` (
  `area_no` INT NOT NULL AUTO_INCREMENT,
  `user_no` INT NULL,
  `address` VARCHAR(255) NULL,
  PRIMARY KEY (`area_no`),
  INDEX `Area.user_no_idx` (`user_no` ASC) ,
  CONSTRAINT `Area.user_no_FK`
    FOREIGN KEY (`user_no`)
    REFERENCES `heartmarket`.`user` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB default character set = utf8;


-- -----------------------------------------------------
-- Table `heartmarket`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heartmarket`.`cart` (
  `cart_no` INT NOT NULL AUTO_INCREMENT,
  `user_no` INT NULL,
  `trade_no` INT NULL,
  PRIMARY KEY (`cart_no`),
  INDEX `cart.user_no_FK_idx` (`user_no` ASC) ,
  INDEX `cart.trade_no_idx` (`trade_no` ASC) ,
  CONSTRAINT `cart.user_no_FK`
    FOREIGN KEY (`user_no`)
    REFERENCES `heartmarket`.`user` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cart.trade_no_FK`
    FOREIGN KEY (`trade_no`)
    REFERENCES `heartmarket`.`trade` (`trade_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
default character set = utf8;


-- -----------------------------------------------------
-- Table `heartmarket`.`trade_img`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heartmarket`.`trade_img` (
  `img_no` INT NOT NULL AUTO_INCREMENT,
  `trade_no` INT NULL,
  `product_img` VARCHAR(255) NULL,
  PRIMARY KEY (`img_no`),
  INDEX `Trade_img.trade_no_FK_idx` (`trade_no` ASC) ,
  CONSTRAINT `Trade_img.trade_no_FK`
    FOREIGN KEY (`trade_no`)
    REFERENCES `heartmarket`.`trade` (`trade_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB default character set = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```



