const db = require("../database/database");

const getAllManagers = async () => {
  try {
    const connect = await db.connect();
    const sql = "SELECT * FROM customer;";
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get managers:${err.message}`);
  }
};
const getAllMechanics = async () => {
  try {
    const connect = await db.connect();
    const sql = "SELECT * FROM MECHANIC;";
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get mechanics:${err.message}`);
  }
};
const getMechanicById = async (service_center_id) => {
  try {
    const connect = await db.connect();
    const sql = `SELECT * FROM MECHANIC WHERE SERVICE_CENTER_ID = ${service_center_id};`;
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get mechanics:${err.message}`);
  }
};
const addMechanic = async (mechanic) => {
  console.log(mechanic);
  try {
    const connect = await db.connect();
    const sql =
      "INSERT INTO MECHANIC(ssn,phone,birthdate,fname,mname,lname,sex,service_center_id)" +
      "VALUES($1,$2,$3,$4,$5,$6,$7,$8);";
    const result = await connect.query(sql, [
      mechanic.ssn,
      mechanic.phone,
      mechanic.birthdate,
      mechanic.fname,
      mechanic.mname,
      mechanic.lname,
      mechanic.sex,
      mechanic.service_center_id,
    ]);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to insert mechanic:${err.message}`);
  }
};
const updateMechanic = async (mechanic) => {
  try {
    const connect = await db.connect();
    const sql =
      "UPDATE MECHANIC SET phone=$1 ,birthdate=$2 ,fname=$3 ,mname=$4 ,lname=$5,sex=$6,service_center_id=$7 " +
      "WHERE ssn = $8 Returning ssn";
    const result = await connect.query(sql, [
      mechanic.phone,
      mechanic.birthdate,
      mechanic.fname,
      mechanic.mname,
      mechanic.lname,
      mechanic.sex,
      mechanic.service_center_id,
      mechanic.ssn,
    ]);
    connect.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`Unable to update mechanic:${err.message}`);
  }
};
const deleteMechanic = async (mechanic_ssn) => {
  try {
    const connect = await db.connect();
    const sql = `DELETE FROM MECHANIC WHERE SSN=${mechanic_ssn};`;
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to delete mechanic:${err.message}`);
  }
};
const getMechanicsInServiceCenterCount = async (service_center_id) => {
  try {
    const connect = await db.connect();
    const sql = `SELECT COUNT(*) FROM MECHANIC WHERE SERVICE_CENTER_ID=${service_center_id};`;
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get mechanics count :${err.message}`);
  }
};
const getAllManufacturers = async () => {
  try {
    const connect = await db.connect();
    const sql = "SELECT * FROM MANUFACTURER;";
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get manufacturers:${err.message}`);
  }
};
const addManufacturer = async (manufacturer) => {
  try {
    const connect = await db.connect();
    const sql =
      "INSERT INTO MANUFACTURER(email, name, location) VALUES($1,$2,$3);";
    const result = await connect.query(sql, [
      manufacturer.email,
      manufacturer.name,
      manufacturer.location,
    ]);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to add new manufacturer:${err.message}`);
  }
};
const updateManufacturer = async (manufacturer) => {
  try {
    const connect = await db.connect();
    const sql =
      "UPDATE MANUFACTURER SET name= $1, location= $2 WHERE email=$3 RETURNING email;";
    const result = await connect.query(sql, [
      manufacturer.name,
      manufacturer.location,
      manufacturer.email,
    ]);
    connect.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`Unable to update manufacturer:${err.message}`);
  }
};
const deleteManufacturer = async (manufacturerEmail) => {
  try {
    const connect = await db.connect();
    const sql = `DELETE FROM MANUFACTURER WHERE email= '${manufacturerEmail}';`;
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to delete manufacturer:${err.message}`);
  }
};

//parts
const getAllParts = async () => {
  try {
    const connect = await db.connect();
    const sql = `SELECT * FROM PARTS; `;
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get PARTS:${err.message}`);
  }
};
const getAllPartsInServiceCenter = async (serviceCenterId) => {
  try {
    const connect = await db.connect();
    const sql =
      `SELECT Name,ID,Quantity,Selling_Price FROM STOCK,PARTS WHERE STOCK.PARTS_ID=PARTS.ID ` +
      ` AND Service_Center_ID = ${serviceCenterId}`;
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get PARTS:${err.message}`);
  }
};
const addPart = async (part) => {
  try {
    const connect = await db.connect();
    const sql = "INSERT INTO PARTS(name, id) VALUES($1,$2);";
    const result = await connect.query(sql, [part.name, part.id]);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to add new part:${err.message}`);
  }
};
const updateParts = async (part, serviceCenterId) => {
  try {
    const connect = await db.connect();
    const sql =
      "UPDATE stock SET selling_price=$1 WHERE parts_id=$2 AND service_center_id = $3 Returning parts_id;";
    const result = await connect.query(sql, [
      part.selling_price,
      part.id,
      serviceCenterId,
    ]);
    connect.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`Unable to update part:${err.message}`);
  }
};
//auth
const authenticate = async (user) => {
  try {
    const connect = await db.connect();
    const sql = "SELECT passwd FROM manager WHERE ssn =($1);";
    const result = await connect.query(sql, [user.ssn]);
    if (result.rows.length) {
      const password = result.rows[0].passwd;
      if (password == user.passwd && password) {
        const userQuery = "SELECT * FROM manager WHERE ssn =($1)";
        const userDetails = await connect.query(userQuery, [user.ssn]);
        return userDetails.rows[0];
      } else {
        throw new Error(`password incorrect `);
      }
    } else {
      throw new Error(`SSN doesnt exist `);
    }
    connect.release();
    return null;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const getServiceCenterById = async (service_center_id) => {
  try {
    const connect = await db.connect();
    const sql = `SELECT name FROM service_center WHERE id = ${service_center_id};`;
    const result = await connect.query(sql);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get service center:${err.message}`);
  }
};

const addPurchaseReceipt = async (data) => {
  const connect = await db.connect();
  try {
    console.log(data.serviceCenterId);
    console.log(data.selectedParts[0].id);
    console.log(data.selectedParts.length);
    await connect.query("BEGIN");
    const date = await connect.query("SELECT NOW()");
    let cDate = date.rows[0].now;
    console.log(cDate);
    const insertPurchaseReceiptQuery =
      "INSERT INTO purchase_receipt (manufacturer_email, cost,date,service_center_id)" +
      "VALUES ($1,$2, $3,$4);";
    await connect.query(insertPurchaseReceiptQuery, [
      data.email,
      data.totalPrice,
      cDate,
      data.serviceCenterId,
    ]);
    for (let i = 0; i < data.selectedParts.length; i++) {
      let insertintoPartsBoughtQuery =
        "INSERT INTO parts_bought (count,cost,receipt_manufacturer_email,receipt_date,parts_id)" +
        "VALUES ($1,$2, $3,$4,$5);";
      await connect.query(insertintoPartsBoughtQuery, [
        data.selectedParts[i].quantity,
        data.selectedParts[i].buying_price,
        data.email,
        cDate,
        data.selectedParts[i].id,
      ]);

      let searchInStock =
        "SELECT * FROM STOCK WHERE PARTS_ID=$1 AND SERVICE_CENTER_ID=$2";
      let isAvailableInStock = await connect.query(searchInStock, [
        data.selectedParts[i].id,
        data.serviceCenterId,
      ]);
      if (isAvailableInStock.rows[0].length === 0) {
        let insertNewRowInStockQuery =
          "INSERT INTO STOCK(PARTS_ID,SERVICE_CENTER_ID,QUANTITY,SELLING_PRICE)" +
          "VALUES($1, $2, $3,$4);";
        await connect.query(insertNewRowInStockQuery, [
          data.selectedParts[i].id,
          data.serviceCenterId,
          data.selectedParts[i].quantity,
          data.selectedParts[i].buying_price * 1.1,
        ]);
      } else {
        let updateRowInStockQuery =
          "UPDATE STOCK SET QUANTITY=QUANTITY+$1 WHERE PARTS_ID=$2 AND SERVICE_CENTER_ID=$3";
        await connect.query(updateRowInStockQuery, [
          data.selectedParts[i].quantity,
          data.selectedParts[i].id,
          data.serviceCenterId,
        ]);
      }
    }
    await connect.query("COMMIT");
  } catch (e) {
    console.log("rollingBack");
    await connect.query("ROLLBACK");
    throw e;
  } finally {
    console.log("releasing");
    connect.release();
  }
};

const getAllPurchaseReceipt = async (service_center_id) => {
  try {
    const connect = await db.connect();
    const sql = `SELECT manufacturer_email,date,cost,name from purchase_receipt,manufacturer WHERE service_center_id = ${service_center_id} and manufacturer_email =email;`;
    const result = await connect.query(sql);
    connect.release();

    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get service center:${err.message}`);
  }
};
const getAllPurchaseDetails = async (service_center_id, data) => {
  try {
    console.log(data.date);
    data.date = new Date(data.date);
    console.log(data.date);
    const connect = await db.connect();
    const sql =
      "select parts_id,name,count,parts_bought.cost,date,receipt_date,receipt_manufacturer_email " +
      "from parts_bought,purchase_receipt,parts " +
      "where service_center_id=$1 and parts_bought.receipt_manufacturer_email=$2 " +
      "and parts_bought.receipt_date=$3 " +
      "and parts.id=parts_id;";
    const result = await connect.query(sql, [
      service_center_id,
      data.manufacturer_email,
      data.date,
    ]);
    console.log(result.rows);
    connect.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Unable to get service center:${err.message}`);
  }
};
module.exports = {
  getAllManagers,
  getAllMechanics,
  addMechanic,
  getMechanicById,
  updateMechanic,
  deleteMechanic,
  getMechanicsInServiceCenterCount,
  getAllManufacturers,
  addManufacturer,
  updateManufacturer,
  deleteManufacturer,
  getAllPartsInServiceCenter,
  addPart,
  updateParts,
  authenticate,
  getServiceCenterById,
  getAllParts,
  addPurchaseReceipt,
  getAllPurchaseReceipt,
  getAllPurchaseDetails,
};
