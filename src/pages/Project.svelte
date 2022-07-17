<!-- Should be modular, accept images, title text, tech stack, order, etc -->
<script>
    import Laptop from "./../components/Laptop.svelte";
    import Phone from "./../components/Phone.svelte";
</script>

<div class="project content">
    <div class="spotlight content__info">
        <div style="display: flex; justify-content: center">
            <Laptop />
        </div>

        <div style="display: flex; justify-content: center; gap: 20px ">
            <h4>React</h4>
            <h4>Redux</h4>
            <h4>Node</h4>
            <h4>Express</h4>
        </div>
    </div>
    <div class="info content__info">
        <h3>React Ticket Tracker</h3>
        <p content__text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button>Live Demo</button>
        <button>More Info & Source</button>
    </div>
</div>

<style>
    .project,
    .info {
        min-width: 280px;
    }

    .project {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
    }

    .spotlight {
        flex: 1;
    }

    .info {
        flex: 1;
    }
</style>
