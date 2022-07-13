<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page 
        Could move about section to below projects w/ resume -->
<script>
    import SectionBreak from "./../components/SectionBreak.svelte";
    import Section from "./../components/Section.svelte";
    import Skills from "./Skills.svelte";
    import Project from "./Project.svelte";
    import { theme } from "../stores";
</script>

<div class="page">
    <Section top={false} bottom={true} bg={theme.bgColors.primary}>
        <Skills />
    </Section>

    <SectionBreak
        title="Projects"
        bgURL={theme.bgImages.space}
        maskColor={theme.bgMasks.green}
    />

    <Section top={true} bottom={true} bg={"grey"}>
        <Project />
    </Section>

    <Section top={true} bottom={true} bg={"lightblue"}>
        <Project />
    </Section>

    <SectionBreak />
</div>
