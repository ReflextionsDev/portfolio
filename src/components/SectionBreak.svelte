<!-- This component is similar to Section, but it supports a background image and a mask color.
Accepts and optional title component, or slotted content -->
<script>
    export let bgURL, maskColor;
    export let title = "";
</script>

<div class="sectionBreak background" style="--bgURL: {bgURL}">
    <div class="mask" style="--maskColor: {maskColor}">
        <h1>{title}</h1>
        <slot />
    </div>
</div>

<style>
    .sectionBreak {
        width: auto;
        height: inherit;
        background-image: var(--bgURL);
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
    }

    .mask {
        width: 100%;
        height: 100%;
        background-color: var(--maskColor);
        padding: 100px 0px;
    }
</style>
