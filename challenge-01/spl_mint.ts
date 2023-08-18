import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallet from "./wba-wallet.json";


const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23])); 
const mint = new PublicKey("37xHceLLtV1bGxPNVwghwCxfGf9UKK3UEkTuYZzRsnG9");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");


(async () => {
    console.log(keypair.publicKey)
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey
    )
    console.log(`Your ata is: ${ata.address.toBase58}`);

    const x = await mintTo(
        connection,
        keypair,
        mint,
        ata.address,
        keypair,
        1_337_000_000
    );

    console.log(`Your mint addess: ${x}`);

})();