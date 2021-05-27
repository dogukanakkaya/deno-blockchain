import {createHash} from "../deps.ts";

export class Block {
    private timestamp: number;
    private data: unknown;
    private previousHash: string = '';
    private hash: string = '';
    private nonce: number = 0

    constructor({timestamp, data}: IBlock) {
        this.timestamp = timestamp;
        this.data = data;
    }

    createHash(): string {
        return createHash('sha256').update(this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString()
    }

    getHash(): string {
        return this.hash
    }

    setHash(hash: string): void {
        this.hash = hash
    }

    getPreviousHash(): string {
        return this.previousHash
    }

    setPreviousHash(previousHash: string): void {
        this.previousHash = previousHash
    }

    mineBlock(difficulty: number): void {
        while(this.hash.substr(0, difficulty) !== new Array(difficulty + 1).join('0')) {
            this.nonce++
            this.setHash(this.createHash())
        }
    }
}

export interface IBlock {
    timestamp: number
    data: unknown
}