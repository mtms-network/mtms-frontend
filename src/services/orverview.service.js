import {BASE_API, BOXES, WALLET_ADDRESS} from "configs";
import Web3 from "web3";
import { createPrivateInstance } from "./base";
import erc20abi from "../abi/mtms-smartcontract.abi.json";
import QueryString from "qs";

const client = createPrivateInstance("/your-box");

export const getBoxs = async () => {
  try {
    const res = await client.get("/box-list");
    const boxes = [...BOXES];

    return boxes.map((item) => {
      const boxBE = res?.data?.data?.find((b) => b.sku === item.sku);
      if(boxBE){
        item.photo = boxBE.photo;
        item.id = boxBE.id;
        item.boxes_opened = boxBE.boxes_opened;
      }

      return {
        ...item,
        id: boxBE.id,
        available: 0,
        owning: 0,
      };
    });
  } catch (err) {
    console.error("getPreRequireMeeting", err);
    return [];
  }
};

export const saveOpenBox = async (data) => {
  try {
    const res = await client.post("/open-box", data);
    return res?.data;
  }catch (err){
    console.log('err saveOpenBox');
  }
  return null;
};

export const saveOpenBoxes = async (arrData) => {
  try {
    const res = await client.post("/open-boxes", arrData);
    return res?.data;
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
      WALLET_ADDRESS.MUMBOA
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

      if(arrNftType.includes(item.nftType)){
        boxList[indexBox].owning += 1;
        boxList[indexBox].boxes_opened_contract.push(Number(item.id));
      }else{
        boxList[indexBox].available += 1;
        boxList[indexBox].tokenId.push(item.id);
      }
    });

    let arrBoxReopen = [];
    boxList.forEach((item) => {
      const difference = item.boxes_opened_contract.filter(x => !item.boxes_opened.includes(x));
      arrBoxReopen = arrBoxReopen.concat(difference);
    });

    if(arrBoxReopen.length){
      await saveOpenBoxes({tokenId: arrBoxReopen});
    }

    console.log('boxList', boxList)
    return boxList;
  }catch (err){
    console.log('err', err);
    return [];
  }
};

export const getNFTs = async (defaultFilters) => {
  try {
    const filter = {
      current_page: defaultFilters.page,
      per_page: defaultFilters.limit,
      sort_by: "id",
      order: "desc",
    };
    const query = QueryString.stringify({ ...filter });

    const res = await client.get(`nfts?${query}`);
    return res?.data;
  }catch (err){
    console.log('err getNFTs');
  };
  return null;
};

export const getSubscription = async (defaultFilters) => {
  try {
    const filter = {
      current_page: defaultFilters.page,
      per_page: defaultFilters.limit,
      sort_by: "id",
      order: "desc",
    }
    const query = QueryString.stringify({ ...filter });

    const res = await client.get(`/subscriptions?${query}`);
    return res?.data;
  }catch (err) {}

  return null;
};
