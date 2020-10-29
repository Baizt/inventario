DELIMITER ;;
CREATE PROCEDURE `dropBranch`(IN branch_id INT)
BEGIN
	DELETE FROM item_branch WHERE id_branch = branch_id;
	DELETE FROM branch WHERE id = branch_id;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `dropBranchItem`(IN item_id INT, IN branch_id INT)
BEGIN
	DELETE FROM item_branch WHERE id_item = item_id AND id_branch = branch_id;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `dropItem`(IN item_id INT)
BEGIN
	DELETE FROM item_branch WHERE id_branch = item_id;
	DELETE FROM item WHERE id = item_id;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `getAllBranches`()
BEGIN
	SELECT * FROM branch;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `getAllItems`()
BEGIN
	SELECT * FROM item;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `getBranch`(IN id_branch INT)
BEGIN
	SELECT * FROM branch WHERE id = id_branch;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `getBranchItems`(IN branch_id INT)
BEGIN
	SELECT item_branch.id_item, item.name AS item, item.barcode, item_branch.lot, item.price
	FROM item
		INNER JOIN item_branch ON item.id = item_branch.id_item
		INNER JOIN branch ON branch.id = item_branch.id_branch
	WHERE branch.id = branch_id;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `getItem`(IN id_item INT)
BEGIN
	SELECT * FROM item WHERE id = id_item;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `setBranch`(IN name_b TEXT, IN add_b TEXT)
BEGIN
	INSERT INTO branch (name, address) VALUES(name_b, add_b);
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `setBranchItem`(IN item_id INT, IN branch_id INT, IN num INT)
BEGIN
	DECLARE num_items INT DEFAULT 0;
	
    SELECT count(*)
    INTO num_items
	FROM item_branch
	WHERE id_item = item_id AND id_branch = branch_id;
    
    IF num_items = 0 THEN
		INSERT INTO item_branch (id_item, id_branch, lot) VALUES(item_id, branch_id, num);
    ELSE
		UPDATE item_branch SET lot = num WHERE id_item = item_id AND id_branch = branch_id;
    END IF;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `setItem`(IN name_i TEXT, IN barcode_i INT, IN price_i DECIMAL(15, 2))
BEGIN
	INSERT INTO item (name, barcode, price) VALUES(name_i, barcode_i, price_i);
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `updateBranch`(IN branch_id INT, IN name_b TEXT, IN add_b TEXT)
BEGIN
	UPDATE branch SET name = name_b, address = add_b WHERE id = branch_id;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `updateItem`(IN item_id INT, IN name_i TEXT, IN barcode_i INT, IN price_i DECIMAL(15, 2))
BEGIN
	UPDATE item SET name = name_i, barcode = barcode_i, price = price_i WHERE id = item_id;
END ;;
DELIMITER ;