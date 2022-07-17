<script>
    import { Email, Github, Linkedin } from "../components/icons/icons.js";
    const iconSize = 64;
</script>

<div class="info content">
    <div class="info__title content__section">
        <h1>Nathan Bennett</h1>
        <h2>Web & Game Development</h2>
    </div>

    <div class="info__body content__text content__section">
        <p>
            I'm a developer interested in building things and solving problems.
            I like satisfying data pipelines, automating boring tasks, and
            creating better user experiences with creativity.
        </p>
        <p>
            <!-- hover note about 2013 and setting up a business as a kid -->
            I have a background in creating and selling web games since 2013 and
            I've worked as a professional QA Tester. I'm primarily trained in MERN
            but am adaptable and excited to work in collaborative environments.
        </p>
    </div>

    <div class="info__links content__section">
        <div class="info__link">
            <!-- <Github size={iconSize} color={"#181717"} /> Github -->
            <Github size={iconSize} color={"#FFFFFF"} />
            <h3>Github</h3>
        </div>
        <div class="info__link">
            <Email size={iconSize} color={"#EA4335"} />
            <h3>Email</h3>
        </div>
        <div class="info__link">
            <Linkedin size={iconSize} color={"#0A66C2"} />
            <h3>Linkedin</h3>
        </div>
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
    }

    .info__link:hover {
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.355);
    }
</style>
