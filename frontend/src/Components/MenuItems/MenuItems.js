import React from 'react';
import styled from 'styled-components';

export const MenuItems = ({ icon, title, active, onClick }) => {
    return (
        <MenuItemsStyled onClick={onClick} className={active ? 'active' : ''}>
            <div className="icon">
                {icon}
            </div>
            <div className="title">
                {title}
            </div>
        </MenuItemsStyled>
    );
};

const MenuItemsStyled = styled.li`
    position: relative;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
    color: rgba(34, 34, 96, .6);
    padding: 1rem;
    border-radius: 10px;

    &:hover {
        color: rgba(34, 34, 96, 1);
        background: rgba(252, 246, 249, 0.78);
    }

    &.active {
        color: rgba(34, 34, 96, 1);
        background: rgba(252, 246, 249, 0.78);
    }

    .icon {
        font-size: 1.4rem;
        transition: all .4s ease-in-out;
    }

    .title {
        font-size: 1rem;
        font-weight: 500;
    }
`; 