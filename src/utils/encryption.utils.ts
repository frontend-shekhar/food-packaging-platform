import CryptoJS from "crypto-js";

export const encode = (data: any) => window.btoa(data);

export const decode = (data: any) => window.atob(data);

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";

export const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
