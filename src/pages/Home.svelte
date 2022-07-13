<script>
    import Section from "./../components/Section.svelte";
    import Project from "./Project.svelte";
    import Splash from "./Splash.svelte";
    import Skills from "./Skills.svelte";
    import Info from "./../components/Info.svelte";
    import SectionBreak from "./../components/SectionBreak.svelte";
    import { theme } from "../stores.js";
</script>

<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page -->
<!-- Could move about section to below projects w/ resume -->
<!-- Pass in background color as var, and skew, make theme object -->
<!-- Nav bar should scroll to top of page -->

<!-- Make component w/ angled top, and one without, or make it a boolean of a section component -->

<div class="wrapper">
    <Splash />

    <!-- Will do routing here -->

    <div class="page">
        <Section top={false} bottom={true} bg={theme.bgColors.primary}>
            <Skills />
        </Section>

        <!-- <SectionBreak
            title="React Ticket"
            bgURL={theme.bgImages.space}
            maskColor={theme.bgMasks.green}
        /> -->

        <Section top={true} bottom={true} bg={'grey'}>
            <Project />
        </Section>

        <Section top={true} bottom={true} bg={'lightblue'}>
            <Project />
        </Section>
    </div>
</div>

<style>
    /* Duplicate bg so when splash goes into header, user doesn't see page background */
    .wrapper {
        width: auto;
        height: inherit;
        background-image: url("/assets/backgrounds/purplebgblur.jpg");
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
