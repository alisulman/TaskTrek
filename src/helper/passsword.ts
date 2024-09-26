import bcrypt from "bcryptjs";

const EncodePassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const VerifyPassword = async (password: string, hashedPassword: string) => {
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
};

export { EncodePassword, VerifyPassword };