import { ConfigBuilder, Encoder, Library, LweBootstrapKey, LweSecretKey, LweCiphertext } from '@zama-ai/concrete';

async function main() {
    const config = ConfigBuilder.default().build();
    const lib = await Library.load(config);
    const encoder = new Encoder({ min: 0, max: 10, precision: 8 });

    const sk = await LweSecretKey.generate(lib);
    const bsk = await LweBootstrapKey.generate(lib, sk, encoder);

    const input1 = 2;
    const input2 = 3;

    const ct1 = await sk.encrypt(lib, encoder, input1);
    const ct2 = await sk.encrypt(lib, encoder, input2);

    const ctSum = await ct1.add(lib, ct2);
    const result = await sk.decrypt(lib, encoder, ctSum);

    console.log(`Encrypted ${input1} + ${input2} =`, result);
}

main();