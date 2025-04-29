import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
    }

    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow-x: hidden;
        color: rgba(34, 34, 96, .6);
        background: #f6f6f6;
        min-height: 100vh;
        position: relative;
    }

    #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }

    /* Responsive Design */
    @media screen and (max-width: 768px) {
        body {
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 480px) {
        body {
            font-size: 0.8rem;
        }
    }
`;