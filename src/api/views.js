const console = require('console');
const bot = require('../bot');

async function send(req, res) {
    const { to, content } = req.query;

    if (!to || !content) {
        return res.status(400).json({
            error: true,
            msg: 'Parâmetros inválidos.',
        });
    }

    if (!to.startsWith('55') || to.length !== 13) {
        return res.status(422).json({
            error: true,
            msg: 'Parâmetros inválidos.',
        });
    }

    bot.sendText(`${to}@c.us`, content).then((result) => {
        res.json({
            error: false,
            msg: 'Mensagem enviada com sucesso.',
            result,
        });
    }).catch((result) => {
        console.error(result);

        res.json({
            error: true,
            msg: 'Não foi possível enviar a mensagem.',
            result,
        });
    });

    return null;
}

module.exports = {
    send,
};
