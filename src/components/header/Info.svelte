<script>
    import { Email, Github, Linkedin } from "../icons/icons.js";

    import { iconSize } from "../../stores.js";
</script>

<div class="info content">
    <div class="info__title content__section">
        <h1>Nathanael Bennett</h1>
        <h2>Web & Game Development</h2>
    </div>

    <div class="info__body content__text content__section">
        <p>
            I'm a developer interested in building things and solving problems.
            <!-- I like satisfying data pipelines, automating boring tasks, and
            creating better user experiences with creativity. -->

            I like working across teams of various disciplines and building
            better user experiences with creativity.
        </p>
        <p>
            <!-- hover note about 2013 and setting up a business as a kid -->
            I have a background in creating and selling web games since I was a teenager
            and I've worked as a professional QA Tester. I'm primarily trained in
            MERN stack and am adaptable and excited to work in collaborative environments.
        </p>
    </div>

    <div class="info__links content__section">
        <a
            href="https://github.com/ReflextionsDev"
            target="new"
            class="info__link hvr-grow"
        >
            <Github size={$iconSize} color={"#FFFFFF"} />
            <h4>Github</h4>
        </a>

        <a
            href="mailto:nlb.nathan@gmail.com"
            target="new"
            class="info__link hvr-grow"
        >
            <Email size={$iconSize} color={"#EA4335"} />
            <h4>Email</h4>
        </a>
        <a
            href="https://www.linkedin.com/in/nathanlbennett/"
            target="new"
            class="info__link hvr-grow"
        >
            <Linkedin size={$iconSize} color={"#0A66C2"} />
            <h4>Linkedin</h4>
        </a>
    </div>
</div>

<style>
    .info__links {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10%;
        row-gap: 10px;
        flex-wrap: wrap;
        padding: 15px 0px;
    }

    .info__link {
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10%;
        border-radius: 8px;
        padding: 0px 15px;
        transition: all 0.1s ease-out;
        text-decoration: none;
        color: whitesmoke;
    }

    .info__link:hover {
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6);
        text-decoration: underline;
    }

    /* Hover CSS by @IanLunn https://github.com/IanLunn/Hover */
    .hvr-grow {
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-property: transform;
        transition-property: transform;
        transition-property: transform;
    }

    .hvr-grow:hover,
    .hvr-grow:focus,
    .hvr-grow:active {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
