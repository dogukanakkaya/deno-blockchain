import {Blockchain, Block} from "./deps.ts";

const blockchain = new Blockchain()

console.log("Mining block 1")
blockchain.addBlock(new Block({
    timestamp: Date.now(),
    data: {from: '', to: '', amount: 25.00}
}))

console.log("Mining block 2")
blockchain.addBlock(new Block({
    timestamp: Date.now(),
    data: {from: '', to: '', amount: 30.00}
}))