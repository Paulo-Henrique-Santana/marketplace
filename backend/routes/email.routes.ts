import express from "express";

export const EmailRouter = express.Router();

EmailRouter.post("/", async (req, res) => {
  try {
    const prestador: any = await Prestador.findOne({
      where: { email: req.body.email },
    });

    if (!prestador) {
      return res.status(404).send({
        message: "Email informado não pertence a nenhum usuário cadastrado",
      });
    }

    if (!prestador.ativo) {
      return res.status(401).send({
        message: "Usuário inativo",
      });
    }

    const [servidorData]: any = await ServidorEnvioEmail.findAll({
      limit: 1,
    });

    if (!servidorData) {
      return res.status(400).send({
        message:
          "Servidor de envio de email não foi encontrado. Entre em contato com o suporte",
      });
    }

    const { servidor, porta, usuario, senha } = servidorData;

    const transporter = nodemailer.createTransport({
      host: servidor,
      port: porta,
      auth: {
        user: usuario,
        pass: Buffer.from(senha, "base64").toString("ascii"),
      },
    });

    const token = generateRandomString(20);

    await TokenRecuperacaoSenha.create({
      token,
      data_expiracao: moment().add("24", "h").toDate(),
      id_prestador: prestador.id,
    });

    try {
      const messageInfo = await transporter.sendMail({
        from: usuario,
        to: req.body.email,
        subject: "Recuperação de senha - Apontamentos",
        text: `Você solicitou a recuperação de senha. Clique no link a abaixo para cadastrar uma nova senha. 
          \n${process.env.FRONT_URL}/nova-senha?token=${token}
        `,
      });
      return res.status(204).send(messageInfo);
    } catch (error: any) {
      return res.status(400).send({ message: error.command });
    }
  } catch (err: any) {
    return res.status(400).send(err.message);
  }
});
