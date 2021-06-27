import React from 'react'

export default function Header() {
    return (
            <header className="main-header" >
                <div className="main-header__content container" >

                        <nav className="main-navigation">
                            <div className="nav-wrapper">

                                <img src='/img/icon.png' alt="Bouton retour accueil"/>

                                <input type="checkbox" id="menu-checkbox" class="menu-checkbox" />
                                <label for="menu-checkbox" class="menu-toggle">≡ Menu</label>
                                <ul className="menu">
                                    <li><a href="b">Membres</a></li>
                                    <li><a href="b">Profile</a></li>
                                </ul>
                            </div>
                        </nav>
                </div>
            </header>
    )
}
