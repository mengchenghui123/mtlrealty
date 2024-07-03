import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <section className="h_wrapper">
        <div className="flexCenter paddings innerWidth h-container">
            <img src="./logo.png" alt="logi" width={100}/>

            <div className="flexCenter h-menu">
                <a href="">Residential</a>
                <a href="">Commercial</a>
                <a href="">Franchase</a>
                <a href="">Contact</a>
                <a href="">News</a>
            </div>
        </div>
    </section>
  )
}

export default Header