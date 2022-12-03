const Response = require("../helpers/response");
const configEnv = require("../config/env");
const collectionsSchema = require("../models/schema/collections");
const {
  selectAllCollections,
  selectCollectionsById,
} = require("../models/collections");

exports.getAllCollections = async (req, res) => {
  try {
    const result = await selectAllCollections();
    if (!result.length > 0) {
      return res.json(
        Response(true, 204, "Get All Collections Successfully", {})
      );
    }

    const data = [];
    result.forEach((d) => {
      let newObj = {};
      newObj[collectionsSchema[Object.keys(d)[0]]] = d.collections_id;
      newObj[collectionsSchema[Object.keys(d)[1]]] = d.name;
      newObj[collectionsSchema[Object.keys(d)[2]]] = d.slug;
      newObj[collectionsSchema[Object.keys(d)[3]]] = d.url_link;
      newObj[
        collectionsSchema[Object.keys(d)[4]]
      ] = `${configEnv.base_url_admin}${d.path_image}`;
      data.push(newObj);
    });

    return res.json(
      Response(true, 200, "Get All Collections Successfully", {
        data,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getCollectionsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await selectCollectionsById(id);
    if (!result.length) {
      return res.json(
        Response(false, 400, "Get Collections Not Found", {
          name: "collectionsId",
        })
      );
    }

    let newObj = {};
    newObj[collectionsSchema[Object.keys(result[0])[0]]] =
      result[0].collections_id;
    newObj[collectionsSchema[Object.keys(result[0])[1]]] = result[0].name;
    newObj[collectionsSchema[Object.keys(result[0])[2]]] = result[0].slug;
    newObj[collectionsSchema[Object.keys(result[0])[3]]] = result[0].url_link;
    newObj[
      collectionsSchema[Object.keys(result[0])[4]]
    ] = `${configEnv.base_url_admin}${result[0].path_image}`;

    return res.json(
      Response(true, 200, "Get Collections Successfully", newObj)
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
