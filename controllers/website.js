const { selectWebsiteByMenuName } = require("../models/website");
const configEnv = require("../config/env");
const websiteContentSchema = require("../models/schema/websiteContent");
const Response = require("../helpers/response");

exports.getWebsiteByMenuName = async (req, res) => {
  const { menuName } = req.params;
  try {
    const result = await selectWebsiteByMenuName(menuName);
    if (!result.length) {
      return res.json(
        Response(false, 204, `Get Content Website ${menuName} Not Found`, {})
      );
    }

    const regex = /[^"']+\.(?:(?:pn|jpe?)g|gif)\b/;

    const data = [];
    result.forEach((d) => {
      let newObj = {};
      if (regex.test(d.value)) {
        d.value = `${configEnv.base_url_admin}${d.value}`;
      }
      newObj[websiteContentSchema[Object.keys(d)[0]]] = d.website_content_id;
      newObj[websiteContentSchema[Object.keys(d)[1]]] = d.menu_name;
      newObj[websiteContentSchema[Object.keys(d)[2]]] = d.key_name;
      newObj[websiteContentSchema[Object.keys(d)[3]]] = d.value;
      data.push(newObj);
    });

    return res.json(
      Response(true, 200, `Get Content Website ${menuName} Successfuly`, data)
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
