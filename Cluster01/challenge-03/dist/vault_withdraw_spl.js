var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { IDL } from "./programs/wba_vault";
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23]));
const vault_state = new PublicKey("<public key copied form vault transaction explorer");
const program = new Program(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o");
const vault_auth = PublicKey.findProgramAddressSync([Buffer.from("auth"), vault_state.toBuffer()], program.programId)[0];
const vault = PublicKey.findProgramAddressSync([Buffer.from("vault"), vault_auth.toBuffer()], program.programId)[0];
const mint = new PublicKey("<Address For token Mint I created");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const owner_ata = yield getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
    const vault_ata = yield getOrCreateAssociatedTokenAccount(connection, keypair, mint, vault_auth, true);
    const txhash = yield program.methods
        .depositSpl(new BN(1e6))
        .accounts({
        owner: keypair.publicKey,
        vaultState: vault_state,
        ownerAta: owner_ata.address,
        vaultAta: vault_ata.address,
        vaultAuth: vault_auth,
        systemProgram: TOKEN_PROGRAM_ID,
        tokenMint: mint,
        tokenProgram: SystemProgram.programId
    }).signers([
        keypair
    ]);
    console.log(`Transaction Id: ${txhash}`);
}))();
//# sourceMappingURL=vault_withdraw_spl.js.map