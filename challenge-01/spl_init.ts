import { Keypair, Connection } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "./wba-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23])); 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try{
        const mint = await createMint(
            connection, 
            keypair,
            keypair.publicKey,
            null,
            6
        );
        console.log(mint.toBase58());
    }catch(error) {
        console.error(error);
    }
})();