const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    } = require('@bot-whatsapp/bot')
    
    const QRPortalWeb = require('@bot-whatsapp/portal')
    const BaileysProvider = require('@bot-whatsapp/provider/baileys')
    const MockAdapter = require('@bot-whatsapp/database/mock')
    
    //-----

    const flowMenu = addKeyword(['inicio','menu','hola'])
        .addAnswer(
        '🙌 Bienvenid@ al chat de <b>Gregoria Cocina</b>')
        .addAnswer(
        [        
        'marca 👉 1 Para obtener la carta de terraza en PDF\n',
        'marca 👉 2 Para conocer la dirección y horarios\n',
        'marca 👉 3 Para pedir delivery o retirar en el local\n',
        'marca 👉 4 Problemas con el pedido o con el delivery\n',
        '#EL VERDADERO RINCÓN 🇦🇷 EN SANTIAGO',
        ], 
    );
 
    const flowMenuPDF = addKeyword('1')
        .addAnswer('Nuestra Carta Menu de terraza',)
        .addAnswer(
            'Te envio una imagen',
            { media: 'https://botchile.000webhostapp.com/GREGORIA-COCINA.pdf' },)
        .addAnswer('Puedes reservar con la aplicación mesa\n www.reservamesa.cl',);

    const flowLocal = addKeyword('2').addAnswer(
        'Estamos en Vitacura!',
        ).addAnswer('AV Padre Hurtado Nº 1376, esquina Las Hualtatas.',
        ).addAnswer('NUEVO HORARIO EXTENDIDO.',
        ).addAnswer('Martes a Sábados de 10.30 hasta las 19.30 hs.',
        ).addAnswer('Domingos de 11.30 a 14 hs y los Lunes descansamos',
      
    );
      const flowDelivery = addKeyword('3').addAnswer(
          'Pedidos online https://mipedido.gregoria.cl/pedir',
          ).addAnswer('Nuestro sitio web permite pedir a domicilio o retirar en el local',
          ).addAnswer('Si es tu primera compra, puedes canjear los descuentos',
    );
        const flowprobDelivery = addKeyword('4').addAnswer(
          'Por favor, envia fotos de tu pedido, tu número de orden y tu nombre',
          ).addAnswer('Coméntanos si tu pedido no corresponde o si tiene faltante',
          ).addAnswer('Nuestro personal esta disponible para ayudar',
    );
    //    ----

    const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowMenu,flowMenuPDF,flowDelivery,flowprobDelivery,flowLocal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}
main()