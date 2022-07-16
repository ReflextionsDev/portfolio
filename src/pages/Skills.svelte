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
        Figma,
        Sqlite,
        Jquery,
    } from "./../components/icons/icons.js";

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

<div class="skills">


   <h2>Skills</h2>

    <h3>Front-End</h3>

    <!-- componetize mouseover events? / hover icon component -->
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

    <h3>Back-End</h3>

    <NodeDotJs color={"#339933"} size={iconSize} />
    <Express color={"#000000"} size={iconSize} />
    <Mongodb color={"#47A248"} size={iconSize} />

    <Amazonaws color={"#232F3E"} size={iconSize} />

    <Sqlite color={"#003B57"} size={iconSize} />

    <br />

    <h3>Other</h3>
    <Git color={"#F05032"} size={iconSize} />

    <Jquery color={"#0769AD"} size={iconSize} />

    <Figma color={"#F24E1E"} size={iconSize} />
    <Notion color={"#000000"} size={iconSize} />
    <ConstructThree color={"#96aab9"} size={iconSize} />

    <br/>
    <br/>
    <br/>
    <br/>
 
</div>

<style>
    /* --- SKILLS --- */

    .skills {
        /* padding-top: 50px; */
        /* padding: 50px 50px 200px 50px; */
        /* background-color: #1a1a1a; */
        /* position: relative; */
        /* z-index: 1; */
    }

    /*  */
    /* .skills::before {
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
    } */

    div img {
        width: 70%;
        height: auto;
    }

    .y img {
        margin-left: 250px;
    }
</style>
