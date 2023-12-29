const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // filtering
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // queryObject.name = new RegExp(name, "i");
    queryObject.name = { $regex: name, $options: "i" };
  }

  // Numeric Filters
  if (numericFilters) {
    // numericFilters=price>50,rating=4.5
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      ">=": "$lte",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: value,
        };
      }
    });
  }
  console.log(queryObject);
  //   const products = await Product.find(queryObject);
  let result = Product.find(queryObject);

  // sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // selecting fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  //   if (skip) {
  //     result = result.skip(skip);
  //   }
  //   if (limit) {
  //     result = result.limit(limit);
  //   }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  // console.log(queryObject);
  res.status(200).json({
    products,
    nbHits: products.length,
  });
};

module.exports = {
  getAllProducts,
};
