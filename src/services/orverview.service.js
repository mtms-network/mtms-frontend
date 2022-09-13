import { BASE_API } from "configs";
import momen from "moment";
import { createPrivateInstance } from "./base";

const client = createPrivateInstance("/your-box");

export const getBoxs = async () => {
  try {
    const res = await client.get("/boxes");

    const boxs = res?.data?.data || [];

    let results = [];

    boxs?.forEach((box) => {
      let checkIndex = results.findIndex((b) => b.sku === box?.box?.sku);
      let checkIsOwningOrOpen = box?.opened_at != null; // true : owning, false: opend

      if (checkIndex === -1) {
        let date = null;
        if (checkIsOwningOrOpen === false) {
        }

        results.push({
          sku: box.box.sku,
          name: box.box.name,
          photo: box.box.photo,
          owning: checkIsOwningOrOpen === true ? 1 : 0,
          avaliable: checkIsOwningOrOpen === true ? 0 : 1,
          date: box.opend_at,
        });
      } else {
        if (checkIsOwningOrOpen) {
          results[checkIndex].owning += 1;
        } else {
          results[checkIndex].avaliable += 1;
        }
      }
    });

    return results;
  } catch (err) {
    console.error("getPreRequireMeeting", err);
    return error;
  }
};
