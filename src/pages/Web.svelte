<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page 
        Could move about section to below projects w/ resume -->
<script>
    import ContactForm from "./ContactForm.svelte";
    import OtherProjects from "./../components/web/OtherProjects.svelte";
    import SectionBreak from "./../components/SectionBreak.svelte";
    import Section from "./../components/Section.svelte";
    import Skills from "./../components/web/Skills.svelte";
    import Project from "./../components/web/Project.svelte";
    import { projects, projectsOther, theme } from "../stores";
</script>

<div class="page">
    <!-- <Section top={false} bottom={true} bg={theme.bgColors.primary}>
        <h2 class="dash">Skills</h2>
    </Section> -->

    <Section top={false} bottom={false} bg={theme.bgColors.primary}>
        <h2 class="dash">Skills</h2>
        <Skills />
    </Section>

    <!-- <SectionBreak
        title="Projects"
        bgURL={theme.bgImages.space}
        maskColor={theme.bgMasks.green}
    /> -->

    <!-- background: rgb(97,189,226);
    background: linear-gradient(162deg, rgba(97,189,226,1) 0%, rgba(130,48,176,1) 100%); -->
    <!-- #71787d -->

    <!-- background: linear-gradient(180deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%); -->

    <Section
        top={true}
        bottom={false}
        bg={"linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)"}
    >
        <h2 class="dash">Projects</h2>
        {#each projects as project, i}
            <Project
                title={project.title}
                desc={project.desc}
                stack={project.stack}
                reverse={i % 2 !== 0}
            />
        {/each}
    </Section>

    <Section top={true} bottom={true} bg={theme.bgColors.primary}>
        <h2 class="dash">Other Projects</h2>
        <OtherProjects projects={projectsOther} />
    </Section>

    <SectionBreak>
        <ContactForm />
    </SectionBreak>
</div>
