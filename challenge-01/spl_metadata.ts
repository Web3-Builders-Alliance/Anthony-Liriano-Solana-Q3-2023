import { Commitment, Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js"
import wallet from "./wba-wallet.json"
import { createCreateMetadataAccountV2Instruction, createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array([101, 181, 30, 51, 122, 41, 245, 27, 210, 151, 81, 241, 39, 82, 169, 3, 254, 157, 174, 126, 115, 123, 194, 157, 0, 72, 0, 198, 240, 156, 233, 91, 5, 227, 92, 63, 200, 96, 125, 35, 22, 61, 201, 175, 100, 230, 105, 135, 145, 221, 9, 32, 133, 162, 169, 221, 16, 54, 99, 54, 111, 42, 20, 23]));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Define our Mint address
const mint = new PublicKey("37xHceLLtV1bGxPNVwghwCxfGf9UKK3UEkTuYZzRsnG9")

// Add the Token Metadata Program
const token_metadata_program_id = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')

// Create PDA for token metadata
const metadata_seeds = [
    Buffer.from('metadata'),
    token_metadata_program_id.toBuffer(),
    mint.toBuffer(),
];
const [metadata_pda, _bump] = PublicKey.findProgramAddressSync(metadata_seeds, token_metadata_program_id);

(async () => {
    try {
        // Start here
        const tx = new Transaction().add(
            createCreateMetadataAccountV3Instruction(
                {
                    metadata: metadata_pda,
                    mint: mint,
                    mintAuthority: keypair.publicKey,
                    payer: keypair.publicKey,
                    updateAuthority: keypair.publicKey
                },
                {
                    createMetadataAccountArgsV3: {
                        data: {
                           name: "Not A Rug",
                           symbol: "NAR",
                           uri: "",
                           sellerFeeBasisPoints: 0,
                           creators: null,
                           collection: null,
                           uses: null 
                        },
                        isMutable: false,
                        collectionDetails: null
                    }
                }
            )
        );

        const sig = await sendAndConfirmTransaction(connection, tx, [keypair]);
        console.log(`Transaction Id: ${sig}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();