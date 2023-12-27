import nodemailer from "nodemailer";

export const nodemailerTransporterUser = "pls.dont.reply.365@gmail.com";

export const nodemailerTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: nodemailerTransporterUser,
    pass: "yjkn fapl rlro dwsl",
  },
});
