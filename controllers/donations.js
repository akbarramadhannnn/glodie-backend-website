const configEnv = require("../config/env");
const {
  selectAllDonations,
  selectDonationsById,
} = require("../models/donations");
const donationsSchema = require("../models/schema/donations");
const Response = require("../helpers/response");

exports.getAllDonations = async (req, res) => {
  try {
    const result = await selectAllDonations();
    if (!result.length > 0) {
      return res.json(
        Response(true, 204, "Get All Donations Successfully", {})
      );
    }

    const data = [];
    result.forEach((d) => {
      let newObj = {};
      newObj[donationsSchema[Object.keys(d)[0]]] = d.donations_id;
      newObj[donationsSchema[Object.keys(d)[1]]] = d.title;
      newObj[
        donationsSchema[Object.keys(d)[2]]
      ] = `${configEnv.base_url_admin}${d.sertificate_image_path}`;
      newObj[
        donationsSchema[Object.keys(d)[3]]
      ] = `${configEnv.base_url_admin}${d.glodie_image_path}`;
      data.push(newObj);
    });
    return res.json(
      Response(true, 200, "Get All Donations Successfully", {
        data,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getDonationsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await selectDonationsById(id);
    if (!result.length) {
      return res.json(Response(false, 400, "Get Donations Not Found", {}));
    }

    let newObj = {};
    newObj[donationsSchema[Object.keys(result[0])[0]]] = result[0].donations_id;
    newObj[donationsSchema[Object.keys(result[0])[1]]] = result[0].title;
    newObj[
      donationsSchema[Object.keys(result[0])[2]]
    ] = `${configEnv.base_url_admin}${result[0].sertificate_image_path}`;
    newObj[
      donationsSchema[Object.keys(result[0])[3]]
    ] = `${configEnv.base_url_admin}${result[0].glodie_image_path}`;

    return res.json(Response(true, 200, "Get Donations Successfully", newObj));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
