import {BASE_API, BOXES, WALLET_ADDRESS} from "configs";
import Web3 from "web3";
import { createPrivateInstance } from "./base";
import erc20abi from "../abi/mtms-smartcontract.abi.json";

const client = createPrivateInstance("/your-box");

export const getBoxs = async () => {
  try {
    const res = await client.get("/box-list");
    return res?.data?.data || [];
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

    // get count số lượng box
    const balance = await contract.methods.balanceOf(walletAddress).call();

    let boxList = [...BOXES];
    boxList = boxList.map((item) => ({
      ...item,
      available: 0,
      owning: 0,
    }))


    // await contract.methods.mint(true, 9).send({from: accounts[0]});
    if(balance <= 0) return  [];
    let i = 0;
    for(i; i < balance; i++)
    {
      const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call();
      // check box is "COMMON BOX" or "EPIC BOX"
      const isEpicBox = await contract.methods.isEpicBox(tokenId).call();

      const ownerOf = await contract.methods.ownerOf(tokenId).call();

      // check is unbox
      const nftsType = await contract.methods.nftsType(tokenId).call();

      const indexBox = boxList.findIndex((item) => item.isEpicBox === !!isEpicBox);
      const indexBoxBE = boxBE.findIndex((item) => item.sku === boxList[indexBox].sku);
      if(indexBox !== -1){
        boxList[indexBox].id = boxBE[indexBoxBE].id;
        boxList[indexBox].photo = boxBE[indexBoxBE].photo;
      }

      const arrNftType = ["silver","gold","platinum"];
      if(arrNftType.includes(nftsType)){
        boxList[indexBox].owning += 1;
      }else{
        boxList[indexBox].available += 1;
        boxList[indexBox].tokenId.push(tokenId);
      }
    }
    return boxList;
  }catch (err){
    console.log('err', err);
    return [];
  }
}
