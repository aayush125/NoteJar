import bcrypt from "bcrypt";

export async function hashPassword(textPassword: string) {
  const hash = await bcrypt.hash(textPassword, 10);
  return hash;
}

export async function compare_passes(
  textPassword: string,
  hashedPassword: string
) {
  const result = await bcrypt.compare(textPassword, hashedPassword);
  return result;
}
