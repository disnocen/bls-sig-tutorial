# Tutorial on BLS signatures for the DLT4All course

here is the repository for the tutorial on BLS signatures. Students should clone this repository in order to be able to do the exercises proposed during the lab.

The node library is based on the <https://github.com/paulmillr/noble-bls12-381> repository.

## Useful links
- <https://hackmd.io/@benjaminion/bls12-381>

## Install NodeJs

Go here <https://nodejs.org/en/download/> to download and install the nodejs package

## Clone this repository 

On a terminal do


```
git clone https://github.com/disnocen/bls-sig-tutorial
cd bls-sig-tutorial
```

## install libraries

Do this code

```
npm install

```

## Solve exercises


to solve an exercise, remove the comments from it, complete the code and test it.

An exercise as it appears in the file `test/excercises.test.ts`:

```
//   it("should create and verify signed message", async () => {
//     for (let i = 0; i < NUM_RUNS; i++) {
//       const [priv, msg] = // insert code here
//       const sig = await // insert code here
//       const pubkey = // insert code here
//       const res = await bls.verify(sig, pubkey, msg ); // that won't work, see why
//       expect(res).toBeTruthy()
//     }
//   });
```

Note the `insert code here` comment.

When you solve an exercise run

```
npm test
```

and see if there are errors. All test should always be succesful: those handling _wrong_ cases are expected to fail and therefore are considered succesfull when failing.
