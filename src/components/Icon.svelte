
<script>
    export let icon

</script>

<!-- on:mouseover={(e) => iconMouseOver(icon.label)}
on:focus={(e) => iconMouseOver(icon.label)}
on:mouseout={(e) => iconMouseOut(icon.label)}
on:blur={(e) => iconMouseOut(icon.label)} -->

<div
on:mouseover={(e) => console.log('HELLO')}
    class="hvr-grow"
>
    <slot
        this={icon.component}
        color={icon.color}
        size={iconSize}
    />
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
