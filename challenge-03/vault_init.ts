import { Keypair, SystemProgram, PublicKey, Connection } from "@solana/web3.js" 
import { IDL, wba_vault } from "./programs/wba_vault";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import wallet from "./wba-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed"});
const vault_state = Keypair.generate();
const program  = new Program<wba_vault>(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o", provider);
const vault_auth = PublicKey.findProgramAddressSync([Buffer.from("auth"), vault_state.publicKey.toBuffer()], program.programId)[0];
const vault = PublicKey.findProgramAddressSync([Buffer.from("vault"), vault_auth.toBuffer()], program.programId)[0];

(async () => {
    const txhash = await program.methods
    .initialize()
    .accounts({
        owner: keypair.publicKey,
        vaultState: vault_state.publicKey,        
        vault : vault,
        vaultAuth: vault_auth,
        systemProgram: SystemProgram.programId,
    }).signers(
        [
            keypair,
            vault_state
        ]
    ).rpc();

    console.log(`Transaction Id: ${txhash}`);
})();