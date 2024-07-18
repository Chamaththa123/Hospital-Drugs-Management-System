const db = require("../db/db");

const insertProduct = (
    Item_Category_idItem_Category,
    Item_Code,
    Item_Name,
    Description,
    Cost,
    Rate,
    Qty_Type,
    Qty,
    Expired_Date,
    Status
  ) => {
    const query = `INSERT INTO product
      (Item_Category_idItem_Category,Item_Code, Item_Name,Description, Cost, Rate, Qty_Type, Qty,Expired_Date,Status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [
          Item_Category_idItem_Category,
          Item_Code,
          Item_Name,
          Description,
          Cost,
          Rate,
          Qty_Type,
          Qty,
          Expired_Date,
          Status
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  };

  const fetchItems = () => {
    const query =
      "SELECT i.*, ic.Description AS Item_Category FROM item i INNER JOIN product_category ic ON ic.idItem_Category = i.Item_Category_idItem_Category ORDER BY i.idItem DESC";
    return new Promise((resolve, reject) => {
      db.query(query, [], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(JSON.stringify(results)));
        }
      });
    });
  };

  const updateProduct = (
    Item_Category_idItem_Category,
    Item_Code,
    Item_Name,
    Description,
    Cost,
    Rate,
    Qty_Type,
    Qty,
    Expired_Date,
    idItem
  ) => {
    const query = `UPDATE product 
      SET 
      Item_Category_idItem_Category=?, 
      Item_Code =?,
    Item_Name =?,
        Description =?,
      Cost=?,
      Rate=?,
      Qty_Type=?, 
      Qty=?, 
      Expired_Date=?
      WHERE idItem=?`;
  
    return new Promise((resolve, reject) => {
      return db.query(
        query,
        [
          Item_Category_idItem_Category,
          Item_Code,
          Item_Name,
          Description,
          Cost,
          Rate,
          Qty_Type,
          Qty,
          Expired_Date,
          idItem,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  };

  const updateProductQty = (Qty, idItem) => {
    const query = `UPDATE product 
      SET 
      Qty=? 
      WHERE idItem=?`;
  
    return new Promise((resolve, reject) => {
      return db.query(query, [Qty, idItem], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  module.exports = {
    insertProduct,
    fetchItems,
    updateProduct,
    updateProductQty
  };