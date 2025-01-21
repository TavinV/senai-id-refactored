export const email_verification_token_template = (email, code) => {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Montserrat', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 1000px;
                    margin: 20px auto;
                    background: #ffffff;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .header-white-container {
                    position: relative;
                    background-color: #ffff;
                    border-bottom: 2px solid #cecece;
                    padding: 10px 0px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10;
                }
                header {
                    width: 100%;
                    position: sticky;
                    top: 0;
                    left: 0;
                    background-color: #e30613;
                    z-index: 10000;
                    margin-bottom: 20px;
                }

                .header-red-container {
                    position: relative;
                    background-color: var(--vermelho);
                    z-index: 10;
                    width: 100vw;
                    display: flex;
                    height: 35px;
                    padding-left: 1%;
                    padding-right: 1%;
                    justify-content: space-between;
                    align-items: center;
                }

                .email-body {
                    padding: 30px 60px;
                    padding-bottom: 60px;
                    text-align: left;
                    color: black;
                }
                .email-body h1{
                    font-size: 2rem;
                    margin-bottom: 48px;
                }
                .email-body p {
                    font-size: 16px;
                    line-height: 1.5;
                    text-align: left;
                }
                span{
                    font-weight: 1000;
                    color: #e30613
                }
                .verification-code {
                    margin-top: 48px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #e30613;
                    font-weight: 600;
                    font-size: 5rem;
                    width: 100%;
                    text-align: center;
                    margin-bottom: 48px;
                }
                .email-footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #777777;
                    background-color: #f9f9f9;
                }
                .email-footer img {
                    width: 100px;
                    margin-top: 10px;
                }
                .email-footer p {
                    margin: 5px 0;
                }
                .icon {
                    font-size: 22px;
                    color: #e30613;
                    margin-right: 8px;
                }
                .senai-logo {
                    width: auto;
                    height: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <header>
                    <div class="header-red-container"> </div>
                </header>
                <div class="email-body">
                    <h1>Verifique seu email.</h1>
                    <br>
                    <p>Olá</p>
                    <p>Você acabou de solicitar este um código de verificação para <b>${email}</b>.</p>
                    <p>Utilize o código abaixo para seguir com o processo de registro no <span><strong> Senai ID</strong></span></p>
                    <div class="verification-code">${code}</div>
                    <p>Este código só pode ser usado uma vez e expira em 15 minutos, não o compartilhe com ninguém, nossa equipe de suporte nunca irá te pedir este código.</p>
                    <br>
                    <p>Caso não tenha solicitado esse código, pode ignorar este e-mail.</p>
                </div>
            </div>
        </body>
        </html>`

    return html
}