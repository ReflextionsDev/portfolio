<script>
    import Section from "./../components/Section.svelte";
    import Projects from "./Projects.svelte";
    import Splash from "./Splash.svelte";
    import Skills from "./Skills.svelte";
    import Info from "./../components/Info.svelte";
    import Nav from "../components/Nav.svelte";
    import Games from "./Games.svelte";

    let theme = {
        bgColors: {
            primary: "#4b2284",
        },
    };


    const skewAngle = -5;


</script>

<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page -->
<!-- Could move about section to below projects w/ resume -->
<!-- Pass in background color as var, and skew, make theme object -->
<!-- Nav bar should scroll to top of page -->

<!-- Make component w/ angled top, and one without, or make it a boolean of a section component -->

<div class="wrapper">
    <Splash />

    <Section top={true} bottom={false} bg="{theme.bgColors.primary}" >

        <Info/>

    </Section>

    <Projects />

   
    <Section top={true} bottom={true} bg="{theme.bgColors.primary}" >

        <Info/>

    </Section>

    

    <Projects />

    <!-- Will do routing here -->

    <div class="page">
        <Skills />
        <Projects />

        <Skills />

        <Projects />
        <Skills />
    </div>
</div>

<style>
    /* Duplicate bg so when splash goes into header, user doesn't see page background */
    .wrapper {
        width: auto;
        height: inherit;
        background-image: url("/assets/backgrounds/purplebg.jpg");
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
