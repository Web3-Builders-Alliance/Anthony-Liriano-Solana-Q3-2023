import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { Commitment, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import wallet from "./wba-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const mint = new PublicKey("37xHceLLtV1bGxPNVwghwCxfGf9UKK3UEkTuYZzRsnG9");
const newWallet = new PublicKey("4pFmm4QDeuoSxbG76v5pUZaxiSeZZijipx4o7YyTrcwH");

(async () => {
    const ATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
    console.log(ATA.address.toBase58())

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