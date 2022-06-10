<script>
    import {
        Javascript,
        Html5,
        CssThree,
        React,
        Redux,
        Svelte,
        NodeDotJs,
        Git,
        Amazonaws,
        Mongodb,
        Express,
        Notion,
        ConstructThree,
        Email,
        Github,
        Linkedin,
        Figma,
        Sqlite,
        Jquery,
    } from "./../components/icons/icons.js";

    const iconSize_Info = 64;

    const iconSize = 64;

    let colour = "#000000";

    function handleMouseOver(e) {
        colour = "#F7DF1E";
        console.log(colour);
    }
    function handleMouseOut(e) {
        colour = "#FFFFFF";

        console.log(colour);
    }
</script>

<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page -->
<!-- Could move about section to below projects w/ resume -->

<div>
    <div class="info">
        <div class="info__title">
            <h1>Nathan Bennett</h1>
            <h2>Web & Game Development</h2>
        </div>

        <br/>

        <div class="info__body">
            <h3>
                <!-- hover note on problems (original, right?) -->
                I'm a developer interested in building things and solving problems.
                I like satisfying data pipelines, automating boring tasks, and creating
                better user experiences, occasionally driven by spite. Also creativity.
                Creativity is good.

                <br />
                <br />

                <!-- hover note about 2013 and setting up a business as a kid -->

                I have a background in creating and selling web games since 2013
                and I've worked as a professional QA Tester. I'm primarily
                trained in MERN but am adaptable and excited to work in
                collaborative environments.
            </h3>
        </div>

        <br/>
        <br/>
        

        <div class="info__links">
            <div class="info__link">
                <Github size={iconSize_Info} color={"#181717"}/> Github
            </div>
            <div class="info__link">
                <Email size={iconSize_Info} color={"#EA4335"} /> Email
            </div>
            <div class="info__link">
                <Linkedin size={iconSize_Info} color={"#0A66C2"}/> Linkedin
            </div>
        </div>

        <!-- linkedin, git, email, resume (prob at bottom? cause it will be different for games vs web) -->
    </div>

    <!-- Icons for JS, HTMLL5, CSS, React, Redux, Svelte, Node, Git, aws, construct, notion, mongo, express -->
    <!-- Figma, SQLite, JQuery -->

    <div class="skills">
        <h1>Skills</h1>

        <h2>Front-End</h2>


        <!-- <div
            on:mouseover={handleMouseOver}
            on:mouseout={handleMouseOut}
            class="hvr-grow"
        >
            <Javascript color={colour} size={iconSize} />
        </div> -->

        <Javascript color={colour} size={iconSize} />

        <Html5 color={"#E34F26"} size={iconSize} />
        <CssThree color={"#1572B6"} size={iconSize} />

        <React color={"#61DAFB"} size={iconSize} />
        <Redux color={"#764ABC"} size={iconSize} />

        <Svelte color={"#FF3E00"} size={iconSize} />

        <br />
        <br />

        <h2>Back-End</h2>

        <NodeDotJs color={"#339933"} size={iconSize} />
        <Express color={"#000000"} size={iconSize} />
        <Mongodb color={"#47A248"} size={iconSize} />

        <Amazonaws color={"#232F3E"} size={iconSize} />

        
        <Sqlite color={"#003B57"} size={iconSize} />

        <br />

        <h2>Other</h2>
        <Git color={"#F05032"} size={iconSize} />
        
        <Jquery color={"#0769AD"} size={iconSize} />
        
        <Figma color={"#F24E1E"} size={iconSize} />
        <Notion color={"#000000"} size={iconSize} />
        <ConstructThree color={"#96aab9"} size={iconSize} />
    
    </div>
</div>

<style>
    /* --- INFO --- */

    .info {
        padding: 50px 0px 100px;

        /* background-image: linear-gradient(
            175deg,
            #ffffff 88%,
            #94e0e0 calc(88% + 2px)
        ); */
        z-index: -2;
    }

    .info__title {
        font-size: larger;
    }

    .info__body {
        text-align: justify;
        text-align: left;
        padding: 0px 150px;
    }

    .info__links {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10%;
    }

    .info__link {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10%;
        font-size: larger;
        /* /* background-color: rgb(230, 230, 230); */
        border-radius: 30px;
        padding: 0px 15px;
        /* box-shadow: 3px 3px 5px rgb(141, 141, 141); */
        /* background: rgb(245, 245, 245);
        background: rgb(223, 223, 223);
        background: linear-gradient(
            0deg,
            rgba(223, 223, 223, 1) 28%,
            rgba(245, 245, 245, 1) 87%
        ); */
        transition: all 0.2s ease-in-out;
        
    }

    .info__link:hover {
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.355);
  

    }

    /* --- SKILLS --- */

    .skills {
        /* padding: 50px 50px 200px 50px; */
        background-color: #94e0e0;
        position: relative;
        z-index: 1;
    }

    .skills::before {
        content: "";
        width: 100%;
        height: 14%;
        position: absolute;
        background: inherit;
        z-index: -1;
        top: 0;
        left: 0;
        transform-origin: bottom left;
        transform: skewY(-3deg);
        -webkit-backface-visibility: hidden;
    }

    div img {
        width: 70%;
        height: auto;
    }

    .y img {
        margin-left: 250px;
    }

    /* make effects like these global */
    .hvr-grow {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-property: transform;
        transition-property: transform;
    }
    .hvr-grow:hover,
    .hvr-grow:focus,
    .hvr-grow:active {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
