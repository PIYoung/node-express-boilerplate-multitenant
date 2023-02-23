import bcrypt from 'bcrypt';

export const generateHash = (data: string | Buffer) => {
  const salt = bcrypt.genSaltSync(Number(process.env['SALT']));
  return bcrypt.hashSync(data, salt);
};

export const compareHash = (target: string | Buffer, hash: string) => bcrypt.compareSync(target, hash);
