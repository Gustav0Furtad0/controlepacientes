import bcrypt from "bcrypt";

export const generateHash = async (senha: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(senha, 10, function (err, hash) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

export const compareHash = async (string: string, hash: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(string, hash, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
