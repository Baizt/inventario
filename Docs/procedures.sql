USE `stock`;
DROP procedure IF EXISTS `getAllBranches`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `getAllBranches`()
BEGIN
	SELECT * FROM branch;
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `getAllItems`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `getAllItems` ()
BEGIN
	SELECT * FROM item;
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `getItem`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `getItem` (IN id_item INT)
BEGIN
	SELECT * FROM item WHERE id = id_item;
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `getBranch`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `getBranch` (IN id_branch INT)
BEGIN
	SELECT * FROM branch WHERE id = id_branch;
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `getBranchItems`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `getBranchItems` (IN branch_id INT)
BEGIN
	SELECT item_branch.id_item, item.name AS item, item.barcode, item_branch.lot, item.price
	FROM item
		INNER JOIN item_branch ON item.id = item_branch.id_item
		INNER JOIN branch ON branch.id = item_branch.id_branch
	WHERE branch.id = branch_id;
END$$
DELIMITER ;

USE `stock`;
DROP procedure IF EXISTS `setItem`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `setItem`(IN name_i TEXT, IN barcode_i INT, IN price_i DECIMAL(15, 2))
BEGIN
	INSERT INTO item (name, barcode, price) VALUES(name_i, barcode_i, price_i);
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `setBranchItem`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `setBranchItem` (IN item_id INT, IN branch_id INT, IN num INT)
BEGIN
	DECLARE num_items INT DEFAULT 0;
	
    SELECT count(*)
    INTO num_items
	FROM item_branch
	WHERE id_item = 1 AND id_branch = 1;
    
    IF num_items = 0 THEN
		INSERT INTO item_branch (id_item, id_branch, lot) VALUES(item_id, branch_id, num);
    ELSE
		UPDATE item_branch SET lot = num WHERE id_item = item_id AND id_branch = branch_id;
    END IF;
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `dropBranch`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `dropBranch`(IN branch_id INT)
BEGIN
	DELETE FROM item_branch WHERE id_branch = branch_id;
	DELETE FROM branch WHERE id = branch_id;
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `updateBranch`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `updateBranch` (IN branch_id INT, IN name_b TEXT, IN add_b TEXT)
BEGIN
	UPDATE branch SET name = name_b, address = add_b WHERE id = branch_id;
END$$
DELIMITER ;


USE `stock`;
DROP procedure IF EXISTS `updateItem`;
DELIMITER $$
USE `stock`$$
CREATE PROCEDURE `updateItem` (IN item_id INT, IN name_i TEXT, IN barcode_i INT, IN price_i DECIMAL(15, 2))
BEGIN
	UPDATE item SET name = name_i, barcode = barcode_i, price = price_i WHERE id = item_id;
END$$
DELIMITER ;