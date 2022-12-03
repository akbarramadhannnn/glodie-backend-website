const configEnv = require("../config/env");
const { selectAllTeams, selectTeamsById } = require("../models/teams");
const teamsSchema = require("../models/schema/teams");
const Response = require("../helpers/response");

exports.getAllTeams = async (req, res) => {
  try {
    const result = await selectAllTeams();
    if (!result.length > 0) {
      return res.json(Response(true, 204, "Get All Teams Successfully", {}));
    }

    const data = [];
    result.forEach((d) => {
      let newObj = {};
      newObj[teamsSchema[Object.keys(d)[0]]] = d.teams_id;
      newObj[teamsSchema[Object.keys(d)[1]]] = d.name;
      newObj[teamsSchema[Object.keys(d)[2]]] =
        d.title === "0"
          ? "Artist"
          : d.title === "1"
          ? "Project Manager"
          : d.title === "2"
          ? "Community Manager"
          : "Developer";
      newObj[teamsSchema[Object.keys(d)[3]]] = d.twitter_link;
      newObj[teamsSchema[Object.keys(d)[4]]] = d.linkedin_link;
      newObj[teamsSchema[Object.keys(d)[5]]] = d.description;
      newObj[
        teamsSchema[Object.keys(d)[6]]
      ] = `${configEnv.base_url_admin}${d.path_photo_profile}`;
      data.push(newObj);
    });
    return res.json(
      Response(true, 200, "Get All Teams Successfully", {
        data,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getTeamsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await selectTeamsById(id);
    if (!result.length) {
      return res.json(Response(false, 400, "Get Teams Not Found", {}));
    }

    let newObj = {};
    newObj[teamsSchema[Object.keys(result[0])[0]]] = result[0].teams_id;
    newObj[teamsSchema[Object.keys(result[0])[1]]] = result[0].name;
    newObj[teamsSchema[Object.keys(result[0])[2]]] = result[0].title;
    newObj[teamsSchema[Object.keys(result[0])[3]]] = result[0].twitter_link;
    newObj[teamsSchema[Object.keys(result[0])[4]]] = result[0].linkedin_link;
    newObj[teamsSchema[Object.keys(result[0])[5]]] = result[0].description;
    newObj[
      teamsSchema[Object.keys(result[0])[6]]
    ] = `${configEnv.base_url_admin}${result[0].path_photo_profile}`;

    return res.json(Response(true, 200, "Get Teams Successfully", newObj));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
