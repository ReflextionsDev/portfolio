<script>
    export let projects = [];
</script>

<div class="projectGrid content">
    {#each projects as project}
        <div class="project">
            <h4>{project.title}</h4>
            <a href={project.link} target="project">
                <img
                    src={project.img}
                    alt="project screenshot"
                    class="hvr-grow-rotate"
                />
            </a>
            <p>{project.desc}</p>
        </div>
    {/each}
    <!-- Invisible flex item to prevent 3rd object from fitting row -->
    <div class="project" />
</div>

<style>
    .projectGrid {
        display: flex;
        flex-wrap: wrap;
        max-width: 95%;
        gap: 3%;
        justify-content: space-around;
    }

    .project {
        flex: 0.5;
        min-width: 270px;
        max-width: min(90%, 450px);
        max-width: 360px;
    }

    img {
        width: 100%;
        height: 200px;
        border-radius: 5px;
        object-fit: cover;
        margin: 10px;
    }

    p {
        text-align: left;
    }

    /* https://github.com/IanLunn/Hover */
    /* Grow Rotate */
    .hvr-grow-rotate {
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
    .hvr-grow-rotate:hover,
    .hvr-grow-rotate:focus,
    .hvr-grow-rotate:active {
        -webkit-transform: scale(1.05) rotate(1deg);
        transform: scale(1.05) rotate(1deg);
    }
</style>
