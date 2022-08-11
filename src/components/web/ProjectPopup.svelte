<script>
    import ProjectShowcase from "./ProjectShowcase.svelte";
    import { projects } from "../../stores";

    export let title;

    let projectProps = {};
    projectProps = projects.find((projObj) => {
        return projObj.title === title;
    });
</script>

<div class="popup">
    <ProjectShowcase {...projectProps} />
</div>

<style>
    .popup {
        margin-bottom: 100px;
    }
</style>
