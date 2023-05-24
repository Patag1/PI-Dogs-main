import React from 'react'
import Navbar from './components/Navbar'
import Icons from './components/Icons'
import AboutCSS from '../styles/About.module.css'

const About = () => {

    const linkedin = `${AboutCSS.link} ${AboutCSS.linkedin}`;
    const github = `${AboutCSS.link} ${AboutCSS.github}`;

    return (
        <div className={AboutCSS.body}>
            <Navbar />

            <div className={AboutCSS.container}>
                <div className={AboutCSS.header}>
                    <h1>About the project</h1>
                    <Icons.Atom className={AboutCSS.react} size={30} color='navy' />
                </div>
                <p>
                    This project was made possible thanks to many people that helped me along the way of becoming a software developer. <br /><br />
                    I got to meet people on the same path as mine and to learn highly-demanded technologies such as Trello, Notion, HTML/CSS, Git, StyledComponents, Sass, Tailwind CSS, Python, Flask, C, Javascript, React, Typescript, Redux, Next.js, Webpack, Babel, Express, PostgreSQL, SQLite and Sequelize. <br /><br />
                    This project was made using: <br />
                </p>
                <ul>
                    <li>React.js</li>
                    <li>Redux.js</li>
                    <li>Express.js</li>
                    <li>PostgreSQL</li>
                    <li>Sequelize</li>
                </ul>
            </div>

            <div className={AboutCSS.container}>
                <div>
                    <h1>My socials</h1>
                    <p>If you need to contact me, you have my contacts down below</p>
                </div>
                <br />
                <div className={AboutCSS.socials}>
                    <a href={'https://www.linkedin.com/in/augusto-sasso/'} target='_blank' rel='noreferrer' className={linkedin}>
                        <Icons.Linkedin size={30} color='white' />
                    </a>
                    <a href={'https://github.com/Patag1'} target='_blank' rel='noreferrer' className={github}>
                        <Icons.Github size={30} color='white' />
                    </a>                
                </div>
            </div>

        </div>
    )
}

export default About