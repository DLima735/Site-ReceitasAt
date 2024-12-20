const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir os arquivos estáticos do frontend
app.use(express.static('public'));

// Rota para processar o envio do formulário
app.post('/enviar-receita', (req, res) => {
    const { nomesobrenome, email, telefone, mensagem, contato, novidades } = req.body;

    // Configuração de transporte para enviar e-mail (opcional)
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // ou outro serviço como SMTP
        auth: {
            user: 'seuemail@gmail.com',
            pass: 'suasenha',
        },
    });

    const mailOptions = {
        from: email,
        to: 'admin@receitasdecasa.com',
        subject: `Nova receita enviada por ${nomesobrenome}`,
        text: `
Nome: ${nomesobrenome}
Email: ${email}
Telefone: ${telefone}
Mensagem: ${mensagem}
Contato preferido: ${contato}
Receber novidades: ${novidades ? 'Sim' : 'Não'}
        `,
    };

    // Enviar o e-mail (opcional)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar a receita.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('Receita enviada com sucesso!');
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
