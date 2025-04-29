import styled from "styled-components";

export const MainLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 374px 1fr;
    position: relative;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem;
    height: 100%;
    overflow-y: auto;

    @media screen and (max-width: 768px) {
        padding: 1rem;
        margin-top: 60px;
    }

    @media screen and (max-width: 480px) {
        padding: 0.8rem;
    }
`;