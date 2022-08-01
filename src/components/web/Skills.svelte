<script>
    import {
        Javascript,
        Html5,
        CssThree,
        React,
        Redux,
        Svelte,
        NodeDotJs,
        Git,
        Amazonaws,
        Mongodb,
        Express,
        Notion,
        ConstructThree,
        Figma,
        Sqlite,
        Jquery,
    } from "../icons/icons.js";

    // Define icons
    import { iconSize } from "./../../stores.js";
    const colorHover = "#FFFFFF";
    let icons = [
        {
            label: "Javascript",
            type: "frontend",
            component: Javascript,
            colorDefault: "#F7DF1E",
            link: "",
        },
        {
            label: "HTML5",
            type: "frontend",
            component: Html5,
            colorDefault: "#E34F26",
        },
        {
            label: "CSS3",
            type: "frontend",
            component: CssThree,
            colorDefault: "#1572B6",
        },
        {
            label: "React",
            type: "frontend",
            component: React,
            colorDefault: "#61DAFB",
        },
        {
            label: "Redux",
            type: "frontend",
            component: Redux,
            colorDefault: "#764ABC",
        },
        {
            label: "Svelte",
            type: "frontend",
            component: Svelte,
            colorDefault: "#FF3E00",
        },
        {
            label: "Node.JS",
            type: "backend",
            component: NodeDotJs,
            colorDefault: "#339933",
        },
        {
            label: "Express",
            type: "backend",
            component: Express,
            colorDefault: "#000000",
        },
        {
            label: "MongoDB",
            type: "backend",
            component: Mongodb,
            colorDefault: "#47A248",
        },
        {
            label: "Amazon AWS",
            type: "backend",
            component: Amazonaws,
            colorDefault: "#232F3E",
        },
        {
            label: "SQLite",
            type: "backend",
            component: Sqlite,
            colorDefault: "#003B57",
        },
        {
            label: "Git",
            type: "other",
            component: Git,
            colorDefault: "#F05032",
        },
        {
            label: "JQuery",
            type: "other",
            component: Jquery,
            colorDefault: "#0769AD",
        },
        {
            label: "Figma",
            type: "other",
            component: Figma,
            colorDefault: "#F24E1E",
        },
        {
            label: "Notion",
            type: "other",
            component: Notion,
            colorDefault: "#000000",
        },
        {
            label: "Construct 3",
            type: "other",
            component: ConstructThree,
            colorDefault: "#96aab9",
        },
    ];

    icons.forEach((icon) => {
        // icon.hoverColor = icon.colorDefault
        // icon.colorDefault = '#FFFFFF'
        icon.color = icon.colorDefault;
        icon.hoverColor = colorHover;
    });

    // Icon recolor on hover
    function iconMouseOver(label) {
        let index = icons.findIndex((icon) => icon.label === label);
        icons[index].color = icons[index].hoverColor;
    }

    function iconMouseOut(label) {
        let index = icons.findIndex((icon) => icon.label === label);
        icons[index].color = icons[index].colorDefault;
    }
</script>

<div class="skills content">
    <div class="content__section">
        <h3>Front-End</h3>
        <div class="icons">
            {#each icons as icon}
                {#if icon.type === "frontend"}
                    <div
                        on:mouseover={(e) => iconMouseOver(icon.label)}
                        on:focus={(e) => iconMouseOver(icon.label)}
                        on:mouseout={(e) => iconMouseOut(icon.label)}
                        on:blur={(e) => iconMouseOut(icon.label)}
                        class="hvr-grow tooltip"
                    >
                        <span class="tooltiptext">{icon.label}</span>
                        <svelte:component
                            this={icon.component}
                            color={icon.color}
                            size={$iconSize}
                        />
                    </div>
                {/if}
            {/each}
        </div>
    </div>

    <div class="content__section">
        <h3>Back-End</h3>
        <div class="icons">
            {#each icons as icon}
                {#if icon.type === "backend"}
                    <div
                        on:mouseover={(e) => iconMouseOver(icon.label)}
                        on:focus={(e) => iconMouseOver(icon.label)}
                        on:mouseout={(e) => iconMouseOut(icon.label)}
                        on:blur={(e) => iconMouseOut(icon.label)}
                        class="hvr-grow tooltip"
                    >
                        <span class="tooltiptext">{icon.label}</span>
                        <svelte:component
                            this={icon.component}
                            color={icon.color}
                            size={$iconSize}
                        />
                    </div>
                {/if}
            {/each}
        </div>
    </div>

    <div class="content__section">
        <h3>Other</h3>
        <div class="icons">
            {#each icons as icon}
                {#if icon.type === "other"}
                    <div
                        on:mouseover={(e) => iconMouseOver(icon.label)}
                        on:focus={(e) => iconMouseOver(icon.label)}
                        on:mouseout={(e) => iconMouseOut(icon.label)}
                        on:blur={(e) => iconMouseOut(icon.label)}
                        class="hvr-grow tooltip"
                    >
                        <span class="tooltiptext">{icon.label}</span>
                        <svelte:component
                            this={icon.component}
                            color={icon.color}
                            size={$iconSize}
                        />
                    </div>
                {/if}
            {/each}
        </div>
    </div>
    <br />
</div>

<style>
    .icons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1vw;
        flex-wrap: wrap;
    }

    @media (max-width: 576px) {
        .icons {
            gap: 2vw;
        }
    }

    .tooltip {
        position: relative;
        display: inline-block;
    }
    .tooltip .tooltiptext {
        opacity: 0;
        width: 120px;
        background-color: rgba(42, 14, 114, 0.746);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: -55%;
        left: 50%;
        margin-left: -60px;
        transition-property: opacity;
        transition-delay: 100ms;
        transition-duration: 200ms;
        font-size: 0.9rem;
    }

    .tooltip:hover .tooltiptext {
        opacity: 100;
    }

    /* Hover CSS by @IanLunn https://github.com/IanLunn/Hover */
    .hvr-grow {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-property: transform;
        transition-property: transform;
        transition-property: transform;
    }

    .hvr-grow:hover,
    .hvr-grow:focus,
    .hvr-grow:active {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
