<script>
    import { Email, Github, Linkedin } from "../components/icons/icons.js";
    const iconSize = 64;
</script>

<!-- linkedin, git, email, resume (prob at bottom? cause it will be different for games vs web) -->

<div class="info content">
    <div class="info__title">
        <h1>Nathan Bennett</h1>
        <h2>Web & Game Development</h2>
    </div>
    <br />
    <div class="info__body">
        <h3>
            <!-- hover note on problems (original, right?) -->
            I'm a developer interested in building things and solving problems. I
            like satisfying data pipelines, automating boring tasks, and creating
            better user experiences, sometimes driven by spite. Also creativity.
            Creativity is good.
            <br />
            <br />
            <!-- hover note about 2013 and setting up a business as a kid -->
            I have a background in creating and selling web games since 2013 and
            I've worked as a professional QA Tester. I'm primarily trained in MERN
            but am adaptable and excited to work in collaborative environments.
        </h3>
    </div>
    <br />
    <br />
    <div class="info__links">
        <div class="info__link">
            <!-- <Github size={iconSize} color={"#181717"} /> Github -->
            <Github size={iconSize} color={"#FFFFFF"} /> Github
        </div>
        <div class="info__link">
            <Email size={iconSize} color={"#EA4335"} /> Email
        </div>
        <div class="info__link">
            <Linkedin size={iconSize} color={"#0A66C2"} /> Linkedin
        </div>
    </div>
</div>


<!-- Currently doing manual padding, should use theme stuff -->

<style>
    /* --- INFO --- */

    .info--hidden {
        
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
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10%;
        font-size: larger;
        border-radius: 8px;
        padding: 0px 15px;
        transition: all 0.1s ease-out;
    }

    .info__link:hover {
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.355);
    }
</style>
