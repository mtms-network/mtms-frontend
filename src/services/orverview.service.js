import {BASE_API, BOXES, WALLET_ADDRESS} from "configs";
import Web3 from "web3";
import { createPrivateInstance } from "./base";
import erc20abi from "../abi/mtms-smartcontract.abi.json";

const client = createPrivateInstance("/your-box");

export const getBoxs = async () => {
  try {
    const res = await client.get("/box-list");
    const boxes = [...BOXES];

    return boxes.map((item) => {
      const boxBE = res?.data?.data?.find((b) => b.sku === item.sku);
      if(boxBE){
        item.photo = boxBE.photo;
        item.id = boxBE.id
      }

      return {
        ...item,
        id: boxBE.id,
        available: 0,
        owning: 0,
      }
    });
  } catch (err) {
    console.error("getPreRequireMeeting", err);
    return [];
  }
};

export const saveOpenBox = async (data) => {
  try {
    await client.post("/open-box", data);
    return true;
  }catch (err){
    console.log('err saveOpenBox');
  }
  return true;
};

export const getBoxesContract = async (boxBE) => {
  try {
    const web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    const walletAddress = accounts[0];

    const contract = new web3.eth.Contract(
      erc20abi,
      WALLET_ADDRESS.RINKEBY_ETH
    );

    let boxList = [...BOXES];
    boxList = boxList.map((item) => {
      const beBox = boxBE?.find((b) => b.sku === item.sku);
      if(beBox){
        item.id = beBox.id;
        item.photo = beBox.photo;
      }
      return {
        ...item,
        available: 0,
        owning: 0,
      }
    })

    // await contract.methods.mint(false, 5).send({from: walletAddress});

    const boxesRequest = await contract.methods.getTokenIds(walletAddress).call();

    const arrNftType = ["silver","gold","platinum"];
    boxesRequest.forEach((item) => {
      const indexBox = boxList.findIndex((b) => b.isEpicBox === !!item.isEpicBox);

      if(arrNftType.includes(item.nftsType)){
        boxList[indexBox].owning += 1;
      }else{
        boxList[indexBox].available += 1;
        boxList[indexBox].tokenId.push(item.id);
      }
    });

    setTimeout(() => {}, 5000)
    return boxList;
  }catch (err){
    console.log('err', err);
    return [];
  }
}
