import {createHash} from "../deps.ts"
import {Block} from "./Block.ts"

export class Blockchain {
    private chain: Block[] = [this.genesisBlock()]
    private difficulty: number = 3

    /**
     * @return the first block of the blockhain
     */
    private genesisBlock(): Block {
        const block = new Block({
            timestamp: Date.now(),
            data: {block: 'Genesis'},
        })
        block.setPreviousHash(createHash('sha256').update('genesis').toString())
        block.setHash(block.createHash())

        return block
    }

    lastBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

    addBlock(block: Block): void {
        block.setPreviousHash(this.lastBlock().getHash()) // Set block's previous hash
        block.mineBlock(this.difficulty)
        this.chain.push(block)
    }

    checkIntegrity() {
        // Do not use array.filter because we don't want to check for the genesis block
        for(let i = 1;i < this.chain.length;i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            // If block's hash not equal to calculated hash (like if it's changed after) or block's previous hash is not correct
            if (currentBlock.getHash() !== currentBlock.createHash() || currentBlock.getPreviousHash() !== previousBlock.getHash()) {
                return false
            }
        }
        return true
    }
}