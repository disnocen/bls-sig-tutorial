import * as fc from "fast-check";
import * as bls from "..";
import { readFileSync } from 'fs';
import { join } from 'path';
const G2_VECTORS = readFileSync(join(__dirname, 'bls12-381-g2-test-vectors.txt'), 'utf-8')
  .trim()
  .split('\n')
  .map(l => l.split(':'));

// @ts-ignore
const NUM_RUNS = 5
//const NUM_RUNS = Number(process.env.RUNS_COUNT || 10); // reduce to 1 to shorten test time

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

describe("bls12-381", () => {
  bls.PointG1.BASE.clearMultiplyPrecomputes();
  bls.PointG1.BASE.calcMultiplyPrecomputes(8);

//   it(`should produce correct signatures (${G2_VECTORS.length} vectors)`, async () => {
//     for (let i = 0; i < G2_VECTORS.length; i++) {
//       const [priv, msg, expected] = G2_VECTORS[i];
//       const sig = await //insert code here
//       expect(toHex(sig)).toEqual(expected);
//     }
//   });
//   it("should create and verify signed message", async () => {
//     for (let i = 0; i < NUM_RUNS; i++) {
//       const [priv, msg] = // insert code here
//       const sig = await // insert code here
//       const pubkey = // insert code here
//       const res = await bls.verify(sig, pubkey, msg ); // that won't work, see why
//       expect(res).toBeTruthy()
//     }
//   });
//   it("should not verify signature with wrong message", async () => {
//     for (let i = 0; i < NUM_RUNS; i++) {
//       const [priv, msg] = G2_VECTORS[i];
//       const invMsg = G2_VECTORS[i + 1][1];
//       // explain in a comment why the previous lines will produce wrong signatures
// 
//       const sig = // insert code here
//       const pubkey = // insert code here
//       const res = await bls.verify(sig, invMsg, pub);
//       expect(res).toBeFalsy();
//     }
//   });
//   it("should not verify signature with wrong key", async () => {
//     for (let i = 0; i < NUM_RUNS; i++) {
//       const [priv, msg] = G2_VECTORS[i];
//       const invPub = bls.getPublicKey(G2_VECTORS[i + 1][1]);
//       // explain in a comment why the previous lines will produce wrong keys
// 
//       const sig = // insert code here
//       const res = // insert code here
//       expect(res).toBeFalsy();
//     }
//   });
//   it("should verify multi-signature done right", async () => {
//     await fc.assert(
//       fc.asyncProperty(
//         fc.array(fc.hexa(), 1, 100),
//         fc.array(fc.bigInt(1n, CURVE_ORDER), 1, 100),
//         fc.bigInt(1n, BigInt(Number.MAX_SAFE_INTEGER)),
//         async (messages, privateKeys) => {
//           privateKeys = privateKeys.slice(0, messages.length);
//           messages = // insert code here
//           const publicKey = privateKeys.map(bls.getPublicKey);
//           const signatures = await Promise.all(
//             messages.map((message, i) =>
//               // insert code here
//             )
//           );
//           const aggregatedSignature = await bls.aggregateSignatures(signatures);
//           expect(
//             await bls.verifyBatch(
//                 // insert code here
//               // add 'as Uint8Array' after the aggregated signatures variable
//             )
//           ).toBe(true);
//         }
//       ),
//       { numRuns: NUM_RUNS }
//     );
//   });
//   it("should verify multi-signaturez done wrong", async () => {
//     await fc.assert(
//       fc.asyncProperty(
//         fc.array(fc.hexa(), 1, 100),
//         fc.array(fc.hexa(), 1, 100),
//         fc.array(fc.bigInt(1n, CURVE_ORDER), 1, 100),
//         fc.bigInt(1n, BigInt(Number.MAX_SAFE_INTEGER)),
//         async (messages, wrongMessages, privateKeys) => {
//           privateKeys = privateKeys.slice(0, messages.length);
//           messages = messages.slice(0, privateKeys.length);
//           wrongMessages = messages.map((a, i) =>
//             typeof wrongMessages[i] === "undefined" ? a : wrongMessages[i]
//           );
//           const publicKey = await Promise.all(
//             privateKeys.map(bls.getPublicKey)
//           );
//           const signatures = await Promise.all(
//             messages.map((message, i) =>
//               bls.sign(message, privateKeys[i])
//             )
//           );
//           const aggregatedSignature = await bls.aggregateSignatures(signatures);
//           expect(
//             await bls.verifyBatch(
//                 // insert code here
//               // add 'as Uint8Array' after the aggregated signatures variable
//             )
//           ).toBe(messages.every((m, i) => m === wrongMessages[i]));
//         }
//       ),
//       { numRuns: NUM_RUNS }
//     );
//   });
});
