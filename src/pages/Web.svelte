<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page 
        Could move about section to below projects w/ resume -->
<script>
    import OtherProjects from "./OtherProjects.svelte";
    import SectionBreak from "./../components/SectionBreak.svelte";
    import Section from "./../components/Section.svelte";
    import Skills from "./Skills.svelte";
    import Project from "./Project.svelte";
    import { theme } from "../stores";

    let stack = ["React", "Redux", "Node", "Express"];

    let projectsOther = [
        {
            title: "Map Builder",
            desc: "Create a fantasy style map with jqeury drag and drop",
            img: "/assets/games/protoshift/protoshiftcover.png",
        },
        {
            title: "Map Builder",
            desc: "Create a fantasy style map with jqeury drag and drop",
            img: "/assets/games/protoshift/protoshiftcover.png",
        },
        {
            title: "Map Builder",
            desc: "Create a fantasy style map with jqeury drag and drop",
            img: "/assets/games/protoshift/protoshiftcover.png",
        },
        
    ];
</script>

<div class="page">
    <!-- <Section top={false} bottom={true} bg={theme.bgColors.primary}>
        <h2 class="dash">Skills</h2>
    </Section> -->

    <Section top={false} bottom={true} bg={theme.bgColors.primary}>
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
        bottom={true}
        bg={"linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)"}
    >
        <h2 class="dash">Projects</h2>
        <Project
            title="React Ticket Tracker"
            desc="React Ticket Tracker is a fullstack bug tracker built with React and with state management by redux. Supports filtering, user roles, permissions, and organization assignment. Backend is built with Node & Express. More filler paragraph text here cause it looks nice."
            {stack}
        />
        <Project
            title="Project 2"
            desc="React Ticket Tracker is a fullstack bug tracker built with React and with state management by redux. Supports filtering, user roles, permissions, and organization assignment. Backend is built with Node & Express. More filler paragraph text here cause it looks nice."
            {stack}
            reverse={true}
        />
        <Project
            title="New Project"
            desc="React Ticket Tracker is a fullstack bug tracker built with React and with state management by redux. Supports filtering, user roles, permissions, and organization assignment. Backend is built with Node & Express. More filler paragraph text here cause it looks nice."
            {stack}
        />
        
    </Section>

    <Section top={true} bottom={true} bg={"darkblue"}>
        <h2 class="dash">Other Projects</h2>
        <OtherProjects projects={projectsOther} />
    </Section>

    <!-- <SectionBreak bgURL={theme.bgImages.space} maskColor={'rgb(11 16 56 / 57%)'}>
        <h2 class="dash">Projects</h2>
        <Project />
        <Project />
        <Project />
    </SectionBreak> -->

    <SectionBreak />

    <!-- Add contact form and resume link here -->
    <!-- Or resume as new tab -->
</div>
