var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Keypair, PublicKey } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { IDL } from "./programs/wba_vault";
const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23]));
const vault_state = new PublicKey("<public key copied form vault transaction explorer");
const program = new Program(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o");
const vault_auth = PublicKey.findProgramAddressSync([Buffer.from("auth"), vault_state.toBuffer()], program.programId)[0];
const vault_ = PublicKey.findProgramAddressSync([Buffer.from("vault"), vault_auth.toBuffer()], program.programId)[0];
(() => __awaiter(void 0, void 0, void 0, function* () {
    const txhash = yield program.methods
        .deposit(new BN(1e9))
        .accounts({
        owner: keypair.publicKey,
        vaultState: vault_state,
        vault: vault_state,
        vaultAuth: vault_auth,
        systemProgram: program.programId,
    }).signers([
        keypair
    ]);
    console.log(`Transaction Id: ${txhash}`);
}))();
//# sourceMappingURL=vault_deposit.js.map