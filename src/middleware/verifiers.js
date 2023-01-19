const verifyId = (_model) => {
  return async (req, res, next) => {
    const id = req.params["id"];
    const document = _model.findById(id);
    if (!document) {
      next(document);
    }
    next();
  };
};

function verifyRequestFields(_model, filterArray = []) {
  return (req, res, next) => {
    const wrongFields = [];

    const bodyFields = Object.keys(req.body);
    let schemaFields = Object.keys(_model.schema.obj);
    if (filterArray.length > 0) {
      schemaFields = schemaFields.filter((el) => {
        let ok = true;
        filterArray.forEach((filter) => {
          if (el == filter) ok = false;
        });
        return ok;
      });
    }
    //console.log(fields);
    const verified = bodyFields.every((el) => {
      if (!schemaFields.includes(el)) {
        wrongFields.push(el);
        return false;
      }
      return true;
    });
    if (verified) return next();
    else
      return next({
        message: "wrong fields in request :" + wrongFields,
        name: "wrongFields",
        status: 400,
      });
  };
}

const verifyRequestFieldsInArray = (_model) => {
  return async (res, req, next) => {
    const cartKeys = Object.keys(_model.schema.obj.cart[0]);
    const dataKeys = Object.keys(res.body);
    let wrongFields = [];

    const verified = cartKeys.every((key) => {
      if (!dataKeys.includes(key)) {
        wrongFields.push(key);
        return false;
      }
      return true;
    });

    if (!verified) {
      return next({
        message: "wrong fields in request :" + wrongFields,
        name: "wrongFields",
        status: 400,
      });
    }
    next();
  };
};

module.exports = { verifyRequestFields, verifyRequestFieldsInArray, verifyId };
