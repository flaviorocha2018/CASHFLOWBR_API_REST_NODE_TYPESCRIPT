import { genSalt, hash, compare } from 'bcrypt';


const SALT_RANDOMS = 10;

const hashPassword = async (password: string) => {
  const saltGenerator = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerator);
};


const verifyPassword = async (password: string, hashedPassword: string) => { 
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};