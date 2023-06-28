const axios = require('axios');

const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');
const verifyProof = require('../utils/verifyProof');
const serverUrl = 'http://localhost:1225';


async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree = new MerkleTree(niceList);

  const name = "Norman Block";
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  console.log(proof)
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    body : {
      name : name,
      proof : proof
    }
  });

  console.log({ gift });
}

main();