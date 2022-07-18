<script>
    export let projects = [];
</script>

<div class="projectGrid content">
    {#each projects as project}
        <div class="project">
            <h4>{project.title}</h4>
            <img src={project.img} alt="project screenshot" />
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
        flex-grow: 1;
    }

    img {
        width: 100%;
        height: auto;
    }

    p {
        text-align: left;
    }
</style>
