import { transformHL7 } from "../utils/mapper/hl7Mapper";
const controller = {};

controller.getFormattedData = async (req, res, next) => {
  try {
    const result = await transformHL7(req.body);
    res.status(200).send({ message: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export default controller;
