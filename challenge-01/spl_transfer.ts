import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { Commitment, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";


const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23]));
//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const mint = new PublicKey("37xHceLLtV1bGxPNVwghwCxfGf9UKK3UEkTuYZzRsnG9");
const newWallet = new PublicKey("4pFmm4QDeuoSxbG76v5pUZaxiSeZZijipx4o7YyTrcwH");

(async () => {
    const ATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
    console.log(ATA.address.toBase58())
    
    // const sendTo = await mintTo(
    //     connection,
    //     keypair,
    //     mint,
    //     ATA.address,
    //     keypair,
    //     1_000_000
    // );

    const toATA = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        newWallet
    );

    const sendTo2 = await transfer(
        connection,
        keypair,
        ATA.address,
        toATA.address,
        keypair,
        1_000_000
    )
    
    console.log(sendTo2)
    
})();