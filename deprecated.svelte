<script>
    // Manual Scroll To
    function scrollIntoView({ target }) {
        const el = document.querySelector(target.getAttribute("href"));
        console.log(target);
        console.log(el);
        if (!el) return;
        el.scrollIntoView({
            behavior: "smooth",
        });
    }
</script>

<nav>
    <a href=".tabs" on:click|preventDefault={scrollIntoView}>Section 1</a>
    <a href="#section-2" on:click|preventDefault={scrollIntoView}>Section 2</a>
    <a href="#section-3" on:click|preventDefault={scrollIntoView}>Section 3</a>
</nav>

<main class="test">
    <section id="section-1">
        <h2>Section 1</h2>
    </section>

    <section id="section-2">
        <h2>Section 2</h2>
    </section>

    <section id="section-3">
        <h2>Section 3</h2>
    </section>
</main>

<style>
    /* body::before {
	background: linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(29, 251, 255, 1) 53%, rgb(251, 255, 253) 100%);
	content: "";
	top: 0;
	left: 0;
	position: fixed;
	z-index: -1;
	width: 100%;
	height: 100vh;

} */

    /* ::-webkit-scrollbar {
	width: 20px;
}

::-webkit-scrollbar-track {
	background-color: transparent;
}

::-webkit-scrollbar-thumb {
	background-color: hsl(196, 15%, 86%);
	border-radius: 20px;
	border: 6px solid transparent;
	background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
	background-color: #a8bbbf;
} */

    /* TEMP */

    /* .hvr-grow {
	display: inline-block;
	vertical-align: middle;
	-webkit-transform: perspective(1px) translateZ(0);
	transform: perspective(1px) translateZ(0);
	box-shadow: 0 0 1px rgba(0, 0, 0, 0);
	-webkit-transition-duration: 0.3s;
	transition-duration: 0.3s;
	-webkit-transition-property: transform;
	transition-property: transform;
}

.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
} */

    /* custom scrollbar */
    /* ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: hsl(196, 15%, 86%);
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    } */
</style>