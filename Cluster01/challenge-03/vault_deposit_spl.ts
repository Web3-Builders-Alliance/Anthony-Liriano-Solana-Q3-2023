import {Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js" 
import { Program, BN, AnchorProvider, Wallet } from "@project-serum/anchor" 
import { IDL, wba_vault } from "./programs/wba_vault";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "./wba-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed"});
const vault_state =  new PublicKey("H6LEqcLtp5BUYhtYKGsirUvvZpdU5bjyJu2YLHmCxPnj");
const program  = new Program<wba_vault>(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o", provider);
const vault_auth = PublicKey.findProgramAddressSync([Buffer.from("auth"), vault_state.toBuffer()], program.programId)[0];
const vault = PublicKey.findProgramAddressSync([Buffer.from("vault"), vault_auth.toBuffer()], program.programId)[0];
const mint = new PublicKey("37xHceLLtV1bGxPNVwghwCxfGf9UKK3UEkTuYZzRsnG9");


(async () => {
    const owner_ata = await getOrCreateAssociatedTokenAccount(
        connection, keypair, mint, keypair.publicKey
    );

    const vault_ata = await getOrCreateAssociatedTokenAccount(
        connection, keypair, mint, vault_auth, true
    );

    const txhash = await program.methods
    .depositSpl(new BN(1e6))
    .accounts({
        owner: keypair.publicKey,
        vaultState: vault_state,        
        ownerAta : owner_ata.address,
        vaultAta: vault_ata.address,
        vaultAuth: vault_auth,
        tokenMint: mint,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID, 
        systemProgram: SystemProgram.programId,
    }).signers(
        [
            keypair
        ]
    ).rpc();
    console.log(`Transaction Id: ${txhash}`);
})();