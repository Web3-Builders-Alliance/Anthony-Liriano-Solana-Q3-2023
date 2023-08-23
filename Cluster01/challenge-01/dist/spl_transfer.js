var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23]));
//Create a Solana devnet connection
const commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const mint = new PublicKey("37xHceLLtV1bGxPNVwghwCxfGf9UKK3UEkTuYZzRsnG9");
const newWallet = new PublicKey("4pFmm4QDeuoSxbG76v5pUZaxiSeZZijipx4o7YyTrcwH");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const ATA = yield getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
    console.log(ATA.address.toBase58());
    // const sendTo = await mintTo(
    //     connection,
    //     keypair,
    //     mint,
    //     ATA.address,
    //     keypair,
    //     1_000_000
    // );
    const toATA = yield getOrCreateAssociatedTokenAccount(connection, keypair, mint, newWallet);
    const sendTo2 = yield transfer(connection, keypair, ATA.address, toATA.address, keypair, 1000000);
    console.log(sendTo2);
}))();
//# sourceMappingURL=spl_transfer.js.map