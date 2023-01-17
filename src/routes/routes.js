const Router = require("express").Router();
const Service = require("../services/services");

Router.get("/managers", async (req, res, next) => {
  try {
    const managers = await Service.getAllManagers();
    res.json(managers);
  } catch (error) {
    next(error);
  }
});
Router.get("/mechanics", async (req, res, next) => {
  try {
    const managers = await Service.getAllMechanics();
    res.json(managers);
  } catch (error) {
    next(error);
  }
});
Router.get("/mechanics/:service_center_id", async (req, res, next) => {
  try {
    const managers = await Service.getMechanicById(
      req.params.service_center_id
    );
    res.json(managers);
  } catch (error) {
    next(error);
  }
});
Router.get("/mechanics/count/:service_center_id", async (req, res, next) => {
  try {
    const count = await Service.getMechanicsInServiceCenterCount(
      req.params.service_center_id
    );
    res.json(count);
  } catch (error) {
    next(error);
  }
});
Router.post("/mechanics/add", async (req, res, next) => {
  try {
    const mechanic = await Service.addMechanic(req.body);
    res.json({
      status: "success",
      message: "mechanic created succesfully",
    });
  } catch (err) {
    next(err);
  }
});
Router.patch("/mechanics/update", async (req, res, next) => {
  try {
    const mechanic = await Service.updateMechanic(req.body);

    if (!mechanic.ssn) {
      throw new Error("no ssn");
    }
    res.json({
      status: "success",
      message: "mechanic updated succesfully",
    });
  } catch (err) {
    next(err);
  }
});
Router.delete("/mechanics/remove/:mechanic_id", async (req, res, next) => {
  try {
    const mechanic = await Service.deleteMechanic(req.params.mechanic_id);
    res.json({
      status: "success",
      message: "mechanic deleted succesfully",
    });
  } catch (err) {
    next(err);
  }
});

//manufacturers

Router.get("/manufacturers", async (req, res, next) => {
  try {
    const managers = await Service.getAllManufacturers();
    res.json(managers);
  } catch (error) {
    next(error);
  }
});
Router.post("/manufacturers/add", async (req, res, next) => {
  try {
    const mechanic = await Service.addManufacturer(req.body);
    res.json({
      status: "success",
      message: "manufacturer created succesfully",
    });
  } catch (err) {
    next(err);
  }
});
Router.patch("/manufacturers/update", async (req, res, next) => {
  try {
    const mechanic = await Service.updateManufacturer(req.body);
    if (!mechanic.email) {
      throw new Error("no email");
    }
    res.json(mechanic);
  } catch (err) {
    next(err);
  }
});
Router.delete("/manufacturers/remove/:email", async (req, res, next) => {
  try {
    const mechanic = await Service.deleteManufacturer(req.params.email);

    res.json({
      status: "success",
      message: "manufacturer deleted succesfully",
    });
  } catch (err) {
    next(err);
  }
});

//parts
Router.get("/parts", async (req, res, next) => {
  try {
    const parts = await Service.getAllParts();
    res.json(parts);
  } catch (error) {
    next(error);
  }
});
Router.get("/parts/:serviceCenterId", async (req, res, next) => {
  try {
    const parts = await Service.getAllPartsInServiceCenter(
      req.params.serviceCenterId
    );
    res.json(parts);
  } catch (error) {
    next(error);
  }
});
Router.post("/parts/add", async (req, res, next) => {
  try {
    const parts = await Service.addPart(req.body);
    res.json({
      status: "success",
      message: "parts created succesfully",
    });
  } catch (err) {
    next(err);
  }
});
Router.patch("/parts/update/:serviceCenterId", async (req, res, next) => {
  try {
    const parts = await Service.updateParts(
      req.body,
      req.params.serviceCenterId
    );
    if (!parts.parts_id) {
      throw new Error("no id");
    }
    res.json(parts);
  } catch (err) {
    next(err);
  }
});

//auth
Router.post("/user", async (req, res, next) => {
  try {
    const user = await Service.authenticate(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

Router.get("/center/:id", async (req, res, next) => {
  try {
    const centers = await Service.getServiceCenterById(req.params.id);
    res.json(centers);
  } catch (error) {
    next(error);
  }
});

Router.post("/purchase", async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await Service.addPurchaseReceipt(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
Router.get("/purchase/history/:id", async (req, res, next) => {
  try {
    const centers = await Service.getAllPurchaseReceipt(req.params.id);
    res.json(centers);
  } catch (error) {
    next(error);
  }
});
Router.post("/purchase/details/:id", async (req, res, next) => {
  try {
    const centers = await Service.getAllPurchaseDetails(
      req.params.id,
      req.body
    );
    res.json(centers);
  } catch (error) {
    next(error);
  }
});
Router.get("/statistics/job/:id", async (req, res, next) => {
  console.log("a");
  try {
    const centers = await Service.getJobsStastics(req.params.id);
    res.json(centers);
  } catch (error) {
    next(error);
  }
});
Router.get("/statistics/parts/:id", async (req, res, next) => {
  console.log("a");
  try {
    const centers = await Service.getPartsUsedStatistics(req.params.id);
    res.json(centers);
  } catch (error) {
    next(error);
  }
});
Router.get("/statistics/parts_requested/:id", async (req, res, next) => {
  console.log("a");
  try {
    const centers = await Service.getMostRequestedParts(req.params.id);
    res.json(centers);
  } catch (error) {
    next(error);
  }
});
Router.get("/statistics/manufacturer/:id", async (req, res, next) => {
  console.log("a");
  try {
    const centers = await Service.getManufacturerStatistics(req.params.id);
    res.json(centers);
  } catch (error) {
    next(error);
  }
});
module.exports = Router;
