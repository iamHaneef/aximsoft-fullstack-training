import bcrypt from 'bcrypt';

const run = async () => {
    const hash = await bcrypt.hash('1234', 10);
    console.log(hash);
};

run();