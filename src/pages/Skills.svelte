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
    } from "./../components/icons/icons.js";

    let icons = [
        {
            label: "javascript",
            type: "frontend",
            component: Javascript,
            colorDefault: "#F7DF1E",
        },
    ];

    icons.forEach((icon) => {
        icon.color = icon.colorDefault;
    });

    const iconSize = 64;
    const colorHover = "#FFFFFF";

    function iconMouseOver(label) {
        let index = icons.findIndex((icon) => icon.label === label);
        icons[index].color = colorHover;
    }

    function iconMouseOut(label) {
        let index = icons.findIndex((icon) => icon.label === label);
        icons[index].color = icons[index].colorDefault;
    }
</script>

<!-- !Add title prop to section padding! -->

<div class="skills content">
    <!-- {#each icons as icon}
        {#if icon.type === "frontend"}
            <div
                on:mouseover={(e) => iconMouseOver(icon.label)}
                on:focus={(e) => iconMouseOver(icon.label)}
                on:mouseout={(e) => iconMouseOut(icon.label)}
                on:blur={(e) => iconMouseOut(icon.label)}
                class="hvr-grow"
            >
                <svelte:component
                    this={icon.component}
                    color={icon.color}
                    size={iconSize}
                />
            </div>
        {/if}
    {/each} -->

    {#each icons as icon}
        {#if icon.type === "frontend"}
            <div
                on:mouseover={(e) => iconMouseOver(icon.label)}
                on:focus={(e) => iconMouseOver(icon.label)}
                on:mouseout={(e) => iconMouseOut(icon.label)}
                on:blur={(e) => iconMouseOut(icon.label)}
                class="hvr-grow"
            >
                <svelte:component
                    this={icon.component}
                    color={icon.color}
                    size={iconSize}
                />
            </div>
        {/if}
    {/each}

    <h2 class="dash">Skills</h2>

    <div class="content__section">
        <h3>Front-End</h3>
        <div>
            <!-- <Javascript color={colour} size={iconSize} /> -->
            <Html5 color={"#E34F26"} size={iconSize} />
            <CssThree color={"#1572B6"} size={iconSize} />
            <React color={"#61DAFB"} size={iconSize} />
            <Redux color={"#764ABC"} size={iconSize} />
            <Svelte color={"#FF3E00"} size={iconSize} />
        </div>
    </div>

    <div class="content__section">
        <h3>Back-End</h3>
        <div>
            <NodeDotJs color={"#339933"} size={iconSize} />
            <Express color={"#000000"} size={iconSize} />
            <Mongodb color={"#47A248"} size={iconSize} />
            <Amazonaws color={"#232F3E"} size={iconSize} />
            <Sqlite color={"#003B57"} size={iconSize} />
        </div>
    </div>

    <div class="content__section">
        <h3>Other</h3>
        <div>
            <Git color={"#F05032"} size={iconSize} />
            <Jquery color={"#0769AD"} size={iconSize} />
            <Figma color={"#F24E1E"} size={iconSize} />
            <Notion color={"#000000"} size={iconSize} />
            <ConstructThree color={"#96aab9"} size={iconSize} />
        </div>
    </div>
</div>

<style>
    .hvr-grow {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
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
