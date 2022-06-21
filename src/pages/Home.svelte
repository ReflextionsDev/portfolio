<script>
    import Splash from "./Splash.svelte";
    import Skills from "./../components/Skills.svelte";
    import Info from "./../components/Info.svelte";
    import Nav from "../components/Nav.svelte";
    import Games from "./Games.svelte";
</script>

<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page -->
<!-- Could move about section to below projects w/ resume -->
<!-- Pass in background color as var -->

<div>
    <Splash />

    <div class="page">
        <Skills />
        <Skills />
        <Skills />
        <Skills />
    </div>

</div>

<style>
</style>
