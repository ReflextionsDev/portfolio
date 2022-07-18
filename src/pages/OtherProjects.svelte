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
</div>

<style>
    .projectGrid {
        display: flex;
        flex-wrap: wrap;
        max-width: 95%;
        gap: 3%;
        /* justify-content: center; */
        justify-content: space-around;
    }

    .project {
        /* flex: 0.5; */
        width: 280px;
        min-width: 270px;
        max-width: 450px;
        /* max-width: 50%; */
        /* max-width: calc(50% - 3%); */
        flex-grow: 1;
        /* padding: 10px; */
    }

    img {
        width: 100%;
        height: auto;
    }

    p {
        text-align: justify;
    }

    @media (min-width: 576px) {
        .project {
            /* max-width: calc(50% - 3%); */
        }
    }

    @media (max-width: 576px) {
        .projectGrid {
            flex-direction: column;
            align-items: center;
        }

        .project {
            /* max-width: 85%; */
        }
    }

</style>