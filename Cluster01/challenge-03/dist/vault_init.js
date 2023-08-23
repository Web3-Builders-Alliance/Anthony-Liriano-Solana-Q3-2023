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
import { IDL } from "./programs/wba_vault";
import { Program } from "@project-serum/anchor/dist/cjs/program";
const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23]));
const vault_state = Keypair.generate();
const program = new Program(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o");
const vault_auth = PublicKey.findProgramAddressSync([Buffer.from("auth"), vault_state.publicKey.toBuffer()], program.programId)[0];
const vault_ = PublicKey.findProgramAddressSync([Buffer.from("vault"), vault_auth.toBuffer()], program.programId)[0];
(() => __awaiter(void 0, void 0, void 0, function* () {
    const txhash = yield program.methods
        .initialize()
        .accounts({
        owner: keypair.publicKey,
        vaultState: vault_state.publicKey,
        vault: vault_state.publicKey,
        vaultAuth: vault_auth,
        systemProgram: program.programId,
    }).signers([
        keypair,
        vault_state
    ]);
    console.log(`Transaction Id: ${txhash}`);
}))();
//# sourceMappingURL=vault_init.js.map