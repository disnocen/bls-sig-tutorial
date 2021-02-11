import { ethers, Web3 } from "hardhat";
import { Signer, Contract, ContractFactory } from "ethers";
import { assert } from "chai";
import * as bls from "noble-bls12-381";
import { readFileSync } from 'fs';
import { join } from 'path';
const G2_VECTORS = readFileSync(join(__dirname, 'bls12-381-g2-test-vectors.txt'), 'utf-8')
  .trim()
  .split('\n')
  .map(l => l.split(':'));

// @ts-ignore
const NUM_RUNS = Number(process.env.RUNS_COUNT || 1); // reduce to 1 to shorten test time

// @ts-ignore
const CURVE_ORDER = bls.CURVE.r;

function toHex(uint8a: Uint8Array): string {
  // pre-caching chars could speed this up 6x.
  let hex = '';
  for (let i = 0; i < uint8a.length; i++) {
    hex += uint8a[i].toString(16).padStart(2, '0');
  }
  return hex;
}

function strToHex(str: string): string{
    let hex='';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}
describe("Verifier", function () {
  let accounts: Signer[];

	let verifierFactory: ContractFactory;
	let verifier: Contract;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

		verifierFactory = await ethers.getContractFactory("DepositVerifier");
		verifier = await verifierFactory.deploy();
  });

  it("check a serialization", async function () {
    // Do something with the accounts
      const amount = 28e8;

      let amountEncoded = await verifier.serializeAmount(amount);
      console.log(amountEncoded.toString())
      //assert(amountEncoded.toString()==="2000","not equal");
      
  });

  // it("hash message to field", async function () {
    // var message = new Uint8Array();
    // message=[11, 205, 35, 62, 74, 144, 144, 203, 225, 145, 217, 203, 142, 122, 208, 69, 6, 94, 109, 221, 243, 50, 17, 72, 35, 178, 129, 18, 89, 39, 1, 245, 209, 149, 85, 81, 150, 178, 211, 204, 196, 166, 210, 150, 57, 127, 236, 34, 232, 170, 128, 132, 117, 49, 171, 130, 133, 105, 200, 124, 11, 199, 49, 73];
    // // the hash of the message is:
    // // G2(x=Fq2(Fq(0x1406243223330d47fbd41d5eed151c21f218a47e6e39e40d5bdc4c7678b2c110a9803f7497ca4de6607ceb7d9717a1c4) + Fq(0x12b019750f4156ed00c83d43f3e206ba8f123f678683ab7e0a64c125be7e8f692cff0a7c0b387809deba4111d369bf05) * u), y=Fq2(Fq(0x16e8d2171e10f09727d60a65bdce5a724b5e82795087592b97f1f2b4be41b2c66fca328d349fef1dcb62a67c49dd4870) + Fq(0x1004ffb9d140aff507abba5d41d406762260013506f213acdd3c80df70a89f502871800320e3474a51652cf7c8f93c67) * u))
    // const messagehex=toHex(message)
    // const msg = ethers.utils.formatBytes32String(messagehex)
    // let result = await verifier.hashToField(message)
    // console.log(result)
  // });
// 

  it(`sign a message using a private key from the test vector and then verify it`, async () => {
      const priv="e99d0f7a4f8a9e3f74a6bd9677b3fd5be32f7cea4e5b898ed3dea735fa647632"
      const msgRaw="hi all"  
      const msg=strToHex(msgRaw);
      const sig = await bls.sign(msg, priv);
      console.log("toHex sig:", toHex(sig) )
      const pub = bls.getPublicKey(priv);
      const res = await bls.verify(sig, msg, pub);
      console.log("res is", res )
  });

  it(`sign two different messages using different private keys from the test vector and then aggregate and verify it`, async () => {
      const priv="e99d0f7a4f8a9e3f74a6bd9677b3fd5be32f7cea4e5b898ed3dea735fa647632"
      const priv2="281c1297034c8aaa2ea6368dd038833429673b99dd4da4622908de8d9674f99d"  
      const msgRaw="hi all"  
      const msgRaw2="hi back"  
      const msg=strToHex(msgRaw);
      const msg2=strToHex(msgRaw);
      const msgs=[msg,msg2]

      const sig = await bls.sign(msg, priv);
      const sig2 = await bls.sign(msg2, priv2);
      const sigs=[sig,sig2]
      const aggregateSigs=bls.aggregateSignatures(sigs)

      const pub = bls.getPublicKey(priv);
      const pub2 = bls.getPublicKey(priv2);
      const pubs = [pub,pub2];
      const res = await bls.verifyBatch(msgs,pubs,aggregateSigs);
      console.log("res is", res )
  });

  // it(`should produce correct signatures using noble library (${G2_VECTORS.length - 500} vectors)`, async () => {
    // for (let i = 0; i < G2_VECTORS.length -500; i++) {
      // const [priv, msg, expected] = G2_VECTORS[i];
      // 
      // const sig = await bls.sign(msg, priv);
      // if (i<3) {
        // console.log("toHex sig:", toHex(sig) )
        // // console.log("sig: ", sig )
      // }
      // toHex(sig) == expected;
    // }
  // });

  // it("should verify signed message", async () => {
    // for (let i = 0; i < NUM_RUNS; i++) {
      // const [priv, msg] = G2_VECTORS[i];
      // const message= ethers.utils.formatBytes32String(msg)
      // const sig = await bls.sign(msg, priv);
      // const pub = bls.getPublicKey(priv);
      // const res = await bls.verify(sig, msg, pub);
      // // let result = await verifier.blsSignatureIsValid(message, pub)
      // if (i<5){
        // console.log("res with bls library", res)
        // console.log("pub is:", pub)
        // // console.log("res with smart contract", result)
      // }
      // 
    // }
  // });

  it("should do something right", async function () {
    // Do something with the accounts
  });
});
