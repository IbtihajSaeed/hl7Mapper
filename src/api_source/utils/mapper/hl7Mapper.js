import { formatDates } from "../formatDates";
import { HL7_SEGMENTS } from "../constants";
import * as mapper from "../../../config/hl7Mapper.json";
import { mapGender } from "../mapGender";
export const transformHL7 = (data) => {
  const json = data;
  const tranformedHL7 = {};
  try {
    for (const key in json) {
      for (const secondKey in json[key]) {
        if (secondKey == "RXR" || secondKey == "RXA") {
          if (
            typeof json[key][secondKey] === "object" &&
            Array.isArray(json[key][secondKey]) == false
          ) {
            json[key][secondKey] = [json[key][secondKey]];
          }
        }
        if (HL7_SEGMENTS.includes(secondKey)) {
          //map data as per dictionary defined you can add dictnory as per your need
          const pidArray = mapper[secondKey].values;
          //in case of RXA and RXR if its an array
          if (Array.isArray(json[key][secondKey])) {
            const makeArr = [];
            for (let i = 0; i < json[key][secondKey].length; i++) {
              const makeObj = {};
              for (const p of pidArray) {
                if (
                  json[key][secondKey][i][`${secondKey}.${p.component[0]}`] !=
                  undefined
                ) {
                  const keyName = Object.keys(
                    json[key][secondKey][i][`${secondKey}.${p.component[0]}`]
                  )[0];
                  if (keyName) {
                    const splitted = keyName.split(".", 1);
                    const fieldName = splitted[0];
                    if (p.component[1] == undefined) {
                      makeObj[p.field] =
                        json[key][secondKey][`${secondKey}.${p.component[0]}`];
                    } else {
                      makeObj[p.field] =
                        json[key][secondKey][i][
                          `${secondKey}.${p.component[0]}`
                        ][`${fieldName}.${p.component[1]}`];
                    }

                    makeObj[p.field] = makeObj[p.field]
                      ? makeObj[p.field]
                      : null;
                    if (
                      typeof makeObj[p.field] === "object" &&
                      !Array.isArray(makeObj[p.field]) &&
                      makeObj[p.field] !== null
                    ) {
                      makeObj[p.field] = Object.values(makeObj[p.field])[0];
                    }
                  }
                }
              }
              makeArr.push(makeObj);
            }
            tranformedHL7[secondKey] = makeArr;
          } else {
            for (const p of pidArray) {
              if (
                json[key][secondKey][`${secondKey}.${p.component[0]}`] !=
                undefined
              ) {
                const keyName = Object.keys(
                  json[key][secondKey][`${secondKey}.${p.component[0]}`]
                )[0];
                if (keyName) {
                  const splitted = keyName.split(".", 1);
                  const fieldName = splitted[0];
                  if (p.component[1] == undefined) {
                    tranformedHL7[p.field] =
                      json[key][secondKey][`${secondKey}.${p.component[0]}`];
                  } else {
                    tranformedHL7[p.field] =
                      json[key][secondKey][`${secondKey}.${p.component[0]}`][
                        `${fieldName}.${p.component[1]}`
                      ];
                  }
                  tranformedHL7[p.field] = tranformedHL7[p.field]
                    ? tranformedHL7[p.field]
                    : null;
                  if (
                    typeof tranformedHL7[p.field] === "object" &&
                    !Array.isArray(tranformedHL7[p.field]) &&
                    tranformedHL7[p.field] !== null
                  ) {
                    tranformedHL7[p.field] = Object.values(
                      tranformedHL7[p.field]
                    )[0];
                  }
                }
              }
            }
          }
        }
      }
    }
    formatDates(tranformedHL7, ["dob"]);
    tranformedHL7["gender"] =
      tranformedHL7["gender"] && mapGender(tranformedHL7["gender"]);
    const vaccineArray = tranformedHL7["RXA"].map((item, i) =>
      Object.assign({}, item, tranformedHL7["RXR"][i])
    );

    tranformedHL7["vaccines"] = vaccineArray;
    delete tranformedHL7["RXA"];
    delete tranformedHL7["RXR"];
    return tranformedHL7;
  } catch (e) {
    throw e;
  }
};
