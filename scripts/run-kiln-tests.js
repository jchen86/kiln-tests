main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function main() {
  // Call ten different contracts at least ten times each
  await Array(10).fill()
    .reduce(async (prev, curr, index) => {
      await prev;
      console.log(`deployAndCall ${++index}`);
      return deployAndCall();
    }, Promise.resolve());

  // deploy 90 more contracts 
  await Array(90).fill()
    .reduce(async (prev, curr, index) => {
      await prev;
      console.log(`deployContract ${++index}`);
      return deployContract();
    }, Promise.resolve());

  console.log(`Done!`)
}

async function deployAndCall() {
  const contract = await deployContract();
  for await (const i of callContractTenTimes(contract)) {
    console.log(`Call transaction ${i} succeeded.`);
  }
}

async function deployContract() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const TutorialContract = await ethers.getContractFactory("Tutorial");
  const contract = await TutorialContract.deploy();
  await contract.deployed()

  console.log("Contract deployed. Address:", contract.address);

  return contract
}

async function* callContractTenTimes(contract) {
  const [signer] = await ethers.getSigners();

  for (let i = 0; i < 10; i++) {
    const receipt = await contract.mint(signer.address, i, 1, { gasLimit: 1000000 });
    console.log(JSON.stringify(receipt, null, 2))
    yield i;
  }
}
